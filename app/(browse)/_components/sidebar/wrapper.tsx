//this is client component
"use client"
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ToggleSkeleton } from "./toggle";
import { Reccomended, RecommendedSkeleton } from "./recommended";
//server component can be wrappered and used inside it
interface WrapperProps{
    children:React.ReactNode;
}


export const Wrapper=({children}:WrapperProps)=>{
        const [isClient,setIsClient]=useState(false);

        const {collapsed} =useSidebar((state)=>state)

        useEffect(()=>{
              setIsClient(true);
        },[])

        if(!isClient) return(
            <div className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-gray-300 border-r border-grey-300 z-50">
                <ToggleSkeleton/>
                <RecommendedSkeleton/>

            </div>
        )
    return (<aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-gray-300 border-r border-grey-300 z-50",collapsed&&"w-[70px]")}>{children}</aside>)

}