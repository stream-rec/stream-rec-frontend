import {useTranslations} from "next-intl";
import React, {useMemo} from "react";
import {PlatformTabContentStrings} from "@/src/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {useBaseGlobalPlatformTranslations} from "@/src/app/hooks/translations/base-global-platform-translation";
import RichText from "@/src/components/i18n/RichText";


export type WeiboTabString = {
  sourceFormat: string,
  sourceFormatPlaceholder: string,
  sourceFormatDescription: string | Readonly<React.ReactNode>
} & PlatformTabContentStrings


export const useWeiboTranslations = () => {
  const t = useTranslations("Weibo")
  const baseTranslations = useBaseGlobalPlatformTranslations()

  return useMemo<WeiboTabString>(() => ({
    ...baseTranslations,
    platform: t("platform"),
    sourceFormat: t("sourceFormat"),
    sourceFormatPlaceholder: t("sourceFormatPlaceholder"),
    sourceFormatDescription: <RichText>{(tags) => t.rich('sourceFormatDescription', tags)}</RichText>,
    cookieDescription: <RichText>{(tags) => t.rich('cookieDescription', tags)}</RichText>,
  } as WeiboTabString), [t, baseTranslations])
}