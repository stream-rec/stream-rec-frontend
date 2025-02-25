"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormState } from "react-hook-form"
import { Form, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/src/components/new-york/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/new-york/ui/select"
import { Input } from "@/src/components/new-york/ui/input"
import React, { useCallback, useEffect, useState, useMemo, memo } from "react"
import { DanmuFlagFormfield } from "@/src/app/[locale]/(feat)/settings/components/form/danmu-flag-formfield"
import { OutputFolderFormField } from "@/src/app/[locale]/(feat)/settings/components/form/output-folder-formfield"
import { OutputFilenameFormfield } from "@/src/app/[locale]/(feat)/settings/components/form/output-filename-formfield"
import { OutputFileFormatFormfield } from "@/src/app/[locale]/(feat)/settings/components/form/output-file-format-formfield"
import { GlobalConfig, globalConfigSchema } from "@/src/lib/data/config/definitions"
import { LoadingButton } from "@/src/components/new-york/ui/loading-button"
import { RestartNeededHoverCard } from "@/src/app/[locale]/(feat)/settings/components/restart-needed-hover-card"
import { toast } from "sonner"
import { GlobalSettingsTranslations } from "@/src/app/hooks/translations/global-settings-translations"
import { FlagFormField } from "@/src/app/[locale]/(feat)/settings/components/form/flag-form-field"
import { KotlinEngineFields } from "@/src/app/[locale]/(feat)/settings/components/form/engines/kotlin-engine-fields"
import { FfmpegBasedEngineFields } from "@/src/app/[locale]/(feat)/settings/components/form/engines/ffmpeg-based-engine-fields"
import { DownloadEngineSchema } from "@/src/lib/data/engines/definitions"
import { fetchEngineConfig, updateEngineConfig } from "@/src/lib/data/engines/engines-apis"
import FormFieldWrapper from "@/src/app/[locale]/(feat)/settings/components/form-field-wrapper"
import SizeInputField from "@/src/app/[locale]/(feat)/settings/components/form/size-input-field"
import DurationInputField from "@/src/app/[locale]/(feat)/settings/components/form/duration-input-field"

// Memoize the sub-components
const MemoizedKotlinEngineFields = memo(KotlinEngineFields)
const MemoizedFfmpegBasedEngineFields = memo(FfmpegBasedEngineFields)

type GlobalFormProps = {
	appConfig: GlobalConfig
	update: (config: GlobalConfig) => Promise<void>
	getEngineConfig(globalId: number, engineName: string): ReturnType<typeof fetchEngineConfig>
	updateEngineConfig(
		globalId: number,
		engineName: string,
		config: DownloadEngineSchema
	): ReturnType<typeof updateEngineConfig>
	strings: GlobalSettingsTranslations
}

const engines = ["kotlin", "ffmpeg", "streamlink"]

export function GlobalForm({ appConfig, update, getEngineConfig, updateEngineConfig, strings }: GlobalFormProps) {
	const [engine, setEngine] = useState(appConfig.engine)
	const [isEngineConfigLoading, setIsEngineConfigLoading] = useState(false)

	const form = useForm<GlobalConfig>({
		resolver: zodResolver(globalConfigSchema, {
			errorMap: (issue, ctx) => {
				console.log("Zod validation issue:", issue, ctx)
				return { message: issue.message || "Validation error" }
			},
		}),
		defaultValues: appConfig,
		mode: "onChange",
	})

	const { isSubmitting, isValid } = useFormState({ control: form.control })

	// Memoize the AlertCard component
	const AlertCard = useMemo(() => {
		const AlertCardComponent = (children: React.ReactNode) => (
			<div className='flex flex-row items-center gap-x-2'>
				{children}
				<RestartNeededHoverCard title={strings.alertTitle} description={strings.alertDescription} />
			</div>
		)
		AlertCardComponent.displayName = "AlertCard"
		return AlertCardComponent
	}, [strings.alertTitle, strings.alertDescription])

	// Memoize the onSubmit function
	const onSubmit = useCallback(
		async (data: GlobalConfig) => {
			const finalData = { ...data }
			const engineConfig = finalData.engineConfig

			try {
				// merge the promises to update the engine config and the global config
				const updatePromises = Promise.all([
					updateEngineConfig(finalData.id, engine, engineConfig as DownloadEngineSchema),
					update({ ...finalData, engineConfig: undefined }),
				])

				toast.promise(updatePromises, {
					loading: "Updating config...",
					success: () => "Config updated",
					error: error => `Error: ${error.message || "Unknown error"}`,
				})
			} catch (error: any) {
				toast.error(`Failed to update: ${error.message || "Unknown error"}`)
			}
		},
		[engine, updateEngineConfig, update]
	)

	// Memoize the engine change handler with proper error handling
	const handleEngineChange = useCallback(
		async (e: string, field: any) => {
			setIsEngineConfigLoading(true)
			try {
				const newEngineConf = await getEngineConfig(appConfig.id, e)
				if (newEngineConf) {
					form.setValue("engineConfig", newEngineConf)
					setEngine(e)
					field.onChange(e)
				}
			} catch (error: any) {
				console.error("Failed to load engine config:", error)
				toast.error(`Failed to load engine config: ${error.message || "Unknown error"}`)
			} finally {
				setIsEngineConfigLoading(false)
			}
		},
		[getEngineConfig, appConfig.id, form]
	)

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormFieldWrapper
					control={form.control}
					name='engine'
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
										<SelectValue placeholder='{Select a download engine}' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{engines.map((engine, index) => (
										<SelectItem key={index} value={engine}>
											{engine}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription className='text-[0.8rem] text-muted-foreground'>
								{strings.engineDescription}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{engine === "kotlin" && (
					<MemoizedKotlinEngineFields
						{...{
							form,
							controlPrefix: "engineConfig",
							strings: {
								enableFix: strings.enableFixFlvTitle,
								enableFixDescription: strings.enableFixFlvDescription,
								enableFlvDuplicateTagFilteringTitle: strings.enableFlvDuplicateTagFilteringTitle,
								enableFlvDuplicateTagFilteringDescription: strings.enableFlvDuplicateTagFilteringDescription,
								combineHlsFiles: strings.combineHlsFiles,
								combineHlsFilesDescription: strings.combineHlsFilesDescription,
							},
						}}
					/>
				)}

				{(engine === "ffmpeg" || engine === "streamlink") && (
					<MemoizedFfmpegBasedEngineFields
						{...{
							form,
							controlPrefix: "engineConfig",
							strings: {
								useBuiltinSegmenterTitle: strings.useBuiltInSegmenter,
								useBuiltInSegmenterDescription: strings.useBuiltInSegmenterDescription,
								useBuiltInSegmenterNote: strings.useBuiltInSegmenterNote,
								useBuiltInSegmenterNoteDescription: strings.useBuiltInSegmenterNoteDescription,
								exitOnErrorTitle: strings.exitOnErrorTitle,
								exitOnErrorDescription: strings.exitOnErrorDescription,
							},
						}}
					/>
				)}

				<DanmuFlagFormfield control={form.control} title={strings.danmu} description={strings.danmuDescription} />

				<FlagFormField
					control={form.control}
					fieldName={"deleteFilesAfterUpload"}
					title={strings.deleteFiles}
					description={strings.deleteFilesDescription}
					ariaLabel={"File deletion switch"}
				/>

				<OutputFolderFormField
					control={form.control}
					name={strings.outputFolder}
					description={strings.outputFolderDescription}
					placeholderDescription={strings.outputFolderPlaceholderDescription}
				/>
				<OutputFilenameFormfield
					control={form.control}
					name={strings.outputFilename}
					description={strings.outputFilenameDescription}
				/>
				<OutputFileFormatFormfield
					control={form.control}
					name={strings.outputFormat}
					description={strings.outputFormatDescription}
				/>

				<SizeInputField
					control={form.control}
					name='minPartSize'
					label={strings.minPart}
					description={strings.minPartDescription}
					placeholder={strings.minPartDefault}
				/>

				<SizeInputField
					control={form.control}
					name='maxPartSize'
					label={strings.maxPart}
					description={strings.maxPartDescription}
					placeholder={strings.maxPartDefault}
				/>

				<DurationInputField
					control={form.control}
					name='maxPartDuration'
					label={strings.maxPartDuration}
					description={strings.maxPartDurationDescription}
					placeholder={strings.maxPartDurationDefault}
					timeFormatLabels={strings.timeFormats}
				/>

				<FormFieldWrapper
					control={form.control}
					name='maxConcurrentDownloads'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{AlertCard(strings.maxConcurrentDownload)}</FormLabel>
							<FormControl>
								<Input
									type='number'
									placeholder='5'
									onChange={e => field.onChange(Number(e.target.value))}
									value={field.value}
								/>
							</FormControl>
							<FormDescription>{strings.maxConcurrentDownloadDescription}</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<LoadingButton type='submit' loading={isSubmitting} disabled={!isValid}>
					{strings.save}
				</LoadingButton>
			</form>
		</Form>
	)
}
