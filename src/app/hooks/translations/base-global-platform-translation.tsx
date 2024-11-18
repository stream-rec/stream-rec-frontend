import {useTranslations} from "next-intl";
import {PlatformTabContentStrings} from "@/src/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import RichText from "@/src/components/i18n/RichText";


export const useBaseGlobalPlatformTranslations = () => {
  const t = useTranslations("GlobalPlatformConfig")
  return {
    fetchDelayTitle: t("fetchDelayTitle"),
    fetchDelayDescription: <RichText>{(tags) => t.rich('fetchDelayDescription', tags)}</RichText>,
    partTitle: t("part"),
    partDescription: <RichText>{(tags) => t.rich('partDescription', tags)}</RichText>,
    cookieTitle: t("cookieTitle"),
    cookieDescription: <RichText>{(tags) => t.rich('cookieDescription', tags)}</RichText>,
    downloadIntervalCheckTitle: t("downloadCheckIntervalTitle"),
    downloadIntervalCheckDescription: <RichText>{(tags) => t.rich('downloadCheckIntervalDescription', tags)}</RichText>,
  } as PlatformTabContentStrings
}