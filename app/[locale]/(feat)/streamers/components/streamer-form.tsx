'use client';

import {useFieldArray, useForm, useFormState} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Input} from "@/components/new-york/ui/input";
import React, {useCallback, useEffect} from "react";
import {Switch} from "@/components/new-york/ui/switch";
import {Button} from "@/components/new-york/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/new-york/ui/tabs";
import {clsx} from "clsx";
import {CaretSortIcon, CheckIcon, RocketIcon} from "@radix-ui/react-icons";
import {Alert, AlertDescription, AlertTitle} from "@/components/new-york/ui/alert";
import {streamerSchema, StreamerSchema} from "@/lib/data/streams/definitions";
import {huyaDownloadConfig} from "@/lib/data/platform/huya/definitions";
import {douyinDownloadConfig} from "@/lib/data/platform/douyin/definitions";
import {platformRegexes, PlatformType} from "@/lib/data/platform/definitions";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/new-york/ui/popover";
import {cn} from "@/lib/utils";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/new-york/ui/command";
import {toastData} from "@/app/utils/toast";
import {DouyinQuality, DouyinTabString} from "@/app/[locale]/(feat)/settings/platform/tabs/douyin-tab";
import {HuyaTabString} from "@/app/[locale]/(feat)/settings/platform/tabs/huya-tab";
import {ActionsCallbackTab, ActionsCallbackTabStrings} from "@/app/[locale]/(feat)/streamers/components/actions/actions-callback-tab";
import {useRouter} from "@/i18n";
import {BaseDownloadConfig} from "@/app/[locale]/(feat)/streamers/components/platforms/base-download-config";
import {BaseDownloadTabString} from "@/app/[locale]/(feat)/settings/platform/tabs/base-download-tab";
import {DouyinPlatform} from "@/app/[locale]/(feat)/streamers/components/platforms/douyin-platform";
import {HuyaPlatform} from "@/app/[locale]/(feat)/streamers/components/platforms/huya-platform";
import {LoadingButton} from "@/components/new-york/ui/loading-button";
import {DouyuPlatformForm} from "@/app/[locale]/(feat)/streamers/components/platforms/douyu-platform";
import {douyuDownloadConfig} from "@/lib/data/platform/douyu/definitions";
import {DouyuQuality, DouyuTabString} from "@/app/[locale]/(feat)/settings/platform/tabs/douyu-tab";
import {twitchDownloadConfig} from "@/lib/data/platform/twitch/definitions";
import {TwitchPlatformForm} from "@/app/[locale]/(feat)/streamers/components/platforms/twitch-platform";
import {TwitchQualityItem, TwitchTabString} from "@/app/[locale]/(feat)/settings/platform/tabs/twitch-tab";
import {PandaTvQualityItem, PandaTvTabString} from "@/app/[locale]/(feat)/settings/platform/tabs/pandatv-tab";
import {pandaTvDownloadConfig} from "@/lib/data/platform/pandatv/definitions";
import {PandaTvPlatformForm} from "@/app/[locale]/(feat)/streamers/components/platforms/pandalive-platform";

type StreamerConfigProps = {
  strings: {
    toast: {
      submitErrorMessage: string,
      submitMessage: string
    },
    streamerData: {
      name: string,
      url: string,
      template: string,
    },
    streamerForm: {
      nameDescription: string,
      urlDescription: string | React.ReactNode,
      enabledRecording: string,
      enabledRecordingDescription: string,
      templateSearch: string,
      noTemplate: string,
      templateDefault: string,
      templateDescription: string | React.ReactNode,
      doNotUseTemplate: string,
      asTemplate: string,
      asTemplateDescription: string,
      save: string,
      streamerOnlyOptions: string,
      alert: string,
      alertOverrideDescription: string,
      platformSpecificOptions: string,
      defaultDownloadOptions: string,
      callbackOptions: string,
    },
    huyaStrings: HuyaTabString,
    douyinStrings: DouyinTabString,
    douyinQualityOptions: DouyinQuality[],
    douyuStrings: DouyuTabString,
    douyuQualityOptions: DouyuQuality[],
    twitchStrings: TwitchTabString,
    twitchQualityOptions: TwitchQualityItem[],
    pandaStrings: PandaTvTabString,
    pandaQualityOptions: PandaTvQualityItem[],
    baseDownloadStrings: BaseDownloadTabString,
    actionTabStrings: ActionsCallbackTabStrings
  },
  defaultValues?: StreamerSchema
  templateUsers: StreamerSchema[]
  onSubmit: (data: StreamerSchema) => Promise<StreamerSchema>
}

export function StreamerForm({strings, defaultValues, templateUsers, onSubmit}: StreamerConfigProps) {

  const router = useRouter()

  const [platform, setPlatform] = React.useState(defaultValues?.platform || "invalid")
  const [isTemplate, setIsTemplate] = React.useState(defaultValues?.isTemplate || false)

  useEffect(() => {
    if (isTemplate && !defaultValues?.url) {
      form.setValue("url", "https://www.huya.com/" + Date.now())
      form.setValue("downloadConfig.type", PlatformType.TEMPLATE)
      setPlatform("UNKNOWN")
    } else {
      form.setValue("url", defaultValues?.url ?? "")
    }
  }, [isTemplate]);

  const platformStreamerSchema = useCallback(() => {
    if (platform === PlatformType.HUYA) {
      return streamerSchema.omit({downloadConfig: true}).extend({downloadConfig: huyaDownloadConfig});
    } else if (platform === PlatformType.DOUYIN) {
      return streamerSchema.omit({downloadConfig: true}).extend({downloadConfig: douyinDownloadConfig});
    } else if (platform === PlatformType.DOUYU) {
      return streamerSchema.omit({downloadConfig: true}).extend({downloadConfig: douyuDownloadConfig});
    } else if (platform === PlatformType.TWITCH) {
      return streamerSchema.omit({downloadConfig: true}).extend({downloadConfig: twitchDownloadConfig});
    } else if (platform === PlatformType.PANDATV) {
      return streamerSchema.omit({downloadConfig: true}).extend({downloadConfig: pandaTvDownloadConfig});
    } else {
      return streamerSchema;
    }
  }, [platform]);

  const form = useForm<StreamerSchema>({
    resolver: async (data, context, options) => {
      const schema = platformStreamerSchema()
      console.log("formData", data)
      console.log("validation result", await zodResolver(schema)(data, context, options))
      return zodResolver(schema)(data, context, options)
    },
    defaultValues: defaultValues,
    mode: "onChange"
  });

  const {
    fields: partedFields,
    append: partedAppend,
    remove: partedRemove,
    update: partedUpdate
  } = useFieldArray({
    control: form.control,
    name: "downloadConfig.onPartedDownload",
  })

  useEffect(() => {
    if (defaultValues && defaultValues.downloadConfig?.onPartedDownload) {
      partedRemove()
      defaultValues.downloadConfig?.onPartedDownload.forEach(item => {
        console.log("appending parted action", item)
        partedAppend(item);
      });
    }
    if (defaultValues && defaultValues.downloadConfig?.onStreamingFinished) {
      streamEndedRemove()
      defaultValues.downloadConfig?.onStreamingFinished.forEach(item => {
        console.log("appending end action", item)
        streamEndedAppend(item);
      });
    }
  }, []);

  const {
    fields: streamEndedFields,
    append: streamEndedAppend,
    remove: streamEndedRemove,
    update: streamEndedUpdate
  } = useFieldArray({
    control: form.control,
    name: "downloadConfig.onStreamingFinished"
  })

  const {isSubmitting, isValid} = useFormState({control: form.control})

  async function onSubmitData(data: StreamerSchema) {
    try {
      let isCreated = !data.id;
      let submitData = {...data}
      submitData.platform = platform.toUpperCase()
      // make streamer offline if streamer is not activated
      if (!submitData.isActivated) {
        submitData.isLive = false
      }
      await onSubmit(submitData);
      toastData(strings.toast.submitMessage, submitData, "code")
      if (isCreated) {
        router.push(`/streamers`)
      }
      router.refresh()
    } catch (e) {
      console.error(e)
      if (e instanceof Error)
        toastData("Error", (e as Error).message, "error")
    }
  }


  const selectedTemplateId = form.watch("templateId")

  const trySetPlatform = (url: string) => {

    for (const {platformType, regex} of platformRegexes) {
      if (url.match(regex)) {
        if (platform !== platformType) {
          form.setValue("downloadConfig.type", platformType);
          setPlatform(platformType);
        }
        return true;
      }
    }

    form.setValue("downloadConfig.type", "invalid");
    setPlatform("invalid");
    return false;
  };

  return (
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitData)} className="space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                    <FormItem>
                      <FormLabel>{strings.streamerData.name}</FormLabel>
                      <FormControl>
                        <Input {...field}/>
                      </FormControl>
                      <FormDescription>
                        {strings.streamerForm.nameDescription}
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                )}
            />

            {!isTemplate && (
                <>
                  <FormField
                      control={form.control}
                      name="url"
                      render={({field}) => (
                          <FormItem>
                            <FormLabel>{strings.streamerData.url}</FormLabel>
                            <FormControl>
                              <Input value={field.value} onChange={
                                (e) => {
                                  let value = e.target.value
                                  field.onChange(e)
                                  trySetPlatform(value)
                                }
                              }/>
                            </FormControl>
                            <FormDescription>
                              {strings.streamerForm.urlDescription}
                            </FormDescription>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />

                  <FormField
                      control={form.control}
                      name="isActivated"
                      render={({field}) => (
                          <FormItem
                              className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>{strings.streamerForm.enabledRecording}</FormLabel>
                              <FormDescription>
                                {strings.streamerForm.enabledRecordingDescription}
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  arial-label="Record switch"
                              />
                            </FormControl>
                          </FormItem>
                      )}
                  />

                  <FormField
                      control={form.control}
                      name="templateId"
                      render={({field}) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>{strings.streamerData.template}</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn("w-[200px] justify-between", !field.value && field.value !== 0 && "text-muted-foreground")}
                                  >
                                    {field.value ? field.value === 0 ? strings.streamerForm.templateDefault
                                            : templateUsers.find((language) => language.id === field.value)?.name
                                        : strings.streamerForm.templateDefault}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput
                                      placeholder={strings.streamerForm.templateSearch}
                                      className="h-9"
                                  />
                                  <CommandEmpty>{strings.streamerForm.noTemplate}</CommandEmpty>
                                  <CommandGroup>
                                    <CommandItem value={"0"} key={"No template"} onSelect={() => {
                                      form.setValue("templateId", 0)
                                    }}>
                                      {strings.streamerForm.doNotUseTemplate}
                                      <CheckIcon
                                          className={cn("ml-auto h-4 w-4", field.value === 0 ? "opacity-100" : "opacity-0")}
                                      />
                                    </CommandItem>
                                    {templateUsers.map((language) => (
                                        <CommandItem
                                            value={language.id?.toString()}
                                            key={language.name}
                                            onSelect={() => {
                                              form.setValue("templateId", language.id)
                                            }}
                                        >
                                          {language.name}
                                          <CheckIcon
                                              className={cn("ml-auto h-4 w-4",
                                                  language.id === field.value ? "opacity-100" : "opacity-0"
                                              )}
                                          />
                                        </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              {strings.streamerForm.templateDescription}
                            </FormDescription>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />
                </>
            )}

            {
                selectedTemplateId === 0 && (
                    <FormField
                        control={form.control}
                        name="isTemplate"
                        render={({field}) => (
                            <FormItem
                                className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>{strings.streamerForm.asTemplate}</FormLabel>
                                <FormDescription>
                                  {strings.streamerForm.asTemplateDescription}
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={
                                      (e) => {
                                        field.onChange(e);
                                        setIsTemplate(e)
                                      }
                                    }
                                    arial-label="Template streamer switch"
                                />
                              </FormControl>
                            </FormItem>
                        )}
                    />)
            }

            <div className={clsx("space-y-6",
                {"hidden": platform === "invalid" || selectedTemplateId && selectedTemplateId !== 0},
            )}>
              <h3 className="text-md font-semibold">{strings.streamerForm.streamerOnlyOptions}</h3>

              <Alert>
                <RocketIcon className="h-4 w-4"/>
                <AlertTitle>{strings.streamerForm.alert}</AlertTitle>
                <AlertDescription>
                  {strings.streamerForm.alertOverrideDescription}
                </AlertDescription>
              </Alert>


              <Tabs defaultValue={isTemplate ? "default" : "platform"}>
                <TabsList className={clsx(
                    "grid w-auto h-auto grid-cols-1 ml-auto",
                    {"md:grid-cols-3": !isTemplate},
                    {"md:grid-cols-2": isTemplate}
                )}>
                  {!isTemplate && (
                      <TabsTrigger value="platform"
                                   className="text-zinc-600 dark:text-zinc-200">{strings.streamerForm.platformSpecificOptions}</TabsTrigger>
                  )}
                  <TabsTrigger value="default"
                               className="text-zinc-600 dark:text-zinc-200">{strings.streamerForm.defaultDownloadOptions}</TabsTrigger>
                  <TabsTrigger value="actions"
                               className="text-zinc-600 dark:text-zinc-200">{strings.streamerForm.callbackOptions}</TabsTrigger>
                </TabsList>

                <div>
                  {
                      !isTemplate && (
                          <>
                            <TabsContent value="platform">
                              {
                                  platform === PlatformType.HUYA && <HuyaPlatform allowNone={true} strings={strings.huyaStrings}/>
                              }
                              {
                                  platform === PlatformType.DOUYIN && (
                                      <DouyinPlatform douyinQualityOptions={strings.douyinQualityOptions} allowNone={true}
                                                      strings={strings.douyinStrings}/>)
                              }
                              {
                                  platform === PlatformType.DOUYU && (
                                      <DouyuPlatformForm strings={strings.douyuStrings} allowNone={true}
                                                         douyuQualityOptions={strings.douyuQualityOptions}/>)
                              }
                              {
                                  platform === PlatformType.TWITCH && (
                                      <TwitchPlatformForm strings={strings.twitchStrings} allowNone={true} qualities={strings.twitchQualityOptions}/>
                                  )
                              }
                              {
                                  platform === PlatformType.PANDATV && (
                                      <PandaTvPlatformForm strings={strings.pandaStrings} allowNone={true} qualities={strings.pandaQualityOptions}/>
                                  )
                              }
                            </TabsContent>
                          </>
                      )
                  }
                  <TabsContent value="default">
                    <BaseDownloadConfig allowNone={true} strings={strings.baseDownloadStrings}/>
                  </TabsContent>
                  <TabsContent value="actions">
                    <ActionsCallbackTab addItem={partedAppend} addItemEnded={streamEndedAppend}
                                        deleteItem={partedRemove}
                                        deleteItemEnded={streamEndedRemove} list={partedFields}
                                        endedList={streamEndedFields} updateItem={
                      (index, data) => {
                        partedUpdate(index, data)
                        toastData(strings.toast.submitMessage, data, "code")
                      }
                    } updateItemEnded={
                      (index, data) => {
                        streamEndedUpdate(index, data)
                        toastData(strings.toast.submitMessage, data, "code")
                      }
                    } strings={strings.actionTabStrings}/>
                  </TabsContent>
                </div>

              </Tabs>
            </div>

            <LoadingButton type="submit" loading={isSubmitting} disabled={!isValid}
                           className="flex h-12 w-full items-center justify-center rounded-lg p-3 text-sm font-medium">{strings.streamerForm.save}</LoadingButton>
          </form>
        </Form>
      </div>
  );
}