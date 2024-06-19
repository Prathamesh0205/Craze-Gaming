import { getSelf } from "./auth-service";
import { db } from "./db";


export const getStreams=async()=>{
 let userId;
 try {
    const self=await getSelf();
    userId=self.id

 } catch (error) {
    userId=null;
 }


 let stream=[];

 if(userId)
    {
        stream=await db.stream.findMany({
            where:{
                user:{
                    NOT:{
                        blocking:{
                            some:{
                                blockedId:userId,
                            }
                        }
                    }
                }
            },select:{
                id:true,
                user:true,
                thumbnailUrl:true,
                name:true,
                isLive:true,
            },
            orderBy:[
                {isLive:"desc"},
                {
                 updatedAt:"desc",
                }
             ]
        })

    }else{
        stream=await db.stream.findMany({
            select:{
                id:true,
                user:true,
                thumbnailUrl:true,
                name:true,
                isLive:true,
            },
            orderBy:[
                {isLive:"desc"},
                {
                 updatedAt:"desc",
                }
             ]
        })
    }

    return stream;
}