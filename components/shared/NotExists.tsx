"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  type: string;
}

function NotExists({ type }: Props) {
    const router = useRouter();
  return (
    <div className="text-center">
      <div className="text-white mb-10">{`Sorry! ${type} you are looking for doesn't exists anymore!`}</div>
      <Button className="bg-purple-800">
        <div onClick={()=>router.push("/")}>Move to home page</div>
      </Button>
    </div>
  );
}

export default NotExists;
