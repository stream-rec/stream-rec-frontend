import {RecordList} from "@/app/dashboard/(overview)/(streamers)/record-list";
import React from "react";
import {deleteStreamer, fetchStreamers} from "@/app/lib/data/streams/streamer-apis";

export default async function StreamerWrapper() {

  const totalStreamers = await fetchStreamers('non-template'), disabledStreamers = totalStreamers.filter(streamer => !streamer.isActivated),
      activeStreamers = totalStreamers.filter(streamer => streamer.isActivated),
      recordingStreamers = activeStreamers.filter(streamer => streamer.isLive),
      inactiveStreamers = activeStreamers.filter(streamer => !streamer.isLive);

  return (
      <>
        <div className="space-y-4 col-span-1">
          <RecordList streamers={recordingStreamers} title="Recording" deleteStreamerAction={deleteStreamer}/>
        </div>
        <div className="space-y-4 col-span-1 ">
          <RecordList streamers={inactiveStreamers} title="Inactive" deleteStreamerAction={deleteStreamer}/>
        </div>
        <div className="space-y-4 col-span-1">
          <RecordList streamers={disabledStreamers} title="Disabled" deleteStreamerAction={deleteStreamer}/>
        </div>
      </>
  )
}