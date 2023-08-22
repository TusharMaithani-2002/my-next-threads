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

export async function fetchPosts(pageNumber = 1,pageSize=20) {
    
    connectToDB();

    try {
        const skipAmount = (pageNumber - 1) * pageSize;

        // fetch the posts that have no parents (top level threads...)
        const postsQuery = Thread.find({parentId: {$in:[null,undefined]}})
        .sort({createdAt : 'desc'})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({path:'author',model:User})
        .populate({path:'children',populate:{
            path:'author',
            options:{strictPopulate:false},
            model:User,
            select:"_id name parentId Image"
        }})
    
        const totalPostCount = await Thread.countDocuments({parentId: {$in:[null,undefined]}});
    
        const posts = await postsQuery.exec();
    
        // checking if we have more pages or not
        const isNext = totalPostCount > skipAmount + posts.length;
    
        return {posts,isNext};

    } catch(error:any) {
        throw new Error(`Error while getting thread ${error.message}`)
    }



}