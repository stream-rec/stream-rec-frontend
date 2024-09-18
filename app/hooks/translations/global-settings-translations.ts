import React, {useMemo} from "react";
import {useTranslations} from "next-intl";

export const useGlobalSettingsTranslations = () => {
  const settingsT = useTranslations("SettingsPage")
  const toast = useTranslations("Toast")
  const t = useTranslations("GlobalSettings")
  const timeUnitsT = useTranslations("TimeUnit")

  return useMemo(() => ({
    alertTitle: settingsT("globalSettingsAlert"),
    alertDescription: settingsT("globalSettingsAlertDescription"),
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
    useBuiltInSegmenter: t("useBuiltInSegmenter"),
    useBuiltInSegmenterDescription: t.rich("useBuiltInSegmenterDescription"),
    useBuiltInSegmenterNote: t("useBuiltInSegmenterNote"),
    useBuiltInSegmenterNoteDescription: t.rich("useBuiltInSegmenterNoteDescription"),
    exitOnErrorTitle: t("exitOnDownloadError"),
    exitOnErrorDescription: t.rich("exitOnDownloadErrorDescription"),
    enableFixFlvTitle: t("enableFixFlvTitle"),
    enableFixFlvDescription: t.rich("enableFixFlvDescription"),
    save: settingsT("save"),
    timeFormats: {
      hours: timeUnitsT("hours"),
      minutes: timeUnitsT("minutes"),
      seconds: timeUnitsT("seconds"),
      days: timeUnitsT("days"),
    },
  } as GlobalSettingsTranslations), [t, settingsT, toast, timeUnitsT])
}


export interface GlobalSettingsTranslations {
  alertTitle: string
  alertDescription: string
  submitMessage: string
  submitErrorMessage: string
  engine: string
  engineDescription: string | React.ReactNode
  danmu: string
  danmuDescription: string | React.ReactNode
  deleteFiles: string
  deleteFilesDescription: any
  outputFolder: string
  outputFolderDescription: string | React.ReactNode
  outputFilename: string
  outputFilenameDescription: string | React.ReactNode
  outputFormat: string
  outputFormatDescription: string | React.ReactNode
  minPart: string
  minPartDescription: string
  minPartDefault: string
  maxPart: string
  maxPartDefault: string
  maxPartDescription: string
  maxPartDuration: string
  maxPartDurationDefault: string
  maxPartDurationDescription: string | React.ReactNode
  maxConcurrentDownload: string
  maxConcurrentDownloadDescription: string | React.ReactNode
  maxConcurrentUpload: string
  maxConcurrentUploadDescription: string | React.ReactNode
  downloadRetryDelay: string
  downloadRetryDelayDescription: string
  downloadCheckInterval: string
  downloadCheckIntervalDescription: string
  maxDownloadRetries: string
  maxDownloadRetriesDescription: string,
  useBuiltInSegmenter: string,
  useBuiltInSegmenterDescription: string | React.ReactNode,
  useBuiltInSegmenterNote: string,
  useBuiltInSegmenterNoteDescription: string | React.ReactNode,
  exitOnErrorTitle: string,
  exitOnErrorDescription: string | React.ReactNode,
  enableFixFlvTitle: string,
  enableFixFlvDescription: string | React.ReactNode,
  save: string,
  timeFormats: {
    seconds: string
    minutes: string
    hours: string
    days: string
  }
}