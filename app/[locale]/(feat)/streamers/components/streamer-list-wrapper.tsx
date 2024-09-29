import React from "react";
import {StreamerSchema} from "@/lib/data/streams/definitions";
import {deleteStreamer, updateStatus} from "@/lib/data/streams/streamer-apis";
import {StreamerCard, StreamerCardProps} from "@/app/[locale]/(feat)/streamers/components/streamer-card";
import {toStreamerCards} from "@/app/[locale]/(feat)/streamers/components/streamer-wrapper";
import {getFormatter, getTranslations} from "next-intl/server";
import {OpenVideoContextMenuStrings} from "@/app/[locale]/(feat)/streamers/components/open-video-context-menu";

type StreamersListWrapperProps = {
  streamers: StreamerSchema[],
  templateStreamers: StreamerSchema[],
  contextMenuStrings: OpenVideoContextMenuStrings,
  deleteStreamer: (id: string) => Promise<void>
}

export default async function StreamerListWrapper({templateStreamers, streamers, contextMenuStrings}: StreamersListWrapperProps) {

  const t = await getTranslations('StreamerData');

  const format = await getFormatter()

  const templateCards = await toStreamerCards(templateStreamers, t, format)
  const streamerCards = await toStreamerCards(streamers, t, format)

  return (
      <div className={"grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7"}>
        {
          <>
            {templateCards.map(e => toResponsiveCard(e, contextMenuStrings, updateStatus, deleteStreamer))}
            {streamerCards.map(e => toResponsiveCard(e, contextMenuStrings, updateStatus, deleteStreamer))}
          </>
        }
      </div>
  )
}

export function toStreamerCard(streamer: StreamerCardProps, contextMenuStrings: OpenVideoContextMenuStrings, updateStatusAction: (id: string, status: boolean) => ReturnType<typeof updateStatus>, deleteStreamerAction: (id: string) => Promise<void>) {
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
      updateStatus={updateStatusAction}
      template={streamer.template}
      bitrate={streamer.bitrate}
      duration={streamer.duration}
      downloadUrl={streamer.downloadUrl}
      liveUrl={streamer.liveUrl}
      contextMenuStrings={contextMenuStrings}/>
}

function toResponsiveCard(streamer: StreamerCardProps, contextMenuStrings: OpenVideoContextMenuStrings, updateStatusAction: (id: string, status: boolean) => ReturnType<typeof updateStatus>, deleteStreamerAction: (id: string) => Promise<void>) {
  return <div key={streamer.streamerId} className={"col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1"}>
    {toStreamerCard(streamer, contextMenuStrings, updateStatusAction, deleteStreamerAction)}
  </div>
}