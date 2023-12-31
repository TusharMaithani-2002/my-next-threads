import ThreadCard from '@/components/cards/ThreadCard';
import { fetchPosts } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.action';

import {currentUser} from '@clerk/nextjs';

export default async function Home() {

  const user = await currentUser();
  const result = await fetchPosts(1,30);
  return (
    <>
      <h1 className='head-text text-l'>Home</h1>
      <section className='mt-9 flex flex-col gap-10'>
        {
          result.posts.length === 0 ? (<p className='text-white'>No threads found</p>) : (
            <>
              {
                result.posts.map((post:any) => (
                  <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id || ""}
                  parentId={post.parentId}
                  content={post.text}
                  createdAt={post.createdAt}
                  author={post.author}
                  comments={post.children}
                  likedIds={post.likedIds}
                  />
                ))
              }
            </>
          )
        }

      </section>
    </>
  )
}
