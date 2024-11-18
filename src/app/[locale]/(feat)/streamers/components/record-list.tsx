'use client';
import React, {useEffect, useState} from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/src/components/new-york/ui/collapsible";
import {Button} from "@/src/components/new-york/ui/button";

import {StreamerCardProps} from "@/src/app/[locale]/(feat)/streamers/components/streamer-card";
import {CaretDownIcon, CaretUpIcon} from "@radix-ui/react-icons";
import {OpenVideoContextMenuStrings} from "@/src/app/[locale]/(feat)/streamers/components/open-video-context-menu";
import {deleteStreamer, updateState} from "@/src/lib/data/streams/streamer-apis";
import {toastData} from "@/src/app/utils/toast";
import {UpdateSchema} from "@/src/lib/data/events/definitions";
import {useRouter} from "@/src/i18n/routing";
import {secondsToHHmmss} from "@/src/app/utils/conversions";
import {wsHeartbeatArray, wsHeartbeatInterval} from "@/src/lib/data/websocket/definitions";
import {toStreamerCard} from "@/src/app/[locale]/(feat)/streamers/utils/streamer-utils";
import {StreamerState} from "@/src/lib/data/streams/definitions";

type RecordListProps = {
  title: string,
  cards: StreamerCardProps[],
  contextMenuStrings: OpenVideoContextMenuStrings,
  wsUrl: string | undefined,
  updateStatus: (id: string, status: StreamerState) => ReturnType<typeof updateState>,
  deleteStreamerAction: (id: string) => ReturnType<typeof deleteStreamer>
}

export function RecordList({
                             cards,
                             title,
                             contextMenuStrings,
                             wsUrl,
                             updateStatus,
                             deleteStreamerAction
                           }: RecordListProps) {

  const [isOpen, setIsOpen] = React.useState(true)

  const [bitrates, setBitrates] = useState<Record<number, UpdateSchema>>({});

  const router = useRouter()

  useEffect(() => {
    // don't create a websocket connection if the wsUrl is undefined
    if (!wsUrl) {
      return
    }

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
        if (ws.readyState !== ws.OPEN) {
          return
        }
        ws.send(wsHeartbeatArray)
      }, wsHeartbeatInterval)
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
  }, [router, wsUrl])

  // update the bitrate and duration of the recording cards
  useEffect(() => {
    // don't update the cards if the wsUrl is undefined
    if (!wsUrl) {
      return
    }

    if (Object.keys(bitrates).length === 0) {
      return
    }

    cards.forEach(card => {
      const updateData = bitrates[card.streamerId];
      if (updateData) {
        card.bitrate = updateData.bitrate == 0 ? null : updateData.bitrate.toString();
        card.duration = secondsToHHmmss(updateData.duration);
        card.downloadUrl = updateData.url;
      }
    });
  }, [cards, bitrates, wsUrl]);

  return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className={"space-y-2"}>
        <div className="flex items-center space-x-4 justify-between">
          <h3 className="text-xm font-semibold"> {title}</h3>
          <h3 className="text-xs px-2 py-0.5 bg-muted rounded-md">{cards.length}</h3>

          <div className={"flex-1"}>
            <CollapsibleTrigger className={"float-end"} asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? <CaretDownIcon/> : <CaretUpIcon/>}
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>

        </div>

        <CollapsibleContent className="space-y-4">
          <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2"}>
            {
              cards.map(streamer => toStreamerCard(streamer, contextMenuStrings, updateStatus, deleteStreamerAction))
            }
          </div>
        </CollapsibleContent>
      </Collapsible>
  )
}