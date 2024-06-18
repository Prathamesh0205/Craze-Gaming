"use server";
import { getSelf } from "@/lib/auth-service";
import { blockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";
import { unblockUser } from "@/lib/block-service";

export const onBlock=async(id:string)=>{
 try {
   
    const blockedUser=await blockUser(id);
    if('id'in blockedUser)
      {
        
    revalidatePath("/")
    if(blockedUser)
      {
          revalidatePath(`${blockedUser.blocked.username}`)
      }

      return blockedUser;
      }else
      {
        throw new Error("Something went wrong")
      }

    
 } catch (error) {
  throw new Error("Internal Error")
 }

}

export const onUnblock=async(id:string)=>{
  try {
    const unblockedUser=await unblockUser(id);

    revalidatePath("/")
     if(unblockedUser)
       {
           revalidatePath(`${unblockedUser.blocked.username}`)
       }

       return unblockedUser;
    
 } catch (error) {
  throw new Error("Internal Error")
 }

}