import {FlagFormField} from "@/app/[locale]/(feat)/settings/components/form/flag-form-field";
import React from "react";


export type KotlinEngineFieldsProps = {
  form: any
  strings: {
    enableFix: string
    enableFixDescription: string | React.ReactNode
  }
}

export function KotlinEngineFields({form, strings}: KotlinEngineFieldsProps) {

  return (
      <>
        <FlagFormField control={form.control} fieldName={"enableFlvFix"} title={strings.enableFix}
                       description={strings.enableFixDescription}
                       ariaLabel={"Flag to enable fix"}/>
      </>
  )
}