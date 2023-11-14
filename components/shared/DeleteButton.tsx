"use client";

import { deleteThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import ModalConfirm from "./ModalConfirm";
import { useState } from "react";

interface Props {
  id: string;
  currentUserId: string;
}

function DeleteButton({ id, currentUserId }: Props) {
    const [showModal,setShowModal] = useState<boolean>(false);
  return (
    <>
      {
        !showModal &&
        <Image
        src={"/assets/delete.svg"}
        width={20}
        height={20}
        className={`object-cover rounded-full hover:width-[24px] hover:height-[24px]`}
        alt="delete"
        onClick={()=>setShowModal(true)}
      />}

      {showModal && <ModalConfirm props={{
        setState:setShowModal,
        id,
        currentUserId
        }}/>}
    </>
  );
}

export default DeleteButton;
