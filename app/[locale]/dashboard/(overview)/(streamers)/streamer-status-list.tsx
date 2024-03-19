'use client'
import React, {useEffect, useState} from "react";
import {StreamerCardProps} from "@/app/[locale]/dashboard/(overview)/(streamers)/streamer";
import {RecordList} from "@/app/[locale]/dashboard/(overview)/(streamers)/record-list";
import {deleteStreamer} from "@/lib/data/streams/streamer-apis";
import {UpdateSchema} from "@/lib/data/events/definitions";
import {format} from "date-fns";
import {useRouter} from "@/i18n";
import {toastData} from "@/app/utils/toast";


type StreamerStatusListProps = {
  recordingCards: StreamerCardProps[]
  disabledCards: StreamerCardProps[]
  inactiveCards: StreamerCardProps[]
  recordingString: string
  disabledString: string
  inactiveString: string
  wsUrl: string
}

export function StreamerStatusList({
                                     recordingCards,
                                     disabledCards,
                                     inactiveCards,
                                     recordingString,
                                     inactiveString,
                                     disabledString,
                                     wsUrl
                                   }: StreamerStatusListProps) {

  const [bitrates, setBitrates] = useState<Record<number, UpdateSchema>>({});

  const router = useRouter()

  useEffect(() => {
    // vercel does not support websockets
    if (process.env.VERCEL) return

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
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if ('streamerId' in data && 'bitrate' in data) {
        setBitrates(prev => ({...prev, [data.streamerId]: data}));
      } else {
        // if the message is not a bitrate update, refresh the page
        // usually this is a streamer online/offline update
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
  }, []);

  const [bitratedRecordingCards, setBitratedRecordingCards] = useState<StreamerCardProps[]>([]);


  // update the bitrate and duration of the recording cards
  useEffect(() => {
    setBitratedRecordingCards(recordingCards.map(card => {
      const updateData = bitrates[card.streamerId]
      if (updateData) {
        return {...card, bitrate: updateData.bitrate.toString(), duration: secondsToHHmmss(updateData.duration)}
      }
      return card
    }));
  }, [recordingCards, bitrates]);


  return <>
    <div className="space-y-4 col-span-1">
      <RecordList cards={bitratedRecordingCards} title={recordingString} deleteStreamerAction={deleteStreamer}/>
    </div>
    <div className="space-y-4 col-span-1 ">
      <RecordList cards={inactiveCards} title={inactiveString} deleteStreamerAction={deleteStreamer}/>
    </div>
    <div className="space-y-4 col-span-1">
      <RecordList cards={disabledCards} title={disabledString} deleteStreamerAction={deleteStreamer}/>
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