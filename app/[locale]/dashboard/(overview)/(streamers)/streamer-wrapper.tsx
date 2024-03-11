import React from "react";
import {RecordList} from "@/app/[locale]/dashboard/(overview)/(streamers)/record-list";
import {deleteStreamer, fetchStreamers} from "@/lib/data/streams/streamer-apis";
import {StreamerCardProps} from "@/app/[locale]/dashboard/(overview)/(streamers)/streamer";
import {StreamerSchema} from "@/lib/data/streams/definitions";
import {getFormatter, getTranslations} from "next-intl/server";

type StreamerWrapperProps = {
  recordingString: string;
  inactiveString: string;
  disabledString: string;
}

// use hook to pass down streamer data to client card
// I don't want to create a next intl provider, so a server hook is used
export const toStreamerCards = async (streamers: StreamerSchema[], t: any, format: any) => {
  const formatLastStream = (streamer: StreamerSchema) => {
    if (streamer.isActivated && streamer.isLive) {
      return t('liveNow')
    }

    const lastStream = streamer.lastLiveTime
    if (!lastStream || lastStream == 0) return t("noStreamsYet")
    let lastStreamDate = new Date(lastStream)
    return format.relativeTime(lastStreamDate)
  }

  return streamers.map(streamer => {
    return {
      streamer: streamer.name,
      description: streamer.streamTitle,
      streamerId: streamer.id,
      streamerAvatar: streamer.avatar,
      isLive: streamer.isLive,
      isActivated: streamer.isActivated,
      lastStream: formatLastStream(streamer),
      platform: streamer.platform,
      template: streamer.isTemplate ? t('template') : null,
      deleteStreamer: deleteStreamer
    }
  }) as StreamerCardProps []
}


export default async function StreamerWrapper({recordingString, inactiveString, disabledString}: StreamerWrapperProps) {
  const totalStreamers = await fetchStreamers('non-template'), disabledStreamers = totalStreamers.filter(streamer => !streamer.isActivated),
      activeStreamers = totalStreamers.filter(streamer => streamer.isActivated),
      recordingStreamers = activeStreamers.filter(streamer => streamer.isLive),
      inactiveStreamers = activeStreamers.filter(streamer => !streamer.isLive);

  const t = await getTranslations('StreamerData');

  const format = await getFormatter()

  function toCards(schemas: StreamerSchema[]) {
    return toStreamerCards(schemas, t, format)
  }

  const [recordingCards, disabledCards, inactiveCards] = await Promise.all([toCards(recordingStreamers), toCards(disabledStreamers), toCards(inactiveStreamers)])


  return (
      <>
        <div className="space-y-4 col-span-1">
          <RecordList cards={recordingCards} title={recordingString} deleteStreamerAction={deleteStreamer}/>
        </div>
        <div className="space-y-4 col-span-1 ">
          <RecordList cards={inactiveCards} title={inactiveString} deleteStreamerAction={deleteStreamer}/>
        </div>
        <div className="space-y-4 col-span-1">
          <RecordList cards={disabledCards} title={disabledString} deleteStreamerAction={deleteStreamer}/>
        </div>
      </>
  )
}