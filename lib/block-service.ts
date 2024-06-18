import { db } from "./db";

import { getSelf } from "./auth-service";




export const isBlockedByUser=async(id:string)=>{
    try{
     const self=await getSelf();

     const otherUser=await db.user.findUnique({
        where:{
            id
        }
     })
   

     if(!otherUser)
        {
            throw new Error("User not found");
        }

        if(otherUser.id===self.id)
            {
                return false;
            }

    const existingBlock=await db.block.findUnique({
        where:{
            blockedId_blockerId:{
                blockedId:self.id,
                blockerId:otherUser.id
            }
        },
    })
    // console.log(existingBlock)

    return !!existingBlock;


    }catch{
        false;
    }
}

export const blockUser=async(id:string)=>{
    const self=await getSelf();

    const otherUser=await db.user.findUnique({
        where:{id}
    });
  
       console.log(otherUser,id)
        
    if(!otherUser)
    {
        throw new Error("User not found")
    }
    if(self.id===otherUser.id)
        {
            throw new Error("Cannot block yourself")
        }

   


    const existingBlock=await db.block.findUnique({
        where:{
            blockedId_blockerId:{
                blockedId:otherUser.id,
                blockerId:self.id
            }
        }
    })


    if(existingBlock)
        {
            throw new Error("User is already blocked")
        }

 const blockedUser=await db.block.create({
    data:{
        blockerId:self.id,
        blockedId:otherUser.id
    },
    include:{
        blocked:true,
        blocker:true,
    }
 })

 return blockedUser;

}

export const unblockUser=async(id:string)=>{

    const self=await getSelf();

    if(!self)
        throw new Error ("please login")

    if(self.id===id)
        {
            throw new Error("Cannot unblock yourself")
        }

    const otherUser=await db.user.findUnique({
        where:{
            id
        }
    })

    if(!otherUser)
        {
            throw new Error("User not found");
        }

    const existingBlock=await db.block.findUnique({
        where:{
            blockedId_blockerId:{
                blockerId:self.id,
                blockedId:otherUser.id
            }
        }
    })

    if(!existingBlock)
        {
            throw new Error("Not blocked");
        }

const unblock=await db.block.delete({
    where:{
        id:existingBlock.id
    },include:{
        blocked:true
    }
})

return unblock;
}