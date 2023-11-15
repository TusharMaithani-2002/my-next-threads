"use client";
import {useState} from 'react';
import { addLikeId } from "@/lib/actions/thread.actions";
import Image from "next/image";

interface Props {
    liked:boolean|undefined;
    id:string;
    currentUserId:string;
    likeCount:number;
    path?:string
}

function LikeButton({liked,id,currentUserId,likeCount,path}:Props) {

    const [likes,setLikes] = useState<number>(Number.isNaN(likeCount)?0:likeCount);
    const [isLiked,setIsLiked] = useState<boolean|undefined>(liked);
  return (
    <div className="flex text-white">
    <span className="text-xs">{likes}</span>
    <Image
      src={isLiked ? `/assets/heart-filled.svg` : `/assets/heart-gray.svg`}
      alt="heart"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={()=>{

        addLikeId(id,currentUserId,path);
        setIsLiked(prev=>!prev)
        if(!isLiked) {
            setLikes(likes+1);
        } else {
            setLikes(likes-1);
        }
    }}
    />
    </div>
  );
}

export default LikeButton;
