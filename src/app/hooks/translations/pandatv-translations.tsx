import {useTranslations} from "next-intl";
import {useMemo} from "react";
import {PlatformTabContentStrings} from "@/src/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {useBaseGlobalPlatformTranslations} from "@/src/app/hooks/translations/base-global-platform-translation";

const qualityKeys = ['origin', '1080p', '720p', '480p', '360p', '160p'] as const


export type PandaTvQualityItem = {
  quality: string,
  description: string
}

export type PandaTvTabString = {
  quality: string,
  qualityPlaceholder: string,
  qualityDescription: string,
} & PlatformTabContentStrings


export const usePandaTvTranslations = () => {
  const t = useTranslations("PandaTv")
  const baseTranslations = useBaseGlobalPlatformTranslations()
  return useMemo<PandaTvTabString>(() => ({
    ...baseTranslations,
    platform: t("platform"),
    quality: t("quality"),
    qualityDescription: t("qualityDescription"),
    qualityPlaceholder: t("qualityPlaceholder"),
  }), [t, baseTranslations])
}

export const usePandaTvQualityTranslations = () => {
  const t = useTranslations("PandaTvQualities")
  return useMemo(() => qualityKeys.map((key) => ({
    quality: t(`${key}.id`),
    description: t(`${key}.name`)
  })), [t])
}