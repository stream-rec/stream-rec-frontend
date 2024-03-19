import React from "react";
import {StreamerSchema} from "@/lib/data/streams/definitions";
import {deleteStreamer} from "@/lib/data/streams/streamer-apis";
import {StreamerCard, StreamerCardProps} from "@/app/[locale]/dashboard/(overview)/(streamers)/streamer";
import {toStreamerCards} from "@/app/[locale]/dashboard/(overview)/(streamers)/streamer-wrapper";
import {getFormatter, getTranslations} from "next-intl/server";

type StreamersListWrapperProps = {
  streamers: StreamerSchema[],
  templateStreamers: StreamerSchema[],
  deleteStreamer: (id: string) => Promise<void>
}

export default async function StreamerListWrapper({templateStreamers, streamers}: StreamersListWrapperProps) {

  const t = await getTranslations('StreamerData');

  const format = await getFormatter()

  const templateCards = await toStreamerCards(templateStreamers, t, format)
  const streamerCards = await toStreamerCards(streamers, t, format)

  return (
      <div className={"grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7"}>
        {
          <>
            {templateCards.map(e => toResponsiveCard(e, deleteStreamer))}
            {streamerCards.map(e => toResponsiveCard(e, deleteStreamer))}
          </>
        }
      </div>
  )
}

export function toStreamerCard(streamer: StreamerCardProps, deleteStreamerAction: (id: string) => Promise<void>) {
  return <StreamerCard
      key={streamer.streamerId}
      streamer={streamer.streamer}
      isActivated={streamer.isActivated}
      streamerId={streamer.streamerId}
      isLive={streamer.isLive}
      streamerAvatar={streamer.streamerAvatar}
      lastStream={streamer.lastStream}
      description={streamer.description}
      platform={streamer.platform}
      deleteStreamer={deleteStreamerAction}
      template={streamer.template}
      bitrate={streamer.bitrate}
      duration={streamer.duration}
  />
}

function toResponsiveCard(streamer: StreamerCardProps, deleteStreamerAction: (id: string) => Promise<void>) {
  return <div key={streamer.streamerId} className={"col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1"}>
    {toStreamerCard(streamer, deleteStreamerAction)}
  </div>
}