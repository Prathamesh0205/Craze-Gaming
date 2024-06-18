"use client"

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import {useDebounceValue,useDebounceCallback} from "usehooks-ts"
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";


interface ChatCommunityProps{
    hostName:string;
    viewerName:string;
    isHidden:boolean;

}
export const ChatCommunity=({isHidden,hostName,viewerName}:ChatCommunityProps)=>{
    const [value,setValue]=useState("");
    const participants=useParticipants();
    const debounceValue=useDebounceValue<string>(value,500);
    const onChange=(newValue:string)=>{
        setValue(newValue)
    }
    const filterParticipants=useMemo(()=>{
            const deduped=participants.reduce((acc,participant)=>{
                const hostAsViewer=`host-${participant.identity}`;
                if(!acc.some((p)=>p.identity===hostAsViewer)){
                    acc.push(participant);
                }
              return acc;
            },[] as (RemoteParticipant |LocalParticipant)[])

            return deduped.filter((participant)=>{
                return participant.name?.toLowerCase().includes(value.toLowerCase())
            })
    },[participants,debounceValue])
    if(isHidden){
        return(
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">Community is Disabled</p>
            </div>
        )

    }
    return (<div className="p-4">
        <Input onChange={(e)=>onChange(e.target.value)} placeholder="Search community" className="border-black/10"/>
        <ScrollArea className="gap-y-2 mt-4"/>
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
            No results
        </p>
        {filterParticipants.map((participant)=>(
            <CommunityItem key={participant.identity} hostName={hostName} viewerName={viewerName} participantName={participant.name} participantIdentity={participant.identity}/>
        ))}
    </div>)
}