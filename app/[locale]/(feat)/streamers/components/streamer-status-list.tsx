'use client'
import React, {useEffect, useState} from "react";
import {StreamerCardProps} from "@/app/[locale]/(feat)/streamers/components/streamer";
import {RecordList} from "@/app/[locale]/(feat)/streamers/components/record-list";
import {deleteStreamer} from "@/lib/data/streams/streamer-apis";
import {UpdateSchema} from "@/lib/data/events/definitions";
import {format} from "date-fns";
import {useRouter} from "@/i18n";
import {toastData} from "@/app/utils/toast";
import {OpenVideoContextMenuStrings} from "@/app/[locale]/(feat)/streamers/components/open-video-context-menu";


type StreamerStatusListProps = {
  recordingCards: StreamerCardProps[]
  disabledCards: StreamerCardProps[]
  inactiveCards: StreamerCardProps[]
  recordingString: string
  disabledString: string
  inactiveString: string
  wsUrl: string,
  contextMenuStrings: OpenVideoContextMenuStrings
}

const heartBeatInterval = 45000
const heartBeatDataArray = new Uint8Array(4)
heartBeatDataArray[0] = 0x88
heartBeatDataArray[1] = 0x88
heartBeatDataArray[2] = 0x88
heartBeatDataArray[3] = 0x88

export function StreamerStatusList({
                                     recordingCards,
                                     disabledCards,
                                     inactiveCards,
                                     recordingString,
                                     inactiveString,
                                     disabledString,
                                     wsUrl,
                                     contextMenuStrings
                                   }: StreamerStatusListProps) {

  const [bitrates, setBitrates] = useState<Record<number, UpdateSchema>>({});

  const router = useRouter()


  useEffect(() => {
    let ws: WebSocket;
    try {
      ws = new WebSocket(wsUrl);
    } catch (e) {
      console.error('WebSocket error:', e)
      toastData('error', 'WebSocket connection failed', "info")
      return
    }
    ws.onopen = () => {
      console.log('WebSocket connection established');
      // send a heartbeat message every 45 seconds to keep the connection alive
      setInterval(() => {
        ws.send(heartBeatDataArray)
      }, heartBeatInterval)
    };

    ws.onmessage = (event) => {
      // console.log('WebSocket message received:', event.data);

      // check if the message is a heartbeat message
      // heartbeats are sent as a Uint8Array, so we can check if the message is a blob
      if (event.data instanceof Blob) {
        return
      }

      const data = JSON.parse(event.data);
      const type = data.type as string;
      if ('streamerId' in data && 'bitrate' in data) {
        setBitrates(prev => ({...prev, [data.streamerId]: data}));
      } else if (type.includes('StreamerOffline') || type.includes('StreamerOnline')) {
        // refresh the page when a streamer goes online or offline
        router.refresh()
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log(`WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        console.log('WebSocket connection died');
      }
    };

    return () => {
      console.log('WebSocket connection closed');
      ws.close();
    };
  }, [router, wsUrl]);

  const [bitratedRecordingCards, setBitratedRecordingCards] = useState<StreamerCardProps[]>([]);


  // update the bitrate and duration of the recording cards
  useEffect(() => {
    setBitratedRecordingCards(recordingCards.map(card => {
      const updateData = bitrates[card.streamerId];
      return updateData ? {
        ...card,
        bitrate: updateData.bitrate == 0 ? null : updateData.bitrate.toString(),
        duration: secondsToHHmmss(updateData.duration),
        downloadUrl: updateData.url
      } : card;
    }));
  }, [recordingCards, bitrates]);


  return <>
    <div className="space-y-4 col-span-1">
      <RecordList cards={bitratedRecordingCards} title={recordingString} deleteStreamerAction={deleteStreamer}
                  contextMenuStrings={contextMenuStrings}/>
    </div>
    <div className="space-y-4 col-span-1 ">
      <RecordList cards={inactiveCards} title={inactiveString} deleteStreamerAction={deleteStreamer} contextMenuStrings={contextMenuStrings}/>
    </div>
    <div className="space-y-4 col-span-1">
      <RecordList cards={disabledCards} title={disabledString} deleteStreamerAction={deleteStreamer} contextMenuStrings={contextMenuStrings}/>
    </div>
  </>
}

function secondsToHHmmss(seconds: number) {
  const duration = {
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: Math.floor(seconds % 60),
  }
  return format(new Date(0, 0, 0, duration.hours, duration.minutes, duration.seconds), 'HH:mm:ss');
}