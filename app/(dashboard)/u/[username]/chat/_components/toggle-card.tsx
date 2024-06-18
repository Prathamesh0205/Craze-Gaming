"use client"

import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

import { startTransition, useTransition } from "react";
import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";


type FieldTypes="isChatEnabled"|"isChatDelayed"|"isCharFollowersOnly";
interface ToggleCardProps{
   field:FieldTypes;
   label:string;
   value:boolean

}


export const ToggleCard=({field,label,value}:ToggleCardProps)=>{
 const [isPending,startTransition]=useTransition();
    const onChange=()=>{
        startTransition(()=>{
            updateStream({[field]:value?false:true}).then(()=>toast.success("Chat settings updated!")).catch(()=>toast.error("Something went wrong"))
        })
    }

    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex item-center justify-between">
                <p className="font-semibold shrink-0">
                    {label}
                </p>
                <div className="space-y-2">
                    <Switch  disabled={isPending} onCheckedChange={onChange}checked={value}>
                        {value ?"On":"Off"}
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export const ToggleCardSkeleton=()=>{
    return (
        <Skeleton className="rounded-xl p-10 w-full"/>
    )
}