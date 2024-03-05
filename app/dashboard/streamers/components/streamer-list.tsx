import React from "react";
import {StreamerListWrapper} from "@/app/dashboard/streamers/components/streamer-list-wrapper";
import {fetchStreamers} from "@/app/lib/data/streamer/api";

export default async function StreamerList() {
  const streamers = await fetchStreamers("all");
  return (
      <>
        <StreamerListWrapper streamers={streamers}/>
      </>
  )
}