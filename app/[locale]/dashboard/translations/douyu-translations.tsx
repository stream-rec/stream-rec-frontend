import {useTranslations} from "next-intl";
import {useMemo} from "react";

export const douyuQualityKeys = ['origin', 'uhd', 'hd', 'sd', 'ld'] as const


export const useDouyuTranslations = () => {
  const t = useTranslations("Douyu")
  return useMemo(() => ({
    platform: t("platform"),
    cdn: t("cdn"),
    cdnDescription: t("cdnDescription"),
    cdnDefault: t("cdnDefault"),
    quality: t("quality"),
    qualityDescription: t("qualityDescription"),
    qualityDefault: t("qualityDefault"),
    part: t("part"),
    partDescription: t.rich("partDescription"),
    cookies: t("cookieString"),
    cookiesDescription: t.rich("cookiesDescription"),
  }), [t])
}

export const useDouyuQualityTranslations = () => {
  const t = useTranslations("DouyuQualities")
  return useMemo(() => douyuQualityKeys.map((key) => ({
    quality: t(`${key}.id`),
    description: t(`${key}.name`)
  })), [t])
}