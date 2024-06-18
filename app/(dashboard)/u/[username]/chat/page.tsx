import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { ToggleCard } from "./_components/toggle-card";

const ChatPage=async()=>{

    const self=await getSelf();
    let stream
    if(self)
    stream=await getStreamByUserId(self.id);

    if(!stream){
        throw new Error("Stream not found")
    }
    return (<div className="p-6">
        <div className="mb-4">
            <h1 className="text-2xl font-bold">
            Chat Setting
            </h1>
        </div>
        <div className="space-y-4">
            <ToggleCard field="isChatEnabled"label="Enable chat" value={stream.isChatEnabled}/>
            <ToggleCard field="isChatDelayed"label="Delay chat" value={stream.isChatDelayed}/>
            <ToggleCard field="isCharFollowersOnly"label="Must be following to chat" value={stream.isCharFollowersOnly}/>
        </div>
       
    </div>)
}

export default ChatPage;