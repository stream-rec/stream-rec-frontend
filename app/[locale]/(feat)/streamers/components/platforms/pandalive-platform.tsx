import {useFormContext} from "react-hook-form";
import React from "react";
import {PandaliveQualityItem, PandaliveTabContent, PandaliveTabString} from "@/app/[locale]/(feat)/settings/platform/tabs/pandalive-tab";


export type PandalivePlatformFormProps = {
  allowNone?: boolean
  strings: PandaliveTabString,
  qualities: PandaliveQualityItem[]
}

export const PandalivePlatformForm = ({allowNone, strings, qualities}: PandalivePlatformFormProps) => {

  const form = useFormContext()

  return <>
    <PandaliveTabContent controlPrefix={"downloadConfig"} control={form.control} strings={strings} qualityOptions={qualities} allowNone={allowNone}/>
  </>
}