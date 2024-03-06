import React from "react";
import {StreamerListWrapper} from "@/app/dashboard/streamers/components/streamer-list-wrapper";
import {fetchStreamers} from "@/app/lib/data/streams/streamer-apis";

export default async function StreamerList() {
  const streamers = await fetchStreamers("all");
  return (
      <>
        <StreamerListWrapper streamers={streamers}/>
      </>
  )
}