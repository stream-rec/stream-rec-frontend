'use client'
import StreamerCard from "@/app/dashboard/(overview)/(streamers)/streamer";
import React from "react";
import {useRouter} from "next/navigation";
import {StreamerSchema} from "@/app/lib/data/streams/definitions";

type StreamersListWrapperProps = {
  streamers: StreamerSchema[]
}

export async function StreamerListWrapper({streamers}: StreamersListWrapperProps) {

  const router = useRouter()

  return (
      <div className={"grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7"}>
        {
          streamers.map(streamer => {
            return <div key={streamer.id} className={"col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1"}>
              <StreamerCard key={streamer.url} streamer={streamer.name} streamerId={streamer.id}
                            streamerAvatar={streamer.avatar}
                            isLive={streamer.isLive}
                            isActivated={streamer.isActivated} platform={streamer.platform?.toLowerCase() ?? "unknown"}
                            lastStream={streamer.lastStream}
                            description={streamer.description}
                            onStreamerDelete={() => {
                              router.refresh()
                            }}
              />
            </div>
          })
        }
      </div>
  )
}