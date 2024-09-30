import {useTranslations} from "next-intl";


export type ServerInfoStrings = {
  title: string
  operatingSystem: string
  osName: string
  osVersion: string
  osArch: string
  javaEnvironment: string
  javaVersion: string
  javaVendor: string
  applicationVersion: string
  versionName: string
  versionCode: string
  docker: string
  gitInformation: string
  commitHash: string
  currentVersionNotSupported: string
}

export const useServerInfoTranslations = () => {
  const t = useTranslations("ServerInfoPage")
  return {
    title: t("title"),
    operatingSystem: t("operatingSystem"),
    osName: t("osName"),
    osVersion: t("osVersion"),
    osArch: t("osArch"),
    javaEnvironment: t("javaEnvironment"),
    javaVersion: t("javaVersion"),
    javaVendor: t("javaVendor"),
    applicationVersion: t("applicationVersion"),
    versionName: t("versionName"),
    versionCode: t("versionCode"),
    docker: t("docker"),
    gitInformation: t("gitInformation"),
    commitHash: t("commitHash"),
    currentVersionNotSupported: t("currentVersionNotSupported"),
  } as ServerInfoStrings
}