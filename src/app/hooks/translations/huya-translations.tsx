import {useTranslations} from "next-intl";
import React, {useMemo} from "react";
import {PlatformTabContentStrings} from "@/src/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {useBaseGlobalPlatformTranslations} from "@/src/app/hooks/translations/base-global-platform-translation";
import RichText from "@/src/components/i18n/RichText";


export type HuyaTabString = {
  cdn: string,
  cdnDescription: string,
  cdnDefault: string,
  sourceFormat: string,
  sourceFormatPlaceholder: string,
  sourceFormatDescription: string | Readonly<React.ReactNode>
  bitrate: string,
  bitrateDescription: string,
  forceOrigin: string,
  forceOriginDescription: string | Readonly<React.ReactNode>,
  mobileApi: string,
  mobileApiDescription: string | Readonly<React.ReactNode>,
} & PlatformTabContentStrings

export function useHuyaTranslations() {
  // huya translations
  const t = useTranslations("Huya")
  const baseTranslations = useBaseGlobalPlatformTranslations()
  return useMemo<HuyaTabString>(() => getHuyaTranslations(t, baseTranslations), [t, baseTranslations])
}

function getHuyaTranslations(t: any, baseTranslations: PlatformTabContentStrings): HuyaTabString {
  return {
    ...baseTranslations,
    platform: t("platform"),
    cdn: t("cdn"),
    cdnDescription: t("cdnDescription"),
    cdnDefault: t("cdnDefault"),
    sourceFormat: t("sourceFormat"),
    sourceFormatPlaceholder: t("sourceFormatPlaceholder"),
    sourceFormatDescription: <RichText>{(tags) => t.rich('sourceFormatDescription', tags)}</RichText>,
    bitrate: t("bitrate"),
    bitrateDescription: t("bitrateDescription"),
    cookieDescription: <RichText>{(tags) => t.rich('cookieDescription', tags)}</RichText>,
    forceOrigin: t("forceOrigin"),
    forceOriginDescription: <RichText>{(tags) => t.rich('forceOriginDescription', tags)}</RichText>,
    mobileApi: t("mobileApi"),
    mobileApiDescription: <RichText>{(tags) => t.rich('mobileApiDescription', tags)}</RichText>,
  }
}