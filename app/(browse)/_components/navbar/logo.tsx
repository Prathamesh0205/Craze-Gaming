import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font=Poppins({
    subsets:["latin"],
    weight:["200","300","400","500","600","700","800"],
})


export const Logo=()=>{
    return (
        <Link href="/">
            <div className="flex lg:flex item-center gap-x-4 hover:opacity-75 transition">
               <div className="p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
                <Image src="/img1.png" alt="Gamehub" height="42" width="42"/>
               </div>
                <div className={cn("hidden lg:block",font.className)}>
                    <p className="text-lg font-semibold">
                        Gamehub
                    </p>
                    <p className="text-xs text-muted-f">
                        Let&apos;s play
                    </p>
                </div>
            </div>

        </Link>
    )
}