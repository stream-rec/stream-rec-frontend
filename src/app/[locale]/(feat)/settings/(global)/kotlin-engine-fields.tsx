import {FlagFormField} from "@/src/app/[locale]/(feat)/settings/components/form/flag-form-field";
import React from "react";


export type KotlinEngineFieldsProps = {
  form: any
  strings: {
    enableFix: string
    enableFixDescription: string | React.ReactNode
    enableFlvDuplicateTagFilteringTitle: string
    enableFlvDuplicateTagFilteringDescription: string | React.ReactNode
    combineHlsFiles: string
    combineHlsFilesDescription: string | React.ReactNode
  }
}

export function KotlinEngineFields({form, strings}: KotlinEngineFieldsProps) {

  return (
      <>
        <FlagFormField control={form.control} fieldName={"enableFlvFix"} title={strings.enableFix}
                       description={strings.enableFixDescription}
                       ariaLabel={"Flag to enable fix"}/>

        <FlagFormField control={form.control} fieldName={"enableFlvDuplicateTagFiltering"} title={strings.enableFlvDuplicateTagFilteringTitle}
                       description={strings.enableFlvDuplicateTagFilteringDescription}
                       ariaLabel={"Flag to enable duplicate tag filtering"}/>

        <FlagFormField control={form.control} fieldName={"combineTsFiles"} title={strings.combineHlsFiles}
                       description={strings.combineHlsFilesDescription}
                       ariaLabel={"Flag to combine Hls files"}/>
      </>
  )
}