import {Label} from "@/src/components/new-york/ui/label";
import {Input} from "@/src/components/new-york/ui/input";
import React from "react";
import {Badge} from "@/src/components/new-york/ui/badge";
import {UploadData, UploadResult} from "@/src/lib/data/uploads/definitions";
import {StreamerHoverCard} from "@/src/app/[locale]/(feat)/streamers/components/streamer-hover-card";
import {useFormatter, useTranslations} from "next-intl";


type UploadDetailsProps = {
  data: UploadData,
  results: UploadResult[]
}


export function UploadDetails({data, results}: UploadDetailsProps) {

  const format = useFormatter()

  const t = useTranslations('UploadData')

  const rc = useTranslations('Rclone')

  function computeDate(date: Date) {
    return format.dateTime(date, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  }

  const generateField = (label: string, value: string | number) => {
    return (
        <div className="space-y-1">
          <Label htmlFor={label}>{label}</Label>
          <Input id={label} value={value} readOnly={true}/>
        </div>
    )
  }

  return <div className={"space-y-1"}>

    {generateField(t("id"), data.id)}

    {generateField(t("streamTitle"), data.streamTitle)}
    <StreamerHoverCard streamerId={data.streamerId.toString()} streamerName={data.streamer}/>

    {generateField(t("filePath"), data.filePath)}

    {generateField(t("uploadPlatform"), data.uploadPlatform)}
    {data.uploadConfig.platform === "RCLONE" && (
        <>
          {generateField(rc('operation'), data.uploadConfig.rcloneOperation)}
          {generateField(rc('remote'), data.uploadConfig.remotePath)}
          {generateField(rc('args'), data.uploadConfig.args.join(" "))}
        </>
    )}

    {
        results.length > 0 && (
            <div className={"space-y-3"}>
              <h3 className={"text-sm font-medium"}>{t("uploadResults")}</h3>
              <div className={"space-y-3"}>
                {results.map((result) => {
                  return (
                      <div key={result.id} className={"flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"}>
                        <div className="space-y-0.5">
                          <h3 className={"text-sm font-medium"}>{`#${result.id}`}</h3>
                          <p className={"text-muted-foreground"}>
                            {result.message}
                          </p>
                          <div className={"flex flex-row items-center gap-2"}>
                            <Badge variant={result.isSuccess ? "secondary" : "destructive"}> {result.isSuccess ? t("success") : t("failed")}</Badge>
                            {result.startTime != 0 && (<Badge variant={"secondary"}>{computeDate(new Date(result.startTime * 1000))}</Badge>)}
                            {result.endTime != 0 && (<Badge variant={"secondary"}>{computeDate(new Date(result.endTime * 1000))}</Badge>)}
                          </div>
                        </div>
                      </div>
                  )
                })}
              </div>
            </div>
        )
    }
  </div>
}
