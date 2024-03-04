import StreamerCard from "@/app/dashboard/(overview)/(streamers)/streamer";
import React from "react";
import {fetchStreamers} from "@/app/lib/data/streams/api";


export async function StreamerList() {

  const streamers = await fetchStreamers("all")

  return (
      <>
        <div className={"grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7"}>
          {
            streamers.map(streamer => {
              return <div key={streamer.id} className={"col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1"}>
                <StreamerCard key={streamer.url} streamer={streamer.name} streamerId={streamer.id}
                              streamerAvatar={streamer.avatar}
                              isLive={streamer.isLive}
                              isActivated={streamer.isActivated} platform={streamer.platform ?? "unknown"}
                              lastStream={streamer.lastStream}
                              description={streamer.description}
                />
              </div>
            })
          }
        </div>
      </>
  )
}