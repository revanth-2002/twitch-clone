"use client";

import { Participant , Track } from "livekit-client";
import { useRef , useState , useEffect } from "react";
import { useTracks } from "@livekit/components-react";
import { FullscreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";

interface LiveVideoProps {
    participant: Participant;
};


export const LiveVideo = ({
    participant,
}:LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [isFullscreen, SetIsFullscreen] = useState(false);
    const [volume, SetVolume] = useState(0);

    const onVolumeChange = (value: number) => {
        SetVolume(+value);
        if(videoRef?.current) {
            videoRef.current.muted = value === 0;
            videoRef.current.volume = +value * 0.01;
        }
    };
    
    const toggleMute = () => {
        const isMuted = volume === 0;

        SetVolume(isMuted ? 50: 0);

        if(videoRef?.current) {
            videoRef.current.muted = !isMuted;
            videoRef.current.volume = isMuted ? 0.5 : 0;
        }
    };

    useEffect(() => {
        onVolumeChange(0);
    },[]);

    const toggleFullscreen = () => {
        if(isFullscreen){
            document.exitFullscreen()
        } else if (wrapperRef?.current){
            wrapperRef.current.requestFullscreen()
        }
    };

    const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null;
        SetIsFullscreen(isCurrentlyFullscreen);
    };

    useEventListener("fullscreenchange",handleFullscreenChange,wrapperRef);

    useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
        if(videoRef.current){
            track.publication.track?.attach(videoRef.current)
        }
    });



    return (
        <div 
            ref={wrapperRef}
            className="relative h-full flex"
            >
            <video ref={videoRef} width="100%" />
            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
               <div className="absolute bottom-0 flex h-14 w-full items-center
                justify-between bg-gradient-to-r from-neutral-900 px-4">
                   <VolumeControl
                     onChange={() => {}}
                     value={0}
                     onToggle={() => {}}
                   />
                   <FullscreenControl 
                       isFullscreen={isFullscreen}
                       onToggle={toggleFullscreen}
                   />
               </div>
            </div>
        </div>
    );
};

