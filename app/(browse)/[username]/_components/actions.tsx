"use client";

import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export const Actions = () =>{
    const [isPending,startTransition] = useTransition();

    const onClick = () =>{
        startTransition(() => {
            onFollow("abc");
        });
    };

    return (
        <Button disabled={isPending} onClick={onClick} variant="primary">
            Follow
        </Button>
    )
}