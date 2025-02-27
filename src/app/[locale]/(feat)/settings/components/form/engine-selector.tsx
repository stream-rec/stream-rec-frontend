import React, { useState, useCallback, memo, useEffect } from "react"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/src/components/new-york/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/new-york/ui/select"
import { KotlinEngineFields } from "@/src/app/[locale]/(feat)/settings/components/form/engines/kotlin-engine-fields"
import { FfmpegBasedEngineFields } from "@/src/app/[locale]/(feat)/settings/components/form/engines/ffmpeg-based-engine-fields"
import { toast } from "sonner"
import { DownloadEngineSchema } from "@/src/lib/data/engines/definitions"
import FormFieldWrapper from "@/src/app/[locale]/(feat)/settings/components/form-field-wrapper"
import { EngineTranslations } from "@/src/app/hooks/translations/engine-translations"

// Memoize the sub-components for better performance
const MemoizedKotlinEngineFields = memo(KotlinEngineFields)
const MemoizedFfmpegBasedEngineFields = memo(FfmpegBasedEngineFields)

const ENGINES = ["kotlin", "ffmpeg", "streamlink"]

type EngineSelectorProps = {
	form: any
	controlPrefix?: string
	entityId: number
	initialEngine: string | undefined
	getEngineConfig: (entityId: number, engineName: string) => Promise<DownloadEngineSchema | undefined>
	onEngineChange?: (engine: string, config: DownloadEngineSchema) => void
	showNullable?: boolean
	strings: EngineTranslations
	className?: string
}

/**
 * A reusable component for selecting a download engine and displaying its configuration fields
 */
const EngineSelector = ({
	form,
	controlPrefix = "",
	entityId,
	initialEngine,
	getEngineConfig,
	onEngineChange,
	showNullable = false,
	strings,
	className,
}: EngineSelectorProps) => {
	const [engine, setEngine] = useState(initialEngine)
	const [isEngineConfigLoading, setIsEngineConfigLoading] = useState(false)

	// Determine field names based on controlPrefix
	const engineFieldName = controlPrefix ? `${controlPrefix}.engine` : "engine"
	const configFieldName = controlPrefix ? `${controlPrefix}.engineConfig` : "engineConfig"

	// Load initial engine config if it's not already in the form
	useEffect(() => {
		const loadInitialConfig = async () => {
			const currentConfig = form.getValues(configFieldName)
			console.debug("Current engine config:", currentConfig)
			if (!currentConfig && initialEngine) {
				setIsEngineConfigLoading(true)
				try {
					if (getEngineConfig) {
						const config = await getEngineConfig(entityId, initialEngine)
						if (config) {
							form.setValue(configFieldName, config)
						}
					}
				} catch (error: any) {
					console.error("Failed to load initial engine config:", error)
				} finally {
					setIsEngineConfigLoading(false)
				}
			}
		}

		loadInitialConfig()
	}, [initialEngine, entityId, form, configFieldName, getEngineConfig])

	// Handle engine change
	const handleEngineChange = useCallback(
		async (e: string, field: any) => {
			if (!e || e === "default") {
				console.debug("Clearing engine config")
				// Clear the engine config if the engine is cleared
				form.setValue(configFieldName, undefined)
				setEngine(undefined)
				field.onChange(undefined)
				return
			}

			if (!getEngineConfig) return

			console.debug("Loading engine config for", e)

			setIsEngineConfigLoading(true)
			try {
				const newEngineConf = await getEngineConfig(entityId, e)
				if (newEngineConf) {
					form.setValue(configFieldName, newEngineConf)
					setEngine(e)
					field.onChange(e)

					// Notify parent component if callback provided
					if (onEngineChange) {
						onEngineChange(e, newEngineConf)
					}
				}
			} catch (error: any) {
				console.error("Failed to load engine config:", error)
				toast.error(`Failed to load engine config: ${error.message || "Unknown error"}`)
			} finally {
				setIsEngineConfigLoading(false)
			}
		},
		[getEngineConfig, entityId, form, configFieldName, onEngineChange]
	)

	return (
		<div className={className}>
			<FormFieldWrapper
				control={form.control}
				name={engineFieldName}
				render={({ field }) => (
					<FormItem>
						<FormLabel>{strings.engine}</FormLabel>
						<Select
							onValueChange={e => handleEngineChange(e, field)}
							defaultValue={field.value}
							disabled={isEngineConfigLoading}
						>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder={strings.selectEnginePrompt || "Select a download engine"} />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{showNullable && (
									<SelectItem key='default' value={"default"}>
										{strings.selectEnginePrompt || "Select a download engine"}
									</SelectItem>
								)}

								{ENGINES.map(engineOption => (
									<SelectItem key={engineOption} value={engineOption}>
										{engineOption}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<FormDescription>{strings.engineDescription}</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>

			{engine === "kotlin" && (
				<MemoizedKotlinEngineFields
					{...{
						form,
						controlPrefix: configFieldName,
						strings: {
							enableFix: strings.kotlin.enableFixFlvTitle,
							enableFixDescription: strings.kotlin.enableFixFlvDescription,
							enableFlvDuplicateTagFilteringTitle: strings.kotlin.enableFlvDuplicateTagFilteringTitle,
							enableFlvDuplicateTagFilteringDescription: strings.kotlin.enableFlvDuplicateTagFilteringDescription,
							combineHlsFiles: strings.kotlin.combineHlsFiles,
							combineHlsFilesDescription: strings.kotlin.combineHlsFilesDescription,
						},
					}}
				/>
			)}

			{(engine === "ffmpeg" || engine === "streamlink") && (
				<MemoizedFfmpegBasedEngineFields
					{...{
						form,
						controlPrefix: configFieldName,
						strings: {
							useBuiltinSegmenterTitle: strings.ffmpeg.useBuiltInSegmenter,
							useBuiltInSegmenterDescription: strings.ffmpeg.useBuiltInSegmenterDescription,
							useBuiltInSegmenterNote: strings.ffmpeg.useBuiltInSegmenterNote,
							useBuiltInSegmenterNoteDescription: strings.ffmpeg.useBuiltInSegmenterNoteDescription,
							exitOnErrorTitle: strings.ffmpeg.exitOnErrorTitle,
							exitOnErrorDescription: strings.ffmpeg.exitOnErrorDescription,
						},
					}}
				/>
			)}
		</div>
	)
}

export default memo(EngineSelector)
