import {useTranslations} from "next-intl";
import React, {useMemo} from "react";
import {PlatformTabContentStrings} from "@/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {useBaseGlobalPlatformTranslations} from "@/app/hooks/translations/base-global-platform-translation";

const qualityKeys = ['origin', '1080p', '720p', '480p', '360p', '160p', 'audio_only'] as const


export type TwitchQualityItem = {
  quality: string,
  description: string
}


export type TwitchTabString = {
  quality: string,
  qualityPlaceholder: string,
  qualityDescription: string,
  authToken: string,
  authTokenPlaceholder: string,
  authTokenDescription: string | React.ReactNode,
  skipAds: string,
  skipAdsDescription: string | React.ReactNode,
  ttvProxyPlaylist: string,
  ttvProxyPlaylistDescription: string,
  ttvProxyPlaylistExclude: string,
  ttvProxyPlaylistExcludeDescription: string,
  ttvProxyPlaylistFallback: string,
  ttvProxyPlaylistFallbackDescription: string
} & PlatformTabContentStrings


export const useTwitchTranslations = () => {
  const t = useTranslations("Twitch")
  const baseTranslations = useBaseGlobalPlatformTranslations()

  return useMemo<TwitchTabString>(() => ({
    ...baseTranslations,
    platform: t("platform"),
    authToken: t("authToken"),
    authTokenDescription: t.rich("authTokenDescription"),
    authTokenPlaceholder: t("authTokenPlaceholder"),
    quality: t("quality"),
    qualityDescription: t("qualityDescription"),
    qualityPlaceholder: t("qualityPlaceholder"),
    cookieDescription: t.rich("cookieDescription"),
    skipAds: t("skipAds"),
    skipAdsDescription: t.rich("skipAdsDescription"),
    ttvProxyPlaylist: t("ttvProxyPlaylist"),
    ttvProxyPlaylistDescription: t("ttvProxyPlaylistDescription"),
    ttvProxyPlaylistExclude: t("ttvProxyPlaylistExclude"),
    ttvProxyPlaylistExcludeDescription: t("ttvProxyPlaylistExcludeDescription"),
    ttvProxyPlaylistFallback: t("ttvProxyPlaylistFallback"),
    ttvProxyPlaylistFallbackDescription: t("ttvProxyPlaylistFallbackDescription"),
  }), [baseTranslations, t])
}

export const useTwitchQualityTranslations = () => {
  const t = useTranslations("TwitchQualities")
  return useMemo(() => qualityKeys.map((key) => ({
    quality: t(`${key}.id`),
    description: t(`${key}.name`)
  })), [t])
}