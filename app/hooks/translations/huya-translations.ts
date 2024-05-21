import {useTranslations} from "next-intl";
import {useMemo} from "react";

export function useHuyaTranslations() {
  // huya translations
  const t = useTranslations("Huya")
  const pT = useTranslations("GlobalPlatformConfig")
  return useMemo(() => getHuyaTranslations(t, pT), [t, pT])
}

export function getHuyaTranslations(t: any, pt: any) {
  return {
    platform: t("platform"),
    cdn: t("cdn"),
    cdnDescription: t("cdnDescription"),
    cdnDefault: t("cdnDefault"),
    sourceFormat: t("sourceFormat"),
    sourceFormatPlaceholder: t("sourceFormatPlaceholder"),
    sourceFormatDescription: t.rich("sourceFormatDescription"),
    bitrate: t("bitrate"),
    bitrateDescription: t("bitrateDescription"),
    fetchDelayTitle: pt("fetchDelayTitle"),
    fetchDelayDescription: pt.rich("fetchDelayDescription"),
    partTitle: pt("part"),
    partDescription: pt.rich("partDescription"),
    cookieTitle: pt("cookieTitle"),
    cookieDescription: t.rich("cookieDescription"),
  }
}