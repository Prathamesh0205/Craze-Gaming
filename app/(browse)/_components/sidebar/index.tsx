
import { Toggle, ToggleSkeleton } from "./toggle";
import { Wrapper } from "./wrapper";
import { Reccomended, RecommendedSkeleton } from "./recommended";
import { getRecommended } from "@/lib/recommended-service";
import { getFollowedUser } from "@/lib/follow-service";
import { Following, FollowingSkeleton } from "./following";
import { IngressInput } from "livekit-server-sdk";
import { createIngress } from "@/actions/ingress";
export const Sidebar = async() => {

    const recommended=await getRecommended();
    const follow=await getFollowedUser();
    // console.log(recommended)
  return (
    <Wrapper>
      <Toggle/>
      <div className="space-y-4 pt-4 lg:pt-0">
      <Following data={follow}/>
        <Reccomended data={recommended}/>
       
      </div>
  
    </Wrapper>
  );
};


export const SidebarSkeleton=()=>{

  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r z-50">
      <ToggleSkeleton/>
      <FollowingSkeleton/>
      <RecommendedSkeleton/>
    </aside>
  )
}