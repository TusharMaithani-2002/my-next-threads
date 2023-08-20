"use server";
// mongoose__WEBPACK_IMPORTED_MODULE_0___default().models is undefined
// error will be shown if we dont use use server

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongodb"


interface Params {
    text:string,
    author:string,
    communityId : string | null,
    path:string
}

export async function createThread({text,author,communityId,path} : Params) {

    try{
        const createdThread = await Thread.create({
            text,
            author,
            community:null,
            path
        });
    
        // update user model
        await User.findByIdAndUpdate(author,{
            $push:{threads:createdThread._id}
        })
    
        revalidatePath(path) // so that changes happens immediately
    } catch(error:any) {
        throw new Error(`Error creating thread ${error.message}`);
    }

    connectToDB();

    
}