"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongodb";

interface Params {
    userId:string,
    username:string,
    name:string,
    bio:string,
    image:string,
    path:string
}

export async function updateUser(
    {
        userId,
        username,
        name,
        bio,
        image,
        path
    } : Params
    
    ):Promise<void> {
    connectToDB();

    try {
        console.log(userId)
        await User.findOneAndUpdate(
            {id:userId},
            {
                username:username.toLowerCase(),
                name,
                bio,
                image,
                onboarded:true
            },
    
            {upsert: true} // upsert means : update and delete  2 : 21
    
        );
    
        if(path === '/profile/edit') {
            revalidatePath(path); // revalidate cached data without waiting for a revalidation period to expire
        }

    } catch(error:any) {
        throw new Error(`Failed to create/update user : ${error.message}`);
    }
 
  
}