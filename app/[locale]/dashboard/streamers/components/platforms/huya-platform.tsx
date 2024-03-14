import React from "react";
import {useFormContext} from "react-hook-form";
import {HuyaTabContent, HuyaTabString} from "@/app/[locale]/dashboard/settings/platform/tabs/huya-tab";


type HuyaPlatformFormProps = {
  strings: HuyaTabString
}

export const HuyaPlatform = (({strings}: HuyaPlatformFormProps) => {
  const form = useFormContext()

  return <>
    <HuyaTabContent controlPrefix={"downloadConfig"} control={form.control} huyaStrings={strings}/>
  </>
})