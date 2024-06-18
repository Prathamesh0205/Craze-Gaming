"use client"

import { stringToColor } from "@/lib/utils";
import {format} from "date-fns"
import { ReceivedChatMessage } from "@livekit/components-react"
import { Skeleton } from "../ui/skeleton";

interface ChatMessageProps{
    data:ReceivedChatMessage;
}

export const ChatMessage=({data}:ChatMessageProps)=>{
    const color=stringToColor(data.from?.name||"");
    return (
        <div className="flex gap-2 p-2 rounded-md hover:bg-black/5">
            <p className="text-sm text-black/40">{format(data.timestamp,"HH:MM")}</p>
            <div className="flex flex-wrap items-baseline gap-1 grow">
                <p className="text-sm font-semibold whitespace-nowrap">
                    <span className="truncate" style={{color:color}}>{data.from?.name}</span>:
                </p>
                <p className="text-sm break-all">
                    {data.message}
                </p>
            </div>
        </div>
    )
}

export const ChatSkeleton=()=>{
    return (
        <div className="flex h-full item-center justify-center">
            <Skeleton className="w-1/2 h-6"/>
        </div>
    )
}