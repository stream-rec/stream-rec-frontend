import React from "react";
import {useFormContext} from "react-hook-form";
import {HuyaTabContent, HuyaTabString} from "@/app/[locale]/(feat)/settings/platform/tabs/huya-tab";


type HuyaPlatformFormProps = {
  allowNone?: boolean
  strings: HuyaTabString
}

export const HuyaPlatform = (({allowNone, strings}: HuyaPlatformFormProps) => {
  const form = useFormContext()

  return <>
    <HuyaTabContent controlPrefix={"downloadConfig"} control={form.control} huyaStrings={strings} allowNone={allowNone}/>
  </>
})