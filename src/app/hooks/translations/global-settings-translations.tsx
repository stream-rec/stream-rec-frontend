import React, { useMemo } from "react"
import { useTranslations } from "next-intl"
import RichText from "@/src/components/i18n/RichText"
import { EngineTranslations, useEngineTranslations } from "./engine-translations"

export interface GlobalSettingsTranslations {
	alertTitle: string
	alertDescription: string
	submitMessage: string
	submitErrorMessage: string
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
	maxDownloadRetriesDescription: string
	save: string
	engineTranslations: EngineTranslations
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
	const engineTranslations = useEngineTranslations()

	return useMemo<GlobalSettingsTranslations>(
		() => ({
			alertTitle: settingsT("globalSettingsAlert"),
			alertDescription: settingsT("globalSettingsAlertDescription"),
			submitMessage: toast("submitMessage"),
			submitErrorMessage: toast("submitErrorMessage"),
			danmu: t("danmu"),
			danmuDescription: <RichText>{tags => t.rich("danmuDescription", tags)}</RichText>,
			deleteFiles: t("deleteFiles"),
			deleteFilesDescription: <RichText>{tags => t.rich("deleteFilesDescription", tags)}</RichText>,
			outputFolder: t("outputFolder"),
			outputFolderDescription: <RichText>{tags => t.rich("outputFolderDescription", tags)}</RichText>,
			outputFolderPlaceholderDescription: (
				<RichText>{tags => t.rich("outputFolderPlaceholderDescription", tags)}</RichText>
			),
			outputFilename: t("outputFilename"),
			outputFilenameDescription: <RichText>{tags => t.rich("outputFilenameDescription", tags)}</RichText>,
			outputFormat: t("outputFormat"),
			outputFormatDescription: <RichText>{tags => t.rich("outputFormatDescription", tags)}</RichText>,
			minPart: t("minPart"),
			minPartDescription: t("minPartDescription"),
			minPartDefault: t("minPartDefault"),
			maxPart: t("maxPart"),
			maxPartDescription: t("maxPartDescription"),
			maxPartDefault: t("maxPartDefault"),
			maxPartDuration: t("maxPartDuration"),
			maxPartDurationDescription: <RichText>{tags => t.rich("maxPartDurationDescription", tags)}</RichText>,
			maxPartDurationDefault: t("maxPartDurationDefault"),
			maxConcurrentDownload: t("maxConcurrentDownload"),
			maxConcurrentDownloadDescription: <RichText>{tags => t.rich("maxConcurrentDownloadDescription", tags)}</RichText>,
			maxConcurrentUpload: t("maxConcurrentUpload"),
			maxConcurrentUploadDescription: <RichText>{tags => t.rich("maxConcurrentUploadDescription", tags)}</RichText>,
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
			engineTranslations,
		}),
		[t, settingsT, toast, timeUnitsT, engineTranslations]
	)
}
