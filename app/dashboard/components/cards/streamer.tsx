import {Card, CardContent, CardHeader, CardTitle} from "@/components/new-york/ui/card";
import React from "react";
import {Avatar, AvatarImage} from "@/components/new-york/ui/avatar";
import {format} from "date-fns";
import {clsx} from "clsx";

type StreamerCardProps = {
  streamer: string;
  description?: string;
  streamerId: number;
  streamerAvatar: string;
  isLive: boolean;
  isActivated: boolean;
  lastStream?: number;
}
export default function StreamerCard({
                                       streamer,
                                       description,
                                       streamerId,
                                       streamerAvatar,
                                       isLive,
                                       isActivated,
                                       lastStream
                                     }: StreamerCardProps) {

  const getLastStreamInfo = () => {
    if (isLive) {
      return "Currently streaming"
    }

    let lastStreamDate = new Date(lastStream || 0)

    if (lastStreamDate.getTime() === 0) {
      return "No streams yet"
    }
    const nowDate = new Date()

    // if last stream was today, get the hours
    if (lastStreamDate.toDateString() === nowDate.toDateString()) {
      return `Last stream was ${lastStreamDate.getHours()} hours ago`
    }
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    // if last stream was yesterday, display yesterday
    if (lastStreamDate.toDateString() === yesterday.toDateString()) {
      return `Last stream was yesterday`
    }
    // else display the date
    return `last stream was ${format(lastStreamDate, "dd/MM/yyyy")}`
  }

  return (
      <>
        <Card className={"mx-auto"}>
          <CardHeader className={"space-y-2"}>
            <div className={"space-y-4 md:flex md:flex-row md:space-x-2.5 md:space-y-0.5"}>
              <Avatar>
                <AvatarImage src={streamerAvatar} alt={streamer}></AvatarImage>
              </Avatar>

              <div className={"flex flex-col mt-0.5 space-y-1 justify-center"}>
                <CardTitle className={description ? "" : "md:self-center"}>{streamer}</CardTitle>
                {description && <p className="text-[0.75rem] text-muted-foreground">{description}</p>}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className={"text-[0.70rem] text-muted-foreground"}>{getLastStreamInfo()} </p>
          </CardContent>
        </Card>
      </>
  )
}