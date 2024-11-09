import {useTranslations} from "next-intl";
import {PlatformTabContentStrings} from "@/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";


export const useBaseGlobalPlatformTranslations = () => {
  const pt = useTranslations("GlobalPlatformConfig")
  return {
    fetchDelayTitle: pt("fetchDelayTitle"),
    fetchDelayDescription: pt.rich("fetchDelayDescription"),
    partTitle: pt("part"),
    partDescription: pt.rich("partDescription"),
    cookieTitle: pt("cookieTitle"),
    cookieDescription: pt.rich("cookieDescription"),
    downloadIntervalCheckTitle: pt("downloadCheckIntervalTitle"),
    downloadIntervalCheckDescription: pt.rich("downloadCheckIntervalDescription"),
  } as PlatformTabContentStrings
}