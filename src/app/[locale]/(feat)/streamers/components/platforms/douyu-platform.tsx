import React from "react";
import {useFormContext} from "react-hook-form";
import DouyuTabContent from "@/src/app/[locale]/(feat)/settings/platform/tabs/douyu-tab";
import {DouyuQuality, DouyuTabString} from "@/src/app/hooks/translations/douyu-translations";

export type DouyuPlatformFormProps = {
  allowNone?: boolean
  strings: DouyuTabString,
  douyuQualityOptions: DouyuQuality[]
}

export const DouyuPlatformForm = ({allowNone, strings, douyuQualityOptions}: DouyuPlatformFormProps) => {

  const form = useFormContext()

  return <>
    <DouyuTabContent controlPrefix={"downloadConfig"} allowNone={allowNone} control={form.control} strings={strings}
                     qualityOptions={douyuQualityOptions}/>
  </>
}