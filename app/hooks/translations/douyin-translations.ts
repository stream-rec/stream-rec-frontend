import {useTranslations} from "next-intl";
import {useMemo} from "react";

export const douyinQualityKeys = ['origin', 'uhd', 'hd', 'sd', 'ld', 'md', 'ao'] as const


export const useDouyinTranslations = () => {
  const t = useTranslations("Douyin")
  const pt = useTranslations("GlobalPlatformConfig")

  return useMemo(() => ({
    platform: t("platform"),
    sourceFormat: t("sourceFormat"),
    sourceFormatPlaceholder: t("sourceFormatPlaceholder"),
    sourceFormatDescription: t.rich("sourceFormatDescription"),
    quality: t("quality"),
    qualityDescription: t("qualityDescription"),
    qualityDefault: t("qualityDefault"),
    fetchDelayTitle: pt("fetchDelayTitle"),
    fetchDelayDescription: pt.rich("fetchDelayDescription"),
    partTitle: pt("part"),
    partDescription: pt.rich("partDescription"),
    cookieTitle: pt("cookieTitle"),
    cookieDescription: t.rich("cookieDescription"),
  }), [t, pt])
}

export const useDouyinQualityTranslations = () => {
  const t = useTranslations("DouyinQualities")
  return useMemo(() => douyinQualityKeys.map((key) => ({
    quality: t(`${key}.id`),
    description: t(`${key}.name`)
  })), [t])
}