import React, {useMemo} from "react";
import {deleteStreamer, fetchStreamers} from "@/lib/data/streams/streamer-apis";
import {StreamerCardProps} from "@/app/[locale]/(feat)/streamers/components/streamer";
import {StreamerSchema} from "@/lib/data/streams/definitions";
import {StreamerStatusList} from "@/app/[locale]/(feat)/streamers/components/streamer-status-list";
import {WS_API_URL} from "@/lib/data/events/events-api";
import {useFormatter, useTranslations} from "next-intl";

type StreamerWrapperProps = {
  recordingString: string;
  inactiveString: string;
  disabledString: string;
}

// use hook to pass down streamer data to client card
// I don't want to create a next intl provider, so a server hook is used
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


export function StreamerWrapper({recordingString, inactiveString, disabledString}: StreamerWrapperProps) {

  const fetchPromise = fetchStreamers('non-template')

  const totalStreamers = React.use(fetchPromise);

  const {disabledStreamers, activeStreamers, recordingStreamers, inactiveStreamers} = useMemo(() => {
    const disabledStreamers = totalStreamers.filter(streamer => !streamer.isActivated),
        activeStreamers = totalStreamers.filter(streamer => streamer.isActivated),
        recordingStreamers = activeStreamers.filter(streamer => streamer.isLive),
        inactiveStreamers = activeStreamers.filter(streamer => !streamer.isLive);
    return {disabledStreamers, activeStreamers, recordingStreamers, inactiveStreamers}
  }, [totalStreamers])

  const t = useTranslations('StreamerData');
  const contextMenuT = useTranslations('OpenVideoContextMenu');

  const format = useFormatter()

  const toCards = (schemas: StreamerSchema[]) => toStreamerCards(schemas, t, format);

  const [recordingCards, disabledCards, inactiveCards] = useMemo(() => {
    return [toCards(recordingStreamers), toCards(disabledStreamers), toCards(inactiveStreamers)]
  }, [recordingStreamers, disabledStreamers, inactiveStreamers])

  return (
      <>
        <StreamerStatusList recordingCards={recordingCards} disabledCards={disabledCards} inactiveCards={inactiveCards}
                            recordingString={recordingString} inactiveString={inactiveString} disabledString={disabledString} wsUrl={WS_API_URL}
                            contextMenuStrings={{
                              download: contextMenuT('download'),
                              openWithPotPlayer: contextMenuT('openWith', {player: 'PotPlayer'})
                            }}/>
      </>
  )
}