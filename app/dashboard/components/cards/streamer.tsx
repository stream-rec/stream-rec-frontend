import {Card, CardContent, CardHeader, CardTitle} from "@/components/new-york/ui/card";
import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/new-york/ui/avatar";
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import {clsx} from "clsx";
import {Badge} from "@/components/new-york/ui/badge";
import {Button} from "@/components/new-york/ui/button";
import {SettingsIcon} from "lucide-react";

type StreamerCardProps = {
  streamer: string;
  description?: string;
  streamerId: number;
  streamerAvatar: string;
  isLive: boolean;
  isActivated: boolean;
  lastStream?: number;
  platform?: string;
}
export default function StreamerCard({
                                       streamer,
                                       description,
                                       streamerId,
                                       streamerAvatar,
                                       isLive,
                                       isActivated,
                                       lastStream,
                                       platform,
                                     }: StreamerCardProps) {

  const getLastStreamInfo = () => {
    if (isLive) {
      return "Streaming"
    }

    let lastStreamDate = new Date(lastStream || 0)

    if (lastStreamDate.getTime() === 0) {
      return "No streams yet"
    }
    const nowDate = new Date()

    // if last stream was today, get the hours
    if (lastStreamDate.toDateString() === nowDate.toDateString()) {
      return `${lastStreamDate.getHours()} hours ago`
    }
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    // if last stream was yesterday, display yesterday
    if (lastStreamDate.toDateString() === yesterday.toDateString()) {
      return `yesterday`
    }
    // else display the date
    return `${format(lastStreamDate, "dd/MM/yyyy")}`
  }

  return (
      <>
        <div className={"relative"}>
          <Card className={"mx-auto"}>
            <CardHeader className={"space-y-2"}>
              <div className={"space-y-4 md:flex md:flex-row md:space-x-2.5 md:space-y-0.5"}>
                <Avatar>
                  <AvatarImage src={streamerAvatar} alt={streamer}></AvatarImage>
                  <AvatarFallback>{streamer}</AvatarFallback>
                </Avatar>

                <div className={"flex flex-col mt-0.5 space-y-1 justify-center"}>
                  <div className={"flex flex-row items-center space-x-2.5 gap-x-1"}>
                    <CardTitle className={clsx(cn("2xl:text-sm"), {"md:self-center": description})}>{streamer}</CardTitle>
                  </div>
                  {description && <p className="text-[0.75rem] md:text-sm  text-muted-foreground">{description}</p>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-center gap-1.5 mr-2">
                <Badge variant={"default"}>{platform}</Badge>
                <Badge variant={"secondary"}>{getLastStreamInfo()}</Badge>
              </div>
            </CardContent>
          </Card>
          <Button variant={"ghost"} className={"absolute top-0 end-1 rounded-full p-2"}><SettingsIcon className={"w-4 h-4"}/></Button>
        </div>
      </>
  )
}