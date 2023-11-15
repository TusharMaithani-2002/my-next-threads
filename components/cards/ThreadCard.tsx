// "use client"; // for implementing like functionality
import Link from "next/link";
import Image from "next/image";
import { formatDateString } from "@/lib/utils";
import DeleteButton from "../shared/DeleteButton";
import LikeButton from "../ui/LikeButton";
import { fetchUser } from "@/lib/actions/user.action";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  path?: string;
  likedIds:string[];
}

const ThreadCard = async({
  id,
  currentUserId,
  parentId,
  content,
  author,
  createdAt,
  comments,
  isComment,
  path,
  likedIds
}: Props) => {

  const user = await fetchUser(currentUserId);

  let likeCount=likedIds?.length | 0;
  let liked=likedIds?.indexOf(user._id) != -1
  return (
    <article
      className={`flex flex-col w-full rounded-xl ${
        isComment ? `px-0 xs:px-7 mb-5` : `bg-dark-2 p-4`
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="profile image"
                fill
                className="rounded-full cursor-pointer"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <LikeButton liked={liked} id={id} currentUserId={user._id.toString()} likeCount={likeCount as number | 0} path={path}/>
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
              <p className="text-subtle-medium text-gray-1">
                {formatDateString(createdAt)}
              </p>
            </div>
          </div>
          {author.id === currentUserId && path == "profile" && (
            <div className="text-white">
              <DeleteButton id={id} currentUserId={currentUserId}/>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
