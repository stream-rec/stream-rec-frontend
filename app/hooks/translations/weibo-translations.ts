import {useTranslations} from "next-intl";
import {useMemo} from "react";
import {PlatformTabContentStrings} from "@/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {useBaseGlobalPlatformTranslations} from "@/app/hooks/translations/base-global-platform-translation";


export type WeiboTabString = {
  sourceFormat: string,
  sourceFormatPlaceholder: string,
  sourceFormatDescription: string,
} & PlatformTabContentStrings


export const useWeiboTranslations = () => {
  const t = useTranslations("Weibo")
  const baseTranslations = useBaseGlobalPlatformTranslations()

  return useMemo<WeiboTabString>(() => ({
    ...baseTranslations,
    platform: t("platform"),
    sourceFormat: t("sourceFormat"),
    sourceFormatPlaceholder: t("sourceFormatPlaceholder"),
    sourceFormatDescription: t.rich("sourceFormatDescription"),
    cookieDescription: t.rich("cookieDescription"),
  } as WeiboTabString), [t, baseTranslations])
}