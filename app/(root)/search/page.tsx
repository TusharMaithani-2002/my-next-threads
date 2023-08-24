
import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {

    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
  
    if (!userInfo?.onboarding) redirect("/onboarding");

    // fetch users
    const result = await fetchUsers({
        userId:user.id,
        searchString:"",
        pageNumber:1,
        pageSize:25
    })

    return (
        <section className="text-white">
            <h1 className="head-text mb-10">search</h1>

            <div className="mt-14 flex flex-col gap-9">
                {
                    result.users.length === 0 ? (<p className="no-result">No users</p>) : (
                        <>
                        {result.users.map((person:any)=> (
                            <UserCard
                            key={person.id}
                            id={person.id}
                            username={person.username}
                            imageUrl={person.image}
                            name={person.name}
                            bio={person.bio}
                            personType="User"
                            community={person.community}
                            />
                        ))}
                        </>
                    )
                }
            </div>
        </section>
    )
}

export default Page;