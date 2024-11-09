import {useTranslations} from "next-intl";
import {useMemo} from "react";
import {PlatformTabContentStrings} from "@/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {useBaseGlobalPlatformTranslations} from "@/app/hooks/translations/base-global-platform-translation";


export type HuyaTabString = {
  cdn: string,
  cdnDescription: string,
  cdnDefault: string,
  sourceFormat: string,
  sourceFormatPlaceholder: string,
  sourceFormatDescription: string,
  bitrate: string,
  bitrateDescription: string,
  forceOrigin: string,
  forceOriginDescription: string,
  mobileApi: string,
  mobileApiDescription: string,
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
    sourceFormatDescription: t.rich("sourceFormatDescription"),
    bitrate: t("bitrate"),
    bitrateDescription: t("bitrateDescription"),
    cookieDescription: t.rich("cookieDescription"),
    forceOrigin: t("forceOrigin"),
    forceOriginDescription: t.rich("forceOriginDescription"),
    mobileApi: t("mobileApi"),
    mobileApiDescription: t.rich("mobileApiDescription"),
  }
}