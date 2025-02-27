import React from "react"
import { useTranslations } from "next-intl"
import RichText from "@/src/components/i18n/RichText"

export type EngineTranslations = {
	engine: string
	engineDescription: string | React.ReactNode
	selectEnginePrompt?: string

	ffmpeg: {
		useBuiltInSegmenter: string
		useBuiltInSegmenterDescription: string | React.ReactNode
		useBuiltInSegmenterNote: string
		useBuiltInSegmenterNoteDescription: string | React.ReactNode
		exitOnErrorTitle: string
		exitOnErrorDescription: string | React.ReactNode
	}

	kotlin: {
		enableFixFlvTitle: string
		enableFixFlvDescription: string | React.ReactNode
		enableFlvDuplicateTagFilteringTitle: string
		enableFlvDuplicateTagFilteringDescription: string | React.ReactNode
		combineHlsFiles: string
		combineHlsFilesDescription: string | React.ReactNode
	}
}

export const useEngineTranslations = () => {
	const t = useTranslations("GlobalSettings")

	return {
		engine: t("engine"),
		engineDescription: <RichText>{tags => t.rich("engineDescription", tags)}</RichText>,

		kotlin: {
			enableFixFlvTitle: t("enableFixFlvTitle"),
			enableFixFlvDescription: <RichText>{tags => t.rich("enableFixFlvDescription", tags)}</RichText>,
			enableFlvDuplicateTagFilteringTitle: t("enableFlvDuplicateTagFilteringTitle"),
			enableFlvDuplicateTagFilteringDescription: (
				<RichText>{tags => t.rich("enableFlvDuplicateTagFilteringDescription", tags)}</RichText>
			),
			combineHlsFiles: t("combineHlsFiles"),
			combineHlsFilesDescription: <RichText>{tags => t.rich("combineHlsFilesDescription", tags)}</RichText>,
		},
		ffmpeg: {
			useBuiltInSegmenter: t("useBuiltInSegmenter"),
			useBuiltInSegmenterDescription: <RichText>{tags => t.rich("useBuiltInSegmenterDescription", tags)}</RichText>,
			useBuiltInSegmenterNote: t("useBuiltInSegmenterNote"),
			useBuiltInSegmenterNoteDescription: (
				<RichText>{tags => t.rich("useBuiltInSegmenterNoteDescription", tags)}</RichText>
			),
			exitOnErrorTitle: t("exitOnDownloadError"),
			exitOnErrorDescription: <RichText>{tags => t.rich("exitOnDownloadErrorDescription", tags)}</RichText>,
		},
	}
}
