import React from "react";
import {deleteStreamer, fetchStreamers} from "@/app/lib/data/streams/streamer-apis";
import StreamerListWrapper from "@/app/dashboard/streamers/components/streamer-list-wrapper";

export default async function StreamerList() {
  const streamers = await fetchStreamers("all");
  return (
      <>
        <StreamerListWrapper streamers={streamers} deleteStreamer={deleteStreamer}/>
      </>
  )
}