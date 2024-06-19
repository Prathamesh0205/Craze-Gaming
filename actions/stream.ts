"use server"


import { Stream } from "@prisma/client"

import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { getSelf } from "@/lib/auth-service"
import { threadId } from "worker_threads"
import { getStreamByUserId } from "@/lib/stream-service"



export const updateStream=async (values:Partial<Stream>)=>{
    try{
        const self=await getSelf();
        let selfStream:Stream|null=null;
        if(self)
        selfStream=await getStreamByUserId(self.id)

        if(!selfStream)
        {
            throw new Error("Stream not found")
        }
     

        const validData={
            name:values.name,
            isChatEnabled:values.isChatEnabled,
            isCharFollowersOnly:values.isCharFollowersOnly,
            isChatDelayed:values.isChatDelayed,
            isLive:values.isLive
        }

         const stream= await db.stream.update({
            where:{
                id:selfStream.id,
            },
            data:{
                ...validData,
            }
         })


     revalidatePath(`/u/${self?.username}/chat`);
     revalidatePath(`/u/${self?.username}`);
     revalidatePath(`/${self?.username}`)
    }catch{
        throw new Error("Internal Error");
    }
}