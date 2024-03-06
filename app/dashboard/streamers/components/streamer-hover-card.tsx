import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/new-york/ui/hover-card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/new-york/ui/avatar";
import {CalendarIcon} from "lucide-react";
import React from "react";
import {Label} from "@/components/new-york/ui/label";
import {Input} from "@/components/new-york/ui/input";
import {fetchStreamer} from "@/app/lib/data/streams/streamer-apis";
import {format} from "date-fns";

type StreamCardProps = {
  streamerId: string,
  streamerName: string
}


export async function StreamerHoverCard({streamerId, streamerName}: StreamCardProps) {

  const streamer = await fetchStreamer(streamerId)

  const getLastStream = () => {
    if (streamer.isLive) {
      return "Live now"
    }
    if (!streamer.lastStream) {
      return "No streams yet"
    }
    const lastDate = new Date(streamer.lastStream)
    return format(lastDate, "LLL dd, y, h:mm a")
  }

  return (
      <>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="space-y-1">
              <Label htmlFor={"Streamer"}>{"Streamer"}</Label>
              <Input id={"Streamer"} value={streamerName} readOnly={true}/>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
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