import { deleteThread } from "@/lib/actions/thread.actions"
import { Button } from "../ui/button"


function ModalConfirm({props}:any) {
  return (
    <div className="flex flex-col w-full h-[500] ">
        <div>
            Do you want to confirm this action?
        </div>

        <div className="flex justify-between p-2">
            <Button className="bg-green-500" onClick={()=>props.setState(false)}>No</Button>
            <Button className="bg-red-600" onClick={()=>{deleteThread(props.id,`/profie/${props.currentUserId}`)}}>Yes</Button>
        </div>
    </div>
  )
}

export default ModalConfirm