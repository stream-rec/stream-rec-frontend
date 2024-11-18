import {useFormContext} from "react-hook-form";
import React from "react";
import {WeiboTabContent} from "@/src/app/[locale]/(feat)/settings/platform/tabs/weibo-tab";
import {WeiboTabString} from "@/src/app/hooks/translations/weibo-translations";

type WeiboPlatformFormProps = {
  allowNone?: boolean
  strings: WeiboTabString,
}

export const WeiboPlatformForm = ({allowNone, strings}: WeiboPlatformFormProps) => {

  const form = useFormContext()

  return <>
    <WeiboTabContent controlPrefix={"downloadConfig"} control={form.control} strings={strings} allowNone={allowNone}/>
  </>
}