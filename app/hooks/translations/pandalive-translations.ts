import {useTranslations} from "next-intl";
import {useMemo} from "react";

const qualityKeys = ['origin', '1080p', '720p', '480p', '360p', '160p'] as const


export const usePandaliveTranslations = () => {
  const t = useTranslations("Pandalive")
  const pt = useTranslations("GlobalPlatformConfig")
  return useMemo(() => ({
    platform: t("platform"),
    quality: t("quality"),
    qualityDescription: t("qualityDescription"),
    qualityPlaceholder: t("qualityPlaceholder"),
    fetchDelayTitle: pt("fetchDelayTitle"),
    fetchDelayDescription: pt.rich("fetchDelayDescription"),
    partTitle: pt("part"),
    partDescription: pt.rich("partDescription"),
    cookieTitle: pt("cookieTitle"),
    cookieDescription: t.rich("cookieDescription"),
  }), [t, pt])
}

export const usePandaliveQualityTranslations = () => {
  const t = useTranslations("PandaliveQualities")
  return useMemo(() => qualityKeys.map((key) => ({
    quality: t(`${key}.id`),
    description: t(`${key}.name`)
  })), [t])
}