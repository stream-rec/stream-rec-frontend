import {useFormContext} from "react-hook-form";
import React from "react";
import {PandaTvTabContent} from "@/app/[locale]/(feat)/settings/platform/tabs/pandatv-tab";
import {PandaTvQualityItem, PandaTvTabString} from "@/app/hooks/translations/pandatv-translations";


type PandaTvPlatformFormProps = {
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