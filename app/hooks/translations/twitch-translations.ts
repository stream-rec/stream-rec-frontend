import {useTranslations} from "next-intl";
import {useMemo} from "react";

const qualityKeys = ['origin', '1080p', '720p', '480p', '360p', '160p', 'audio_only'] as const


export const useTwitchTranslations = () => {
  const t = useTranslations("Twitch")
  const pt = useTranslations("GlobalPlatformConfig")
  return useMemo(() => ({
    platform: t("platform"),
    authToken: t("authToken"),
    authTokenDescription: t.rich("authTokenDescription"),
    authTokenPlaceholder: t("authTokenPlaceholder"),
    quality: t("quality"),
    qualityDescription: t("qualityDescription"),
    qualityPlaceholder: t("qualityPlaceholder"),
    fetchDelayTitle: pt("fetchDelayTitle"),
    fetchDelayDescription: pt.rich("fetchDelayDescription"),
    partTitle: pt("part"),
    partDescription: pt.rich("partDescription"),
    cookieTitle: pt("cookieTitle"),
    cookieDescription: t.rich("cookieDescription"),
    skipAds: t("skipAds"),
    skipAdsDescription: t.rich("skipAdsDescription"),
  }), [t, pt])
}

export const useTwitchQualityTranslations = () => {
  const t = useTranslations("TwitchQualities")
  return useMemo(() => qualityKeys.map((key) => ({
    quality: t(`${key}.id`),
    description: t(`${key}.name`)
  })), [t])
}