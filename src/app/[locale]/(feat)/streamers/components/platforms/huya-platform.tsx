import React from "react";
import {useFormContext} from "react-hook-form";
import {HuyaTabContent} from "@/src/app/[locale]/(feat)/settings/platform/tabs/huya-tab";
import {HuyaTabString} from "@/src/app/hooks/translations/huya-translations";


type HuyaPlatformFormProps = {
  allowNone?: boolean
  strings: HuyaTabString
}

export const HuyaPlatform = (({allowNone, strings}: HuyaPlatformFormProps) => {
  const form = useFormContext()

  return <>
    <HuyaTabContent controlPrefix={"downloadConfig"} control={form.control} strings={strings} allowNone={allowNone}/>
  </>
})