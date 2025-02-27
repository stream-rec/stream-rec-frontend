"use client"

import { useFieldArray, useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/src/components/new-york/ui/form"
import { Input } from "@/src/components/new-york/ui/input"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Button } from "@/src/components/new-york/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/new-york/ui/tabs"
import { clsx } from "clsx"
import { CaretSortIcon, CheckIcon, RocketIcon } from "@radix-ui/react-icons"
import { Alert, AlertDescription, AlertTitle } from "@/src/components/new-york/ui/alert"
import { streamerSchema, StreamerSchema, StreamerState } from "@/src/lib/data/streams/definitions"
import { huyaDownloadConfig } from "@/src/lib/data/platform/huya/definitions"
import { douyinDownloadConfig } from "@/src/lib/data/platform/douyin/definitions"
import { platformRegexes, PlatformType } from "@/src/lib/data/platform/definitions"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/new-york/ui/popover"
import { cn } from "@/src/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/src/components/new-york/ui/command"
import { toastData } from "@/src/app/utils/toast"
import {
	ActionsCallbackTab,
	ActionsCallbackTabStrings,
} from "@/src/app/[locale]/(feat)/streamers/components/actions/actions-callback-tab"
import { useRouter } from "@/src/i18n/routing"
import { BaseDownloadConfig } from "@/src/app/[locale]/(feat)/streamers/components/platforms/base-download-config"
import { BaseDownloadTabString } from "@/src/app/[locale]/(feat)/settings/platform/tabs/base-download-tab"
import { DouyinPlatform } from "@/src/app/[locale]/(feat)/streamers/components/platforms/douyin-platform"
import { HuyaPlatform } from "@/src/app/[locale]/(feat)/streamers/components/platforms/huya-platform"
import { LoadingButton } from "@/src/components/new-york/ui/loading-button"
import { DouyuPlatformForm } from "@/src/app/[locale]/(feat)/streamers/components/platforms/douyu-platform"
import { douyuDownloadConfig } from "@/src/lib/data/platform/douyu/definitions"
import { twitchDownloadConfig } from "@/src/lib/data/platform/twitch/definitions"
import { TwitchPlatformForm } from "@/src/app/[locale]/(feat)/streamers/components/platforms/twitch-platform"
import { pandaTvDownloadConfig } from "@/src/lib/data/platform/pandatv/definitions"
import { PandaTvPlatformForm } from "@/src/app/[locale]/(feat)/streamers/components/platforms/pandalive-platform"
import { FlagFormField } from "@/src/app/[locale]/(feat)/settings/components/form/flag-form-field"
import { WeiboPlatformForm } from "@/src/app/[locale]/(feat)/streamers/components/platforms/weibo-platform"
import { WeiboTabString } from "@/src/app/hooks/translations/weibo-translations"
import { weiboDownloadConfig } from "@/src/lib/data/platform/weibo/definitions"
import { DouyinQuality, DouyinTabString } from "@/src/app/hooks/translations/douyin-translations"
import { HuyaTabString } from "@/src/app/hooks/translations/huya-translations"
import { DouyuQuality, DouyuTabString } from "@/src/app/hooks/translations/douyu-translations"
import { TwitchQualityItem, TwitchTabString } from "@/src/app/hooks/translations/twitch-translations"
import { PandaTvQualityItem, PandaTvTabString } from "@/src/app/hooks/translations/pandatv-translations"
import EngineSelector from "../../settings/components/form/engine-selector"
import { EngineTranslations } from "@/src/app/hooks/translations/engine-translations"
import { DownloadEngineSchema, engineConfigSchema } from "@/src/lib/data/engines/definitions"
import { TimeSelector } from "./time-selector"
import { PlatformForm } from "./platform-registry"
import dynamic from "next/dynamic"
import { WarningHoverCard } from "../../settings/components/warning-hover-card"

export type StreamerConfigProps = {
	strings: {
		toast: {
			submitErrorMessage: string
			submitMessage: string
		}
		streamerData: {
			name: string
			url: string
			template: string
			startTime: string
			endTime: string
		}
		streamerForm: {
			nameDescription: string
			urlDescription: string | React.ReactNode
			enabledRecording: string
			enabledRecordingDescription: string
			templateSearch: string
			noTemplate: string
			templateDefault: string
			templateDescription: string | React.ReactNode
			doNotUseTemplate: string
			asTemplate: string
			asTemplateDescription: string
			save: string
			streamerOnlyOptions: string
			alert: string
			alertOverrideDescription: string
			platformSpecificOptions: string
			defaultDownloadOptions: string
			callbackOptions: string
			engineTranslations: EngineTranslations
		}
		huyaStrings: HuyaTabString
		douyinStrings: DouyinTabString
		douyinQualityOptions: DouyinQuality[]
		douyuStrings: DouyuTabString
		douyuQualityOptions: DouyuQuality[]
		twitchStrings: TwitchTabString
		twitchQualityOptions: TwitchQualityItem[]
		pandaStrings: PandaTvTabString
		pandaQualityOptions: PandaTvQualityItem[]
		weiboStrings: WeiboTabString
		baseDownloadStrings: BaseDownloadTabString
		actionTabStrings: ActionsCallbackTabStrings
	}
	defaultValues?: StreamerSchema
	templateUsers: StreamerSchema[]
	onSubmit: (data: StreamerSchema) => Promise<StreamerSchema>
}

export function StreamerForm({ strings, defaultValues, templateUsers, onSubmit }: StreamerConfigProps) {
	const router = useRouter()

	const [platform, setPlatform] = useState(defaultValues?.platform || "invalid")
	const [isTemplate, setIsTemplate] = useState(defaultValues?.isTemplate || false)

	// Moved formatTimeString above to fix reference order
	// Include a return type for the formatted time string utility
	const formatTimeString = useCallback((date: Date): string => {
		return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
	}, [])

	// Using useMemo for dates to avoid unnecessary recreations
	const [startDate, setStartDate] = useState<Date>(() => createDateFromString(defaultValues?.startTime ?? "00:00:00"))
	const [endDate, setEndDate] = useState<Date>(() => createDateFromString(defaultValues?.endTime ?? "00:00:00"))

	// Extract helper function
	function createDateFromString(dateString: string): Date {
		if (!dateString) return new Date()
		const [hours, minutes, seconds] = dateString.split(":").map(x => parseInt(x) || 0) // Added fallback to 0
		const date = new Date()
		date.setHours(hours, minutes, seconds)
		return date
	}

	// Memoize schema creation
	const platformStreamerSchema = useMemo(() => {
		const schemaMap: Record<PlatformType, any> = {
			[PlatformType.HUYA]: huyaDownloadConfig,
			[PlatformType.DOUYIN]: douyinDownloadConfig,
			[PlatformType.DOUYU]: douyuDownloadConfig,
			[PlatformType.TWITCH]: twitchDownloadConfig,
			[PlatformType.PANDATV]: pandaTvDownloadConfig,
			[PlatformType.WEIBO]: weiboDownloadConfig,
			[PlatformType.TEMPLATE]: streamerSchema.pick({ downloadConfig: true }),
		}

		return platform in schemaMap
			? streamerSchema.omit({ downloadConfig: true }).extend({ downloadConfig: schemaMap[platform as PlatformType] })
			: streamerSchema
	}, [platform])

	// Memoize resolver function to prevent unnecessary recreations
	const formResolver = useCallback(
		(data: any, context: any, options: any) => {
			return zodResolver(platformStreamerSchema)(data, context, options)
		},
		[platformStreamerSchema]
	)

	const form = useForm<StreamerSchema>({
		resolver: formResolver,
		defaultValues: defaultValues,
		mode: "onChange",
	})

	const {
		fields: partedFields,
		append: partedAppend,
		remove: partedRemove,
		update: partedUpdate,
	} = useFieldArray({
		control: form.control,
		name: "downloadConfig.onPartedDownload",
	})

	const {
		fields: streamEndedFields,
		append: streamEndedAppend,
		remove: streamEndedRemove,
		update: streamEndedUpdate,
	} = useFieldArray({
		control: form.control,
		name: "downloadConfig.onStreamingFinished",
	})

	// Load form field arrays once
	useEffect(() => {
		if (defaultValues?.downloadConfig?.onPartedDownload?.length) {
			partedRemove()
			defaultValues.downloadConfig.onPartedDownload.forEach(item => partedAppend(item))
		}

		if (defaultValues?.downloadConfig?.onStreamingFinished?.length) {
			streamEndedRemove()
			defaultValues.downloadConfig.onStreamingFinished.forEach(item => streamEndedAppend(item))
		}
	}, [defaultValues, partedRemove, partedAppend, streamEndedRemove, streamEndedAppend])

	// Set template URL only when isTemplate changes
	useEffect(() => {
		if (isTemplate && !defaultValues?.url) {
			form.setValue("url", "https://www.huya.com/" + Date.now())
			form.setValue("downloadConfig.type", PlatformType.TEMPLATE)
			setPlatform("UNKNOWN")
		} else if (!isTemplate && !defaultValues?.url) {
			form.setValue("url", "")
		}
	}, [isTemplate, defaultValues?.url, form, setPlatform])

	const { isSubmitting, isValid } = useFormState({ control: form.control })
	const selectedTemplateId = form.watch("templateId")

	// Optimize URL validation to prevent unnecessary re-renders
	const trySetPlatform = useCallback(
		(url: string) => {
			for (const { platformType, regex } of platformRegexes) {
				if (new RegExp(regex).test(url)) {
					// Convert string to RegExp before using test()
					if (platform !== platformType) {
						form.setValue("downloadConfig.type", platformType)
						setPlatform(platformType)
					}
					return true
				}
			}

			// Only update if platform has changed to prevent unnecessary re-renders
			if (platform !== "invalid") {
				form.setValue("downloadConfig.type", "invalid")
				setPlatform("invalid")
			}
			return false
		},
		[platform, form, setPlatform]
	)

	// Handle form submission with optimized data processing
	const handleSubmit = useCallback(
		async (data: StreamerSchema) => {
			try {
				const isCreated = !data.id
				const submitData = { ...data, platform: platform.toUpperCase() }

				// Improved null/undefined handling and string comparison
				const startTime = submitData.startTime?.trim()
				const endTime = submitData.endTime?.trim()

				// Clear empty strings to undefined for consistency
				submitData.startTime = startTime || undefined
				submitData.endTime = endTime || undefined

				// Handle time pairs
				if (submitData.startTime || submitData.endTime) {
					// Only set defaults when one time is provided but not the other
					if (submitData.startTime && !submitData.endTime) {
						submitData.endTime = "00:00:00"
					} else if (!submitData.startTime && submitData.endTime) {
						submitData.startTime = "00:00:00"
					}

					// Clear both times if they're both defaults (without risking strict equality issues)
					if (submitData.startTime === "00:00:00" && submitData.endTime === "00:00:00") {
						submitData.startTime = undefined
						submitData.endTime = undefined
					}
				}

				// Clear engine config when engine is null or default
				if (!submitData.engine || submitData.engine === "default") {
					submitData.engineConfig = undefined
				}

				await onSubmit(submitData)
				toastData(strings.toast.submitMessage, submitData, "code")

				if (isCreated) {
					router.push(`/streamers`)
				}
				router.refresh()
			} catch (error) {
				console.error(error)
				// Better error handling for any error type
				const errorMessage = error instanceof Error ? error.message : String(error)
				toastData("Error", errorMessage, "error")
			}
		},
		[platform, onSubmit, router, strings.toast.submitMessage]
	)

	// Include proper form handling for engine config
	const getEngineConfig = useCallback(
		(entityId: number, engineName: string): Promise<DownloadEngineSchema | undefined> => {
			if (!engineName || engineName === "default") {
				form.setValue("engineConfig", undefined)
				return Promise.resolve(undefined)
			}

			try {
				// Use proper error handling for safe parse
				const result = engineConfigSchema.safeParse({ type: engineName })
				return Promise.resolve(result.success ? ({ type: engineName } as DownloadEngineSchema) : undefined)
			} catch (error) {
				console.error("Engine config parse error:", error)
				return Promise.resolve(undefined)
			}
		},
		[form]
	)

	// Optimized time change handlers to minimize state updates
	const handleStartTimeChange = useCallback(
		(date: Date | undefined) => {
			if (!date) {
				form.setValue("startTime", undefined)
				setStartDate(new Date()) // Reset to current time but don't reflect in form
				return
			}
			const timeString = formatTimeString(date)
			form.setValue("startTime", timeString)
			setStartDate(date)
		},
		[form, formatTimeString]
	)

	const handleEndTimeChange = useCallback(
		(date: Date | undefined) => {
			if (!date) {
				form.setValue("endTime", undefined)
				setEndDate(new Date()) // Reset to current time but don't reflect in form
				return
			}
			const timeString = formatTimeString(date)
			form.setValue("endTime", timeString)
			setEndDate(date)
		},
		[form, formatTimeString]
	)

	// Add lazy loaded tabs for better performance
	const DynamicTabContent = dynamic(
		() => Promise.resolve(({ children }: { children: React.ReactNode }) => <>{children}</>),
		{ ssr: false }
	)

	// Track active tab to enable lazy loading
	const [activeTab, setActiveTab] = useState<string>(isTemplate ? "default" : "platform")

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{strings.streamerData.name}</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormDescription>{strings.streamerForm.nameDescription}</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					{!isTemplate && (
						<>
							<FormField
								control={form.control}
								name='url'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{strings.streamerData.url}</FormLabel>
										<FormControl>
											<Input
												value={field.value}
												onChange={e => {
													field.onChange(e)
													trySetPlatform(e.target.value)
												}}
											/>
										</FormControl>
										<FormDescription>{strings.streamerForm.urlDescription}</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FlagFormField
								control={form.control}
								fieldName={"state"}
								title={strings.streamerForm.enabledRecording}
								description={strings.streamerForm.enabledRecordingDescription}
								checked={state => state !== StreamerState.CANCELLED}
								onChange={value => {
									form.setValue("state", value ? StreamerState.NOT_LIVE : StreamerState.CANCELLED)
								}}
								ariaLabel={"Should record switch"}
							/>

							<TimeSelector
								label={strings.streamerData.startTime}
								date={startDate}
								onTimeChange={handleStartTimeChange}
							/>

							<TimeSelector label={strings.streamerData.endTime} date={endDate} onTimeChange={handleEndTimeChange} />

							<FormField
								control={form.control}
								name='templateId'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>{strings.streamerData.template}</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant='outline'
														role='combobox'
														className={cn(
															"w-[200px] justify-between",
															!field.value && field.value !== 0 && "text-muted-foreground"
														)}
													>
														{field.value
															? field.value === 0
																? strings.streamerForm.templateDefault
																: templateUsers.find(language => language.id === field.value)?.name
															: strings.streamerForm.templateDefault}
														<CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className='w-[200px] p-0'>
												<Command>
													<CommandInput placeholder={strings.streamerForm.templateSearch} className='h-9' />
													<CommandEmpty>{strings.streamerForm.noTemplate}</CommandEmpty>
													<CommandGroup>
														<CommandItem
															value={"0"}
															key={"No template"}
															onSelect={() => {
																form.setValue("templateId", 0)
															}}
														>
															{strings.streamerForm.doNotUseTemplate}
															<CheckIcon
																className={cn("ml-auto h-4 w-4", field.value === 0 ? "opacity-100" : "opacity-0")}
															/>
														</CommandItem>
														{templateUsers.map(language => (
															<CommandItem
																value={language.id?.toString()}
																key={language.name}
																onSelect={() => {
																	form.setValue("templateId", language.id)
																}}
															>
																{language.name}
																<CheckIcon
																	className={cn(
																		"ml-auto h-4 w-4",
																		language.id === field.value ? "opacity-100" : "opacity-0"
																	)}
																/>
															</CommandItem>
														))}
													</CommandGroup>
												</Command>
											</PopoverContent>
										</Popover>
										<FormDescription>{strings.streamerForm.templateDescription}</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}

					{selectedTemplateId === 0 && (
						<FlagFormField
							control={form.control}
							fieldName={"isTemplate"}
							title={strings.streamerForm.asTemplate}
							description={strings.streamerForm.asTemplateDescription}
							ariaLabel={"Template streamer switch"}
							onChange={setIsTemplate}
						/>
					)}

					<EngineSelector
						form={form}
						entityId={0}
						showNullable={true}
						initialEngine={defaultValues?.engine ?? "default"}
						getEngineConfig={getEngineConfig}
						strings={strings.streamerForm.engineTranslations}
						className='space-y-6'
					/>

					<div
						className={clsx("space-y-6", {
							hidden: platform === "invalid" || (selectedTemplateId && selectedTemplateId !== 0),
						})}
					>
						<div className='flex items-center space-x-2'>
							<h3 className='text-md font-semibold'>{strings.streamerForm.streamerOnlyOptions}</h3>
							<WarningHoverCard
								title={strings.streamerForm.alert}
								description={strings.streamerForm.alertOverrideDescription}
							/>
						</div>

						<Tabs defaultValue={isTemplate ? "default" : "platform"} onValueChange={setActiveTab}>
							<TabsList
								className={clsx(
									"ml-auto grid h-auto w-auto grid-cols-1",
									{ "md:grid-cols-3": !isTemplate },
									{ "md:grid-cols-2": isTemplate }
								)}
							>
								{!isTemplate && (
									<TabsTrigger value='platform' className='text-zinc-600 dark:text-zinc-200'>
										{strings.streamerForm.platformSpecificOptions}
									</TabsTrigger>
								)}
								<TabsTrigger value='default' className='text-zinc-600 dark:text-zinc-200'>
									{strings.streamerForm.defaultDownloadOptions}
								</TabsTrigger>
								<TabsTrigger value='actions' className='text-zinc-600 dark:text-zinc-200'>
									{strings.streamerForm.callbackOptions}
								</TabsTrigger>
							</TabsList>

							<div>
								{!isTemplate && (
									<TabsContent value='platform'>
										{/* Only render platform content if it's the active tab for better performance */}
										{activeTab === "platform" && platform !== "invalid" && (
											<DynamicTabContent>
												<PlatformForm platform={platform} strings={strings} allowNone={true} />
											</DynamicTabContent>
										)}
									</TabsContent>
								)}
								<TabsContent value='default'>
									{activeTab === "default" && (
										<DynamicTabContent>
											<BaseDownloadConfig allowNone={true} strings={strings.baseDownloadStrings} />
										</DynamicTabContent>
									)}
								</TabsContent>
								<TabsContent value='actions'>
									{activeTab === "actions" && (
										<DynamicTabContent>
											<ActionsCallbackTab
												addItem={partedAppend}
												addItemEnded={streamEndedAppend}
												deleteItem={partedRemove}
												deleteItemEnded={streamEndedRemove}
												list={partedFields}
												endedList={streamEndedFields}
												updateItem={(index, data) => {
													partedUpdate(index, data)
													toastData(strings.toast.submitMessage, data, "code")
												}}
												updateItemEnded={(index, data) => {
													streamEndedUpdate(index, data)
													toastData(strings.toast.submitMessage, data, "code")
												}}
												strings={strings.actionTabStrings}
											/>
										</DynamicTabContent>
									)}
								</TabsContent>
							</div>
						</Tabs>
					</div>

					<LoadingButton
						type='submit'
						loading={isSubmitting}
						disabled={!isValid}
						className='flex h-12 w-full items-center justify-center rounded-lg p-3 text-sm font-medium'
					>
						{strings.streamerForm.save}
					</LoadingButton>
				</form>
			</Form>
		</div>
	)
}
