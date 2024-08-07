"use client";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";


import {
    Fullscreen,
    KeyRound,
    MessageSquare,
    Users
} from "lucide-react"
import { NavItem, NavItemSkeleton } from "./navitem";
export const Navigation=()=>{

    const {user}=useUser();
    const pathname=usePathname();
  
    const routes=[
        {
            label:"Stream",
            href:`/u/${user?.username}`,
            icon:Fullscreen
        },
        {
            label:"Keys",
            href:`/u/${user?.username}/keys`,
            icon:KeyRound,
        },{

            label:"Chat",
            href:`/u/${user?.username}/chat`,
            icon:MessageSquare,
        },
    ];


    if(!user?.username)
        {
            return (
                <ul className="space-y-2">
                    {
                        [...Array(4)].map((_,i)=>(
                            <NavItemSkeleton key={i}/>
                        ))
                    }
                </ul>
            )
        }

    return (
       <ul className="space-y-2 px-2 pt-4 lg:pt-0">{
        routes.map((route)=>(
          
                <NavItem 
                key={route.href} 
                label={route.label}
                icon={route.icon}
                href={route.href}
                isActive={pathname===route.href}/>
           
        ))
       }</ul>
    )
}