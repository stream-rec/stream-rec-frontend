import {Label} from "@/components/new-york/ui/label";
import {Input} from "@/components/new-york/ui/input";
import {format} from "date-fns";
import React from "react";
import {StreamerHoverCard} from "@/app/dashboard/streamers/components/streamer-hover-card";
import {Badge} from "@/components/new-york/ui/badge";
import {StreamData} from "@/app/lib/data/streams/definitions";

type StreamCardProps = {
  data: StreamData,
  isUploaded: boolean
}

export function RecordsDetails({data, isUploaded}: StreamCardProps) {


  const generateField = (label: string, value: string | number) => {
    return (
        <div className="space-y-1">
          <Label htmlFor={label}>{label}</Label>
          <Input id={label} value={value} readOnly={true}/>
        </div>
    )
  }

  return (
      <>
        <div className={"space-y-1"}>

          {generateField("id", data.id)}

          {generateField("Title", data.title)}
          <StreamerHoverCard streamerId={data.streamerId.toString()} streamerName={data.streamerName}/>

          {generateField("Date start", format(new Date(data.dateStart), "LLL dd, y, h:mm a"))}
          {generateField("Date end", format(new Date(data.dateEnd), "LLL dd, y, h:mm a"))}
          {generateField("Stream file path", data.outputFilePath)}
          {generateField("Danmu file path", data.danmuFilePath?.toString() ?? "No danmu file")}

          <div className={"space-y-3 flex-col flex"}>
            <div className={"h-8"}>
              {isUploaded && (<Badge>Uploaded</Badge>)}
              {!isUploaded && (<Badge variant={"destructive"}>No updated</Badge>)}
            </div>
          </div>
        </div>
      </>
  )
}