"use client"

import { Button } from "@/components/ui/button";
import { onFollow,onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { onBlock, onUnblock } from "@/actions/block";
export const Actions=({isFollowing,userId}:{isFollowing:boolean,userId:string})=>{
    const [isPending,startTransition]=useTransition();
    const handleFollow=()=>{
        startTransition(()=>{
            onFollow(userId).then((data)=>toast.success(`You are now following ${data.following.username}`)).catch(()=>toast.error("Something went wrong"))
        })
       
    }
    const handleunFollow=()=>{
        startTransition(()=>{
            onUnfollow(userId).then((data)=>toast.success(`You have unfollowed ${data.following.username}`)).catch(()=>toast.error("Something went wrong"))
        })
       
    }

    const onClick=()=>{
        if(isFollowing)
            {
                handleunFollow();
            }else
            {
                handleFollow();
            }
    }

    const handleBlock=()=>{
        startTransition(()=>{
            
            onBlock(userId).then((data)=>toast.success(`Blocked the user ${data.blocked.username}`)).catch(() => toast.error("Something went wrong"))
        })
    }
    return (
        <>
        <Button disabled={isPending} onClick={onClick}>
           {isFollowing?"Unfollow":"Follow"}
        </Button>
        <Button onClick={handleBlock} disabled={isPending}>
            block
        </Button>
        </>
    )
}