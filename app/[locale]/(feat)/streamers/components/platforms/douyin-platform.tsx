import React from "react";
import {DouyinQuality, DouyinTabContent, DouyinTabString} from "@/app/[locale]/(feat)/settings/platform/tabs/douyin-tab";
import {useFormContext} from "react-hook-form";

export type DouyinPlatformFormProps = {
  allowNone?: boolean
  strings: DouyinTabString,
  douyinQualityOptions: DouyinQuality[]
}

export const DouyinPlatform = ({allowNone, strings, douyinQualityOptions}: DouyinPlatformFormProps) => {

  const form = useFormContext()

  return <>
    <DouyinTabContent controlPrefix={"downloadConfig"} allowNone={allowNone} control={form.control} douyinStrings={strings}
                      qualityOptions={douyinQualityOptions}/>
  </>
}