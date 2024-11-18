'use server'
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/src/components/new-york/ui/hover-card";
import {Avatar, AvatarFallback, AvatarImage} from "@/src/components/new-york/ui/avatar";
import {CalendarIcon} from "lucide-react";
import React from "react";
import {Label} from "@/src/components/new-york/ui/label";
import {Input} from "@/src/components/new-york/ui/input";
import {fetchStreamer} from "@/src/lib/data/streams/streamer-apis";
import {getFormatter, getTranslations} from "next-intl/server";
import {StreamerState} from "@/src/lib/data/streams/definitions";

type StreamCardProps = {
  streamerId: string,
  streamerName: string
}


export async function StreamerHoverCard({streamerId, streamerName}: StreamCardProps) {

  const streamer = await fetchStreamer(streamerId)

  const format = await getFormatter()

  const t = await getTranslations('StreamerData')

  const getLastStream = () => {
    if (streamer.state !== StreamerState.CANCELLED) {
      return t("state", {state: streamer.state});
    }
    if (!streamer.lastLiveTime) {
      return t('noStreamsYet')
    }
    const lastDate = new Date(streamer.lastLiveTime * 1000)
    return format.relativeTime(lastDate)
  }

  return (
      <>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="space-y-1">
              <Label htmlFor={"Streamer"}>{t("name")}</Label>
              <Input id={"Streamer"} value={streamerName} readOnly={true}/>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex space-x-4">
              <Avatar>
                {streamer.avatar && (<AvatarImage src={streamer.avatar}/>)}
                <AvatarFallback>{streamerName}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{streamerName}</h4>
                <p className="text-sm">{streamer.streamTitle}</p>
                <div className="flex items-center pt-2">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70"/>{" "}
                  <span className="text-xs text-muted-foreground">{getLastStream()}</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </>
  )

}