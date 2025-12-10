import { useTranslations } from "next-intl"
import React from "react"
import RichText from "../../../../../components/i18n/RichText"
import { useDouyinQualityTranslations, useDouyinTranslations } from "../../../../hooks/translations/douyin-translations"
import { useDouyuQualityTranslations, useDouyuTranslations } from "../../../../hooks/translations/douyu-translations"
import { useTwitchQualityTranslations, useTwitchTranslations } from "../../../../hooks/translations/twitch-translations"
import { usePandaTvQualityTranslations, usePandaTvTranslations } from "../../../../hooks/translations/pandatv-translations"
import { useEngineTranslations } from "../../../../hooks/translations/engine-translations"
import { useHuyaTranslations } from "../../../../hooks/translations/huya-translations"
import { useWeiboTranslations } from "../../../../hooks/translations/weibo-translations"

export const useStreamerFormTranslations = () => {
	const t = useTranslations("streamer.form")
	const tToast = useTranslations("Toast")
	const tData = useTranslations("StreamerData")
	const baseT = useTranslations("BaseDownloadConfigs")
	const actionsT = useTranslations("CallbacksConfigs")
	const rcloneT = useTranslations("Rclone")
	const commandT = useTranslations("Command")
	const removeT = useTranslations("RemoveAction")
	const moveT = useTranslations("MoveAction")
	const copyT = useTranslations("CopyAction")

	// platform translations
	const huyaT = useHuyaTranslations()
	const douyinT = useDouyinTranslations()
	const douyinQualityOptions = useDouyinQualityTranslations()
	const douyuT = useDouyuTranslations()
	const douyuQualityOptions = useDouyuQualityTranslations()
	const twitchT = useTwitchTranslations()
	const twitchQualityOptions = useTwitchQualityTranslations()
	const pandaT = usePandaTvTranslations()
	const pandaQualityOptions = usePandaTvQualityTranslations()
	const weiboT = useWeiboTranslations()

	const engineTranslations = useEngineTranslations()

	const baseDownloadStrings = {
		danmu: baseT("danmu"),
		danmuDescription: baseT("danmuDescription"),
		cookies: baseT("cookieString"),
		cookiesDescription: baseT("cookiesDescription"),
		maxBitrate: baseT("maxBitrate"),
		maxBitrateDescription: baseT("maxBitrateDescription"),
		outputFolder: baseT("outputFolder"),
		outputFolderDescription: <RichText>{(tags) => baseT.rich("outputFolderDescription", tags)}</RichText>,
		outputFilename: baseT("outputFilename"),
		outputFilenameDescription: <RichText>{(tags) => baseT.rich("outputFilenameDescription", tags)}</RichText>,
		outputFileFormat: baseT("outputFormat"),
		outputFileFormatDescription: <RichText>{(tags) => baseT.rich("outputFileFormatDescription", tags)}</RichText>,
		outputFolderPlaceholderDescription: (
			<RichText>{(tags) => baseT.rich("outputFolderPlaceholderDescription", tags)}</RichText>
		),
	}

	const actionTabStrings = {
		alert: actionsT("alert"),
		alertDescription: actionsT("alertDescription"),
		onPartedDownload: actionsT("onPartedDownload"),
		onPartedDownloadDescription: actionsT.rich("onPartedDownloadDescription", {
			important: (chunks) => (
				<>
					<br />
					<strong>{chunks}</strong>
				</>
			),
		}),
		onStreamEnded: actionsT("onStreamEnded"),
		onStreamEndedDescription: actionsT.rich("onStreamEndedDescription", {
			important: (chunks) => (
				<>
					<br />
					<strong>{chunks}</strong>
				</>
			),
		}),
		newAction: actionsT("newAction"),
		actionStrings: {
			title: actionsT("newAction"),
			description: actionsT("newActionDescription"),
			actionType: actionsT("actionType"),
			actionTypeDescription: actionsT("actionTypeDescription"),
			actionSelectPlaceholder: actionsT("actionSelectPlaceholder"),
			state: actionsT("actionState"),
			stateDescription: actionsT("actionStateDescription"),
			cancel: actionsT("cancel"),
			save: actionsT("save"),

			commandStrings: {
				title: commandT("title"),
				program: commandT("program"),
				programDescription: commandT("programDescription"),
				arguments: commandT("arguments"),
				argumentsDescription: commandT("argumentsDescription"),
				addArgument: commandT("addArgument"),
				removeArgument: commandT("removeArgument"),
			},
			rcloneStrings: {
				title: rcloneT("title"),
				operation: rcloneT("operation"),
				operationDescription: rcloneT("operationDescription"),
				remotePath: rcloneT("remote"),
				remotePathDescription: <RichText>{(tags) => rcloneT.rich("remoteDescription", tags)}</RichText>,
				arguments: rcloneT("args"),
				argumentsDescription: rcloneT("argsDescription"),
			},
			removeStrings: {
				title: removeT("title"),
			},
			moveStrings: {
				title: moveT("title"),
				destination: moveT("destination"),
				destinationDefault: moveT("destinationDefault"),
				destinationDescription: moveT("destinationDescription"),
			},
			copyStrings: {
				title: copyT("title"),
				destination: copyT("destination"),
				destinationDefault: copyT("destinationDefault"),
				destinationDescription: copyT("destinationDescription"),
			},
		},
	}

	return {
		fields: {
			name: {
				label: tData("name"),
				description: t("name.description"),
			},
			url: {
				label: tData("url"),
				description: t("url.description"),
			},
			enableRecording: {
				label: t("enabledRecording.label"),
				description: t("enabledRecording.description"),
			},
			startTime: {
				label: t("fields.startTime.label"),
			},
			endTime: {
				label: t("fields.endTime.label"),
			},
			template: {
				label: tData("template"),
				description: <RichText>{(tags) => t.rich("template.description", tags)}</RichText>,
			},
			asTemplate: {
				label: t("asTemplate.label"),
				description: t("asTemplate.description"),
			},
		},
		scheduling: {
			enableScheduling: t("fields.enableScheduling.label"),
			startTimeTooltip: t("fields.startTime.tooltip"),
			endTimeTooltip: t("fields.endTime.tooltip"),
			overnightSchedule: {
				title: t("alert.title"),
				description: t("overnightSchedule"),
			},
		},
		template: {
			default: t("template.default"),
			search: t("template.search"),
			noTemplate: t("template.noTemplate"),
			doNotUse: t("template.doNotUseTemplate"),
		},
		sections: {
			streamerOnlyOptions: t("streamerOnlyOptions"),
			platformSpecific: t("platformSpecificOptions"),
			defaultDownload: t("defaultDownloadOptions"),
			callback: t("callbackOptions"),
		},
		overrideWarning: {
			title: t("alert.title"),
			description: t("alert.overrideDescription"),
		},
		toast: {
			submitMessage: tToast("submitMessage"),
			submitErrorMessage: tToast("submitErrorMessage"),
		},
		save: t("save"),
		engine: engineTranslations,
		platform: {
			huya: huyaT,
			douyin: douyinT,
			douyinQuality: douyinQualityOptions,
			douyu: douyuT,
			douyuQuality: douyuQualityOptions,
			twitch: twitchT,
			twitchQuality: twitchQualityOptions,
			pandatv: pandaT,
			pandatvQuality: pandaQualityOptions,
			weibo: weiboT,
			base: baseDownloadStrings,
		},
		actions: actionTabStrings,
	}
}