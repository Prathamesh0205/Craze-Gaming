import { db } from "./db";


export const getStreamByUserId=async(userId:string)=>{
    //  await new Promise(resolve =>setTimeout(resolve,5000));
    const stream=await db.stream.findUnique({
        where:{userId}
    })

    return stream;
}