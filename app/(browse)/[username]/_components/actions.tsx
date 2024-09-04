"use client";

import { onBlock , onUnBlock } from "@/actions/block";
import { onFollow , onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    userId : string;
};

export const Actions = ({
   isFollowing,
   userId,
} : ActionsProps) =>{
    const [isPending,startTransition] = useTransition();

    const onClick = () =>{
     if(!isFollowing){
        startTransition(() => {
            onFollow(userId)
            .then((data) => toast.success(`you are now following ${data.following.username}`))
            .catch(() => toast.error("Something went wrong"));
        });
      }
      else
      {
        startTransition(() => {
            onUnFollow(userId)
            .then((data) => toast.success(`you have unfollowed ${data.following.username}`))
            .catch(() => toast.error("Something went wrong"));
        });
      }
    };

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
            .then((data) => toast.success(`you are now following ${data.blocked.username}`))
            .catch(() => toast.error("Something went wrong"));
        });
    }

    return (
        <>
            <Button 
            disabled={isPending} 
            onClick={onClick}
            variant="primary"

            >
                {isFollowing ? "unfollow":"follow"}
            </Button>
            <Button onClick={handleBlock} disabled={isPending}>
                Block
            </Button>
        </>
    )
}