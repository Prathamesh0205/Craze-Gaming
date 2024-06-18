import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font=Poppins({
    subsets:["latin"],
    weight:["200","300","400","500","600","700","800"],
})


export const Logo=()=>{
    return (
        <div className="flex flex-col items-center gap-y-4">
             <div className="rounded-full mr-5 mb-0">
                <Image src="/bird_2.jpg"  alt="Gamehub" height="30" width="100"/>
             </div>
             <div className="flex flex-col item-center justify-center">
                <p className={cn("text-xl font-semibold ",
                    font.className
                )}>
                    Gamehub
                </p>
                <p className={cn("text-sm text-muted-foreground ",font.className)} >
                    Let&apos;s play
                </p>
             </div>
        </div>
    )
}