import React from "react";
import {StreamerSchema} from "@/app/lib/data/streams/definitions";
import {deleteStreamer} from "@/app/lib/data/streams/streamer-apis";
import {StreamerCard} from "@/app/dashboard/(overview)/(streamers)/streamer";

type StreamersListWrapperProps = {
  streamers: StreamerSchema[]
  deleteStreamer: (id: string) => Promise<void>
}

export default async function StreamerListWrapper({streamers}: StreamersListWrapperProps) {
  return (
      <div className={"grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7"}>
        {
          streamers.map(streamer => {
            return <div key={streamer.id} className={"col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1"}>
              <StreamerCard key={streamer.url} streamer={streamer.name} streamerId={streamer.id!!}
                            streamerAvatar={streamer.avatar}
                            isLive={streamer.isLive}
                            isActivated={streamer.isActivated} platform={streamer.platform?.toLowerCase() ?? "unknown"}
                            lastStream={streamer.lastStream}
                            description={streamer.streamTitle}
                            deleteStreamer={deleteStreamer}/>
            </div>
          })
        }
      </div>
  )
}