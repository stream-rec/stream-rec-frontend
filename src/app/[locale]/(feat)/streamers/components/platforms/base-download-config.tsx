import React from "react";
import {useFormContext} from "react-hook-form";
import {BaseDownloadTab, BaseDownloadTabString} from "@/src/app/[locale]/(feat)/settings/platform/tabs/base-download-tab";


type BaseDownloadConfigFormProps = {
  allowNone?: boolean;
  strings: BaseDownloadTabString
}

export const BaseDownloadConfig = ({allowNone, strings}: BaseDownloadConfigFormProps) => {

  const context = useFormContext()

  return (
      <>
        <BaseDownloadTab control={context.control} strings={strings} allowNone={allowNone}/>
      </>
  )
}