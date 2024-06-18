import { Check } from "lucide-react";


export const VerifiedMark=()=>{
    return (
        <div className="p-0.5 flex item-center justify-center h-5 w-5 rounded-full bg-blue-600 mb-2">
            <Check className="h-[11px] w-[11px] text-primary stroke-[4px] "/>
        </div>
    )
}