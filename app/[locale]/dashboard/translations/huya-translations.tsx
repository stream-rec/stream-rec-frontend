import {useTranslations} from "next-intl";
import {useMemo} from "react";

export function useHuyaTranslations() {
  // huya translations
  const t = useTranslations("Huya")
  return useMemo(() => getHuyaTranslations(t), [t])
}

export function getHuyaTranslations(t: any) {
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
    part: t("part"),
    partDescription: t.rich("partDescription"),
    cookieString: t("cookieString"),
    cookieDescription: t.rich("cookieDescription"),
  }
}