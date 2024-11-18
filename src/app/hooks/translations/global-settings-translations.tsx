import React, {useMemo} from "react";
import {useTranslations} from "next-intl";
import RichText from "@/src/components/i18n/RichText";


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
  outputFolderPlaceholderDescription: string | React.ReactNode
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
  enableFlvDuplicateTagFilteringTitle: string,
  enableFlvDuplicateTagFilteringDescription: string | React.ReactNode,
  combineHlsFiles: string,
  combineHlsFilesDescription: string | React.ReactNode,
  save: string,
  timeFormats: {
    seconds: string
    minutes: string
    hours: string
    days: string
  }
}

export const useGlobalSettingsTranslations = () => {
  const settingsT = useTranslations("SettingsPage")
  const toast = useTranslations("Toast")
  const t = useTranslations("GlobalSettings")
  const timeUnitsT = useTranslations("TimeUnit")

  return useMemo<GlobalSettingsTranslations>(() => ({
    alertTitle: settingsT("globalSettingsAlert"),
    alertDescription: settingsT("globalSettingsAlertDescription"),
    submitMessage: toast("submitMessage"),
    submitErrorMessage: toast("submitErrorMessage"),
    engine: t("engine"),
    engineDescription: <RichText>{(tags) => t.rich('engineDescription', tags)}</RichText>,
    danmu: t("danmu"),
    danmuDescription: <RichText>{(tags) => t.rich('danmuDescription', tags)}</RichText>,
    deleteFiles: t("deleteFiles"),
    deleteFilesDescription: <RichText>{(tags) => t.rich('deleteFilesDescription', tags)}</RichText>,
    outputFolder: t("outputFolder"),
    outputFolderDescription: <RichText>{(tags) => t.rich('outputFolderDescription', tags)}</RichText>,
    outputFolderPlaceholderDescription: <RichText>{(tags) => t.rich('outputFolderPlaceholderDescription', tags)}</RichText>,
    outputFilename: t("outputFilename"),
    outputFilenameDescription: <RichText>{(tags) => t.rich('outputFilenameDescription', tags)}</RichText>,
    outputFormat: t("outputFormat"),
    outputFormatDescription: <RichText>{(tags) => t.rich('outputFormatDescription', tags)}</RichText>,
    minPart: t("minPart"),
    minPartDescription: t("minPartDescription"),
    minPartDefault: t("minPartDefault"),
    maxPart: t("maxPart"),
    maxPartDescription: t("maxPartDescription"),
    maxPartDefault: t("maxPartDefault"),
    maxPartDuration: t("maxPartDuration"),
    maxPartDurationDescription: <RichText>{(tags) => t.rich('maxPartDurationDescription', tags)}</RichText>,
    maxPartDurationDefault: t("maxPartDurationDefault"),
    maxConcurrentDownload: t("maxConcurrentDownload"),
    maxConcurrentDownloadDescription: <RichText>{(tags) => t.rich('maxConcurrentDownloadDescription', tags)}</RichText>,
    maxConcurrentUpload: t("maxConcurrentUpload"),
    maxConcurrentUploadDescription: <RichText>{(tags) => t.rich('maxConcurrentUploadDescription', tags)}</RichText>,
    downloadRetryDelay: t("downloadRetryDelay"),
    downloadRetryDelayDescription: t("downloadRetryDelayDescription"),
    downloadCheckInterval: t("downloadCheckInterval"),
    downloadCheckIntervalDescription: t("downloadCheckIntervalDescription"),
    maxDownloadRetries: t("maxDownloadRetries"),
    maxDownloadRetriesDescription: t("maxDownloadRetriesDescription"),
    useBuiltInSegmenter: t("useBuiltInSegmenter"),
    useBuiltInSegmenterDescription: <RichText>{(tags) => t.rich('useBuiltInSegmenterDescription', tags)}</RichText>,
    useBuiltInSegmenterNote: t("useBuiltInSegmenterNote"),
    useBuiltInSegmenterNoteDescription: <RichText>{(tags) => t.rich('useBuiltInSegmenterNoteDescription', tags)}</RichText>,
    exitOnErrorTitle: t("exitOnDownloadError"),
    exitOnErrorDescription: <RichText>{(tags) => t.rich('exitOnDownloadErrorDescription', tags)}</RichText>,
    enableFixFlvTitle: t("enableFixFlvTitle"),
    enableFixFlvDescription: <RichText>{(tags) => t.rich('enableFixFlvDescription', tags)}</RichText>,
    enableFlvDuplicateTagFilteringTitle: t("enableFlvDuplicateTagFilteringTitle"),
    enableFlvDuplicateTagFilteringDescription: <RichText>{(tags) => t.rich('enableFlvDuplicateTagFilteringDescription', tags)}</RichText>,
    combineHlsFiles: t("combineHlsFiles"),
    combineHlsFilesDescription: <RichText>{(tags) => t.rich('combineHlsFilesDescription', tags)}</RichText>,
    save: settingsT("save"),
    timeFormats: {
      hours: timeUnitsT("hours"),
      minutes: timeUnitsT("minutes"),
      seconds: timeUnitsT("seconds"),
      days: timeUnitsT("days"),
    },
  }), [t, settingsT, toast, timeUnitsT])
}