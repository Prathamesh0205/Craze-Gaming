"use client"
import { useSidebar } from "@/store/use-sidebar";
import { Stream, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./useritem";

interface ReccomendedProps {
  data: (User &{
    stream:{isLive:boolean}|null;
  })[];
}

export const Reccomended = ({ data }:ReccomendedProps) => {
    const {collapsed}=useSidebar((state)=>state)
    // console.log(User)
    
   const showLabel=!collapsed && data?.length>0;
   console.log(data)

  return <div>
    {showLabel &&(<div className="pl-6 mb-4">
        <p className="text-sm text-muted-foreground">
            Recommended
        </p>

    </div>)}
    <ul className="space-y-2 px-2">
        {data.map((user)=>(
           <UserItem key={user.id} 
           username={user.username}
           imageUrl={user.imageUrl}
           isLive={user.stream?.isLive}
           />
        ))}
    </ul>
     </div>;
};


export const RecommendedSkeleton=()=>{
    return (
        <ul className="px-2 ">
            {[...Array(3)].map((_,i)=>(
                <UserItemSkeleton key={i}/>
            ))}
        </ul>
    )
}