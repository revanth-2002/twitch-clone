import Image from "next/image";
import {Poppins} from "next/font/google";

import {cn} from "@/lib/utils";

const font = Poppins({
    subsets:["latin"],
    weight:["200","300","400","500","600","700","800"],
});

export const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="bg-white rounded-full p-3">
               <Image
                 src="/tv.svg" 
                 alt="livehub"
                 height="50"
                 width="50"
               />
            </div>
            <div className={cn(
                "flex flex-col items-center",
                font.className,
                )}>
                <p className="text-xl font-semibold">
                    Livehub
                </p>
                <p className="text-sm text-muted-foreground">
                    Let's go live
                </p>
            </div>
        </div>
    );
}