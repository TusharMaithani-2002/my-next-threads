"use client";

import { deleteThread } from "@/lib/actions/thread.actions";
import Image from "next/image";

interface Props {
    id:string,
    currentUserId:string
}

function DeleteButton({id,currentUserId}:Props) {
  return (

        <Image
          src={"/assets/delete.svg"}
          width={20}
          height={20}
          className="object-cover rounded-full"
          alt="delete"
          onClick={()=>deleteThread(id,`/profie/${currentUserId}`)}
        />

  );
}

export default DeleteButton;
