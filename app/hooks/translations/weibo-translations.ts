import {useTranslations} from "next-intl";
import {useMemo} from "react";
import {PlatformTabContentStrings} from "@/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";


export type WeiboTabString = {
  sourceFormat: string,
  sourceFormatPlaceholder: string,
  sourceFormatDescription: string,
} & PlatformTabContentStrings


export const useWeiboTranslations = () => {
  const t = useTranslations("Weibo")
  const pt = useTranslations("GlobalPlatformConfig")

  return useMemo<WeiboTabString>(() => ({
    platform: t("platform"),
    sourceFormat: t("sourceFormat"),
    sourceFormatPlaceholder: t("sourceFormatPlaceholder"),
    sourceFormatDescription: t.rich("sourceFormatDescription"),
    fetchDelayTitle: pt("fetchDelayTitle"),
    fetchDelayDescription: pt.rich("fetchDelayDescription"),
    partTitle: pt("part"),
    partDescription: pt.rich("partDescription"),
    cookieTitle: pt("cookieTitle"),
    cookieDescription: t.rich("cookieDescription"),
  } as WeiboTabString), [t, pt])
}