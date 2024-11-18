import {Label} from "@/src/components/new-york/ui/label";
import {Input} from "@/src/components/new-york/ui/input";
import React from "react";
import {Badge} from "@/src/components/new-york/ui/badge";
import {StreamData} from "@/src/lib/data/streams/definitions";
import {StreamerHoverCard} from "@/src/app/[locale]/(feat)/streamers/components/streamer-hover-card";
import {useFormatter, useTranslations} from "next-intl";

type StreamCardProps = {
  data: StreamData,
  isUploaded: boolean
}

const generateField = (label: string, value: string | number) => {
  return (
      <div className="space-y-1">
        <Label htmlFor={label}>{label}</Label>
        <Input id={label} value={value} readOnly={true}/>
      </div>
  )
}

export function RecordsDetails({data, isUploaded}: StreamCardProps) {

  const t = useTranslations("RecordData")
  const format = useFormatter()

  const dateFormat = (date: number) => {
    return format.dateTime(new Date(date), {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  }

  return (
      <>
        <div className={"space-y-1"}>

          {generateField(t("id"), data.id)}

          {generateField(t("title"), data.title)}
          <StreamerHoverCard streamerId={data.streamerId.toString()} streamerName={data.streamerName}/>

          {generateField(t("dateStart"), dateFormat(data.dateStart))}
          {generateField(t("dateEnd"), dateFormat(data.dateEnd))}
          {generateField(t("filePath"), data.outputFilePath)}
          {generateField(t("danmuFilePath"), data.danmuFilePath?.toString() ?? "No danmu file")}

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