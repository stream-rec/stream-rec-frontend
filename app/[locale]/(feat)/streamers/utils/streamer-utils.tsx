import {StreamerSchema} from "@/lib/data/streams/definitions";
import {deleteStreamer, updateStatus} from "@/lib/data/streams/streamer-apis";
import {StreamerCard, StreamerCardProps} from "@/app/[locale]/(feat)/streamers/components/streamer-card";
import {OpenVideoContextMenuStrings} from "@/app/[locale]/(feat)/streamers/components/open-video-context-menu";
import React from "react";

export const toStreamerCards = (streamers: StreamerSchema[], t: any, format: any) => {
  const formatLastStream = (streamer: StreamerSchema) => {
    if (streamer.isActivated && streamer.isLive) {
      return t('liveNow')
    }

    const lastStream = streamer.lastLiveTime
    if (!lastStream || lastStream == 0) return t("noStreamsYet")
    let lastStreamDate = new Date(lastStream * 1000)
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
      liveUrl: streamer.url,
      deleteStreamer: deleteStreamer
    }
  }) as StreamerCardProps []
}

export const toStreamerCard = (
    streamer: StreamerCardProps,
    contextMenuStrings: OpenVideoContextMenuStrings,
    updateStatusAction: (id: string, status: boolean) => ReturnType<typeof updateStatus>,
    deleteStreamerAction: (id: string) => ReturnType<typeof deleteStreamer>
) => <StreamerCard
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
    contextMenuStrings={contextMenuStrings}
/>;


export function toResponsiveCard(
    streamer: StreamerCardProps,
    contextMenuStrings: OpenVideoContextMenuStrings,
    updateStatusAction: (id: string, status: boolean) => ReturnType<typeof updateStatus>,
    deleteStreamerAction: (id: string) => ReturnType<typeof deleteStreamer>
) {
  return (
      <div key={streamer.streamerId} className={"col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1"}>
        {toStreamerCard(streamer, contextMenuStrings, updateStatusAction, deleteStreamerAction)}
      </div>
  );
}