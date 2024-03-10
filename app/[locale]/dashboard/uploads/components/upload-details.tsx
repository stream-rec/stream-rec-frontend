import {Label} from "@/components/new-york/ui/label";
import {Input} from "@/components/new-york/ui/input";
import React from "react";
import {Badge} from "@/components/new-york/ui/badge";
import {UploadData, UploadResult} from "@/lib/data/uploads/definitions";
import {StreamerHoverCard} from "@/app/[locale]/dashboard/streamers/components/streamer-hover-card";
import {getFormatter, getTranslations} from "next-intl/server";


type UploadDetailsProps = {
  data: UploadData,
  results: UploadResult[]
}


export async function UploadDetails({data, results}: UploadDetailsProps) {

  const format = await getFormatter()

  const t = await getTranslations('UploadData')

  const rc = await getTranslations('Rclone')

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

    {generateField(t("uploadTime"), computeDate(new Date(data.uploadTime)))}
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
                            <Badge variant={"secondary"}>{computeDate(new Date(result.time))}</Badge>
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
