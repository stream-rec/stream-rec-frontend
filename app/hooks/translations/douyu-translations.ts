import {useTranslations} from "next-intl";
import {useMemo} from "react";
import {PlatformTabContentStrings} from "@/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {useBaseGlobalPlatformTranslations} from "@/app/hooks/translations/base-global-platform-translation";

const douyuQualityKeys = ['origin', 'uhd_8m', 'uhd', 'hd', 'sd', 'ld'] as const


export type DouyuQuality = {
  quality: string,
  description: string
}


export type DouyuTabString = {
  cdn: string,
  cdnDescription: string,
  cdnDefault: string,
  quality: string,
  qualityDescription: string,
  qualityDefault: string,
} & PlatformTabContentStrings


export const useDouyuTranslations = () => {
  const t = useTranslations("Douyu")
  const baseTranslations = useBaseGlobalPlatformTranslations()

  return useMemo<DouyuTabString>(() => ({
    ...baseTranslations,
    platform: t("platform"),
    cdn: t("cdn"),
    cdnDescription: t("cdnDescription"),
    cdnDefault: t("cdnDefault"),
    quality: t("quality"),
    qualityDescription: t("qualityDescription"),
    qualityDefault: t("qualityDefault"),
    cookieDescription: t.rich("cookieDescription"),
  }), [t, baseTranslations])
}

export const useDouyuQualityTranslations = () => {
  const t = useTranslations("DouyuQualities")
  return useMemo(() => douyuQualityKeys.map((key) => ({
    quality: t(`${key}.id`),
    description: t(`${key}.name`)
  })), [t])
}