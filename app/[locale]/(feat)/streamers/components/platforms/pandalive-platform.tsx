import {useFormContext} from "react-hook-form";
import React from "react";
import {PandaTvQualityItem, PandaTvTabContent, PandaTvTabString} from "@/app/[locale]/(feat)/settings/platform/tabs/pandatv-tab";


export type PandaTvPlatformFormProps = {
  allowNone?: boolean
  strings: PandaTvTabString,
  qualities: PandaTvQualityItem[]
}

export const PandaTvPlatformForm = ({allowNone, strings, qualities}: PandaTvPlatformFormProps) => {

  const form = useFormContext()

  return <>
    <PandaTvTabContent controlPrefix={"downloadConfig"} control={form.control} strings={strings} qualityOptions={qualities} allowNone={allowNone}/>
  </>
}