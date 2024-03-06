import {Label} from "@/components/new-york/ui/label";
import {Input} from "@/components/new-york/ui/input";
import {format} from "date-fns";
import React from "react";
import {StreamerHoverCard} from "@/app/dashboard/streamers/components/streamer-hover-card";
import {Badge} from "@/components/new-york/ui/badge";
import {UploadData, UploadResult} from "@/app/lib/data/uploads/definitions";

type UploadDetailsProps = {
  data: UploadData,
  results: UploadResult[]
}

export function UploadDetails({data, results}: UploadDetailsProps) {

  const generateField = (label: string, value: string | number) => {
    return (
        <div className="space-y-1">
          <Label htmlFor={label}>{label}</Label>
          <Input id={label} value={value} readOnly={true}/>
        </div>
    )
  }

  return <div className={"space-y-1"}>

    {generateField("Id", data.id)}

    {generateField("Stream title", data.streamTitle)}
    <StreamerHoverCard streamerId={data.streamerId.toString()} streamerName={data.streamer}/>

    {generateField("Date start", format(new Date(data.streamStartTime), "LLL dd, y, h:mm a"))}
    {generateField("Upload file path", data.filePath)}

    {generateField("Upload platform", data.uploadPlatform)}
    {data.uploadConfig.platform === "RCLONE" && (
        <>
          {generateField("Rclone operation", data.uploadConfig.rcloneOperation)}
          {generateField("Rclone remote path", data.uploadConfig.remotePath)}
          {generateField("Rclone args", data.uploadConfig.args.join(" "))}
        </>
    )}

    {
        results.length > 0 && (
            <div className={"space-y-3"}>
              <h3 className={"text-sm font-medium"}> Upload results</h3>
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
                            <Badge variant={result.isSuccess ? "secondary" : "destructive"}> {result.isSuccess ? "Success" : "Failed"}</Badge>
                            <Badge variant={"secondary"}>{format(result.time * 1000, "LLL dd, y, h:mm:ss a")}</Badge>
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
