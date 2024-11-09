import {useTranslations} from "next-intl";
import React, {useMemo} from "react";
import {PlatformTabContentStrings} from "@/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {useBaseGlobalPlatformTranslations} from "@/app/hooks/translations/base-global-platform-translation";

export const douyinQualityKeys = ['origin', 'uhd', 'hd', 'sd', 'ld', 'md', 'ao'] as const


export type DouyinQuality = {
  quality: string,
  description: string
}

export type DouyinTabString = {
  quality: string,
  qualityDescription: string,
  qualityDefault: string,
  sourceFormat: string,
  sourceFormatPlaceholder: string,
  sourceFormatDescription: string | React.ReactNode,
} & PlatformTabContentStrings

export const useDouyinTranslations = () => {
  const t = useTranslations("Douyin")
  const baseTranslations = useBaseGlobalPlatformTranslations()

  return useMemo<DouyinTabString>(() => ({
    ...baseTranslations,
    platform: t("platform"),
    sourceFormat: t("sourceFormat"),
    sourceFormatPlaceholder: t("sourceFormatPlaceholder"),
    sourceFormatDescription: t.rich("sourceFormatDescription"),
    quality: t("quality"),
    qualityDescription: t("qualityDescription"),
    qualityDefault: t("qualityDefault"),
    cookieDescription: t.rich("cookieDescription"),
  }), [t, baseTranslations])
}

export const useDouyinQualityTranslations = () => {
  const t = useTranslations("DouyinQualities")
  return useMemo(() => douyinQualityKeys.map((key) => ({
    quality: t(`${key}.id`),
    description: t(`${key}.name`)
  })), [t])
}