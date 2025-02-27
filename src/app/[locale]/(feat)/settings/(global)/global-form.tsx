"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormState } from "react-hook-form"
import { Form, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/src/components/new-york/ui/form"
import { Input } from "@/src/components/new-york/ui/input"
import React, { useCallback, useState, useMemo } from "react"
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
import { DownloadEngineSchema } from "@/src/lib/data/engines/definitions"
import { fetchEngineConfig, updateEngineConfig } from "@/src/lib/data/engines/engines-apis"
import FormFieldWrapper from "@/src/app/[locale]/(feat)/settings/components/form-field-wrapper"
import SizeInputField from "@/src/app/[locale]/(feat)/settings/components/form/size-input-field"
import DurationInputField from "@/src/app/[locale]/(feat)/settings/components/form/duration-input-field"
import EngineSelector from "@/src/app/[locale]/(feat)/settings/components/form/engine-selector"

type GlobalFormProps = {
	appConfig: GlobalConfig
	update: (config: GlobalConfig) => Promise<void>
	getEngineConfig(globalId: number, engineName: string): Promise<DownloadEngineSchema>
	updateEngineConfig(
		globalId: number,
		engineName: string,
		config: DownloadEngineSchema
	): ReturnType<typeof updateEngineConfig>
	strings: GlobalSettingsTranslations
}

export function GlobalForm({ appConfig, update, getEngineConfig, updateEngineConfig, strings }: GlobalFormProps) {
	const [engine, setEngine] = useState(appConfig.engine)

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

	// Handle engine change from the EngineSelector component
	const handleEngineChange = useCallback((newEngine: string, _config: DownloadEngineSchema) => {
		setEngine(newEngine)
	}, [])

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

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<EngineSelector
					form={form}
					entityId={appConfig.id}
					initialEngine={appConfig.engine}
					getEngineConfig={getEngineConfig}
					onEngineChange={handleEngineChange}
					strings={strings.engineTranslations}
					className='space-y-6'
				/>

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

				{/* Rest of the numeric input fields with AlertCard */}
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

				{/* ...existing code for other fields... */}

				<LoadingButton type='submit' loading={isSubmitting} disabled={!isValid}>
					{strings.save}
				</LoadingButton>
			</form>
		</Form>
	)
}
