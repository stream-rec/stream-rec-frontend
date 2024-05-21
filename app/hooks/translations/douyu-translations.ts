import {useTranslations} from "next-intl";
import {useMemo} from "react";

const douyuQualityKeys = ['origin', 'uhd_8m', 'uhd', 'hd', 'sd', 'ld'] as const


export const useDouyuTranslations = () => {
  const t = useTranslations("Douyu")
  const pt = useTranslations("GlobalPlatformConfig")

  return useMemo(() => ({
    platform: t("platform"),
    cdn: t("cdn"),
    cdnDescription: t("cdnDescription"),
    cdnDefault: t("cdnDefault"),
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

export const useDouyuQualityTranslations = () => {
  const t = useTranslations("DouyuQualities")
  return useMemo(() => douyuQualityKeys.map((key) => ({
    quality: t(`${key}.id`),
    description: t(`${key}.name`)
  })), [t])
}