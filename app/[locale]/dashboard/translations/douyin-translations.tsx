import {useTranslations} from "next-intl";
import {useMemo} from "react";

export const douyinQualityKeys = ['origin', 'uhd', 'hd', 'sd', 'ld', 'md', 'ao'] as const


export const useDouyinTranslations = () => {
  const t = useTranslations("Douyin")
  return useMemo(() => ({
    platform: t("platform"),
    quality: t("quality"),
    qualityDescription: t("qualityDescription"),
    qualityDefault: t("qualityDefault"),
    part: t("part"),
    partDescription: t.rich("partDescription"),
    cookies: t("cookieString"),
    cookiesDescription: t.rich("cookiesDescription"),
  }), [t])
}

export const useDouyinQualityTranslations = () => {
  const t = useTranslations("DouyinQualities")
  return useMemo(() => douyinQualityKeys.map((key) => ({
    quality: t(`${key}.id`),
    description: t(`${key}.name`)
  })), [t])
}