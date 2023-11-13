import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import NotExists from "@/components/shared/NotExists";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.action";
import {currentUser} from '@clerk/nextjs';
import {redirect} from 'next/navigation';

const Page = async ({params} : {params : {id:string}}) => {

    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarding) redirect('/onboarding');

    const thread = await fetchThreadById(params.id);

    if(!thread || !thread?._id) return <NotExists type={"thread"}/>;
    return (
        <section className="relative">
            <div>
            <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={user?.id || ""}
                parentId={thread.parentId}
                content={thread.text}
                createdAt={thread.createdAt}
                author={thread.author}
                comments={thread.children}
            />
            </div>

            <div className="mt-7">
                <Comment
                threadId={thread.id}
                currentUserImg = {userInfo.image}
                currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>

            <div className="mt-10 gap-4">
                {
                    thread.children.map((child:any) => (
                        <ThreadCard
                        key={child._id}
                        id={child._id}
                        currentUserId={user?.id || ""}
                        parentId={thread.id}
                        content={child.text}
                        author={child.author}
                        comments={child.children}
                        createdAt={child.createdAt}
                        isComment={true}
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default Page;