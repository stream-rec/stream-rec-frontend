import {GlobalForm} from "@/app/[locale]/dashboard/settings/(global)/global-form";
import {GlobalConfig} from "@/lib/data/config/definitions";
import React, {useMemo} from "react";
import {updateConfig} from "@/lib/data/config/apis";
import {useTranslations} from "next-intl";

type GlobalFormWrapperProps = {
  appConfigPromise: Promise<GlobalConfig>
}

export default function GlobalFormWrapper({appConfigPromise}: GlobalFormWrapperProps) {

  const appConfig = React.use(appConfigPromise)

  const t = useTranslations("GlobalSettings")
  const settingsT = useTranslations("SettingsPage")

  const toast = useTranslations("Toast")
  const timeUnitsT = useTranslations("TimeUnit")

  const translations = useMemo(() => ({
    submitMessage: toast("submitMessage"),
    submitErrorMessage: toast("submitErrorMessage"),
    engine: t("engine"),
    engineDescription: t.rich("engineDescription"),
    danmu: t("danmu"),
    danmuDescription: t.rich("danmuDescription"),
    deleteFiles: t("deleteFiles"),
    deleteFilesDescription: t.rich("deleteFilesDescription"),
    outputFolder: t("outputFolder"),
    outputFolderDescription: t.rich("outputFolderDescription"),
    outputFilename: t("outputFilename"),
    outputFilenameDescription: t.rich("outputFilenameDescription"),
    outputFormat: t("outputFormat"),
    outputFormatDescription: t.rich("outputFormatDescription"),
    minPart: t("minPart"),
    minPartDescription: t("minPartDescription"),
    minPartDefault: t("minPartDefault"),
    maxPart: t("maxPart"),
    maxPartDescription: t("maxPartDescription"),
    maxPartDefault: t("maxPartDefault"),
    maxPartDuration: t("maxPartDuration"),
    maxPartDurationDescription: t.rich("maxPartDurationDescription"),
    maxPartDurationDefault: t("maxPartDurationDefault"),
    maxConcurrentDownload: t("maxConcurrentDownload"),
    maxConcurrentDownloadDescription: t.rich("maxConcurrentDownloadDescription"),
    maxConcurrentUpload: t("maxConcurrentUpload"),
    maxConcurrentUploadDescription: t.rich("maxConcurrentUploadDescription"),
    downloadRetryDelay: t("downloadRetryDelay"),
    downloadRetryDelayDescription: t("downloadRetryDelayDescription"),
    downloadCheckInterval: t("downloadCheckInterval"),
    downloadCheckIntervalDescription: t("downloadCheckIntervalDescription"),
    maxDownloadRetries: t("maxDownloadRetries"),
    maxDownloadRetriesDescription: t("maxDownloadRetriesDescription"),
    save: settingsT("save"),
    timeFormats: {
      hours: timeUnitsT("hours"),
      minutes: timeUnitsT("minutes"),
      seconds: timeUnitsT("seconds"),
      days: timeUnitsT("days"),
    },
  }), [t, settingsT, toast, timeUnitsT])

  return (
      <>
        <GlobalForm appConfig={appConfig} update={updateConfig} globalStrings={translations}/>
      </>
  )

}