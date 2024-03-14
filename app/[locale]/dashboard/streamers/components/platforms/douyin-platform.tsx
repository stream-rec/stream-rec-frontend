import React from "react";
import {DouyinQuality, DouyinTabContent, DouyinTabString} from "@/app/[locale]/dashboard/settings/platform/tabs/douyin-tab";
import {useFormContext} from "react-hook-form";

export type DouyinPlatformFormProps = {
  strings: DouyinTabString,
  douyinQualityOptions: DouyinQuality[]
}

export const DouyinPlatform = ({strings, douyinQualityOptions}: DouyinPlatformFormProps) => {

  const form = useFormContext()

  return <>
    <DouyinTabContent controlPrefix={"downloadConfig"} control={form.control} douyinStrings={strings} qualityOptions={douyinQualityOptions}/>
  </>
}