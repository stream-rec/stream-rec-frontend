import React from "react";
import {DouyinTabContent} from "@/app/[locale]/(feat)/settings/platform/tabs/douyin-tab";
import {useFormContext} from "react-hook-form";
import {DouyinQuality, DouyinTabString} from "@/app/hooks/translations/douyin-translations";

type DouyinPlatformFormProps = {
  allowNone?: boolean
  strings: DouyinTabString,
  douyinQualityOptions: DouyinQuality[]
}

export const DouyinPlatform = ({allowNone, strings, douyinQualityOptions}: DouyinPlatformFormProps) => {

  const form = useFormContext()

  return <>
    <DouyinTabContent controlPrefix={"downloadConfig"} allowNone={allowNone} control={form.control} strings={strings}
                      qualityOptions={douyinQualityOptions}/>
  </>
}