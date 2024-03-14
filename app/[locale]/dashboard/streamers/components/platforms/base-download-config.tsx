import React from "react";
import {useFormContext} from "react-hook-form";
import {BaseDownloadTab, BaseDownloadTabString} from "@/app/[locale]/dashboard/settings/platform/tabs/base-download-tab";


type BaseDownloadConfigFormProps = {
  strings: BaseDownloadTabString
}

export const BaseDownloadConfig = ({strings}: BaseDownloadConfigFormProps) => {

  const context = useFormContext()

  return (
      <>
        <BaseDownloadTab control={context.control} strings={strings}/>
      </>
  )
}