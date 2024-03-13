'use client';

import {useFieldArray, useForm, UseFormReturn, useFormState} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/new-york/ui/form";
import {Input} from "@/components/new-york/ui/input";
import React, {useEffect} from "react";
import {Switch} from "@/components/new-york/ui/switch";
import {Button} from "@/components/new-york/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/new-york/ui/tabs";
import {clsx} from "clsx";
import {CaretSortIcon, CheckIcon, RocketIcon} from "@radix-ui/react-icons";
import {Alert, AlertDescription, AlertTitle} from "@/components/new-york/ui/alert";
import {baseDownloadConfig, DownloadConfig, streamerSchema, StreamerSchema} from "@/lib/data/streams/definitions";
import {HuyaDownloadConfig, huyaDownloadConfig, HuyaGlobalConfig} from "@/lib/data/platform/huya/definitions";
import {DouyinDownloadConfig, douyinDownloadConfig} from "@/lib/data/platform/douyin/definitions";
import {combinedRegex} from "@/lib/data/platform/definitions";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/new-york/ui/popover";
import {cn} from "@/lib/utils";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/new-york/ui/command";
import {toastData} from "@/app/utils/toast";
import {DouyinTabContent} from "@/app/[locale]/dashboard/settings/platform/tabs/douyin-tab";
import {HuyaTabContent} from "@/app/[locale]/dashboard/settings/platform/tabs/huya-tab";
import {BaseDownloadTab} from "@/app/[locale]/dashboard/settings/platform/tabs/base-download-tab";
import {ActionsCallbackTab} from "@/app/[locale]/dashboard/streamers/components/actions/actions-callback-tab";
import {useRouter} from "@/i18n";
import {useTranslations} from "next-intl";


type StreamerConfigProps = {
  defaultValues?: StreamerSchema
  templateUsers: StreamerSchema[]
  onSubmit: (data: StreamerSchema) => Promise<StreamerSchema>
}

function getPlatformDownloadConfigSchema(platform: string) {
  if (platform === "huya") {
    return huyaDownloadConfig;
  } else if (platform === "douyin") {
    return douyinDownloadConfig;
  } else {
    return baseDownloadConfig;
  }
}

export function StreamerForm({defaultValues, templateUsers, onSubmit}: StreamerConfigProps) {

  const router = useRouter();

  const form = useForm<StreamerSchema>({
    resolver: async (data, context, options) => {
      console.log("formData", data)
      console.log(
          "validation result",
          await zodResolver(streamerSchema)(data, context, options)
      )
      return zodResolver(streamerSchema)(data, context, options)
    },
    defaultValues: defaultValues,
    mode: "onChange"
  });

  const huyaForm = useForm<HuyaGlobalConfig>({
    resolver: zodResolver(huyaDownloadConfig),
    defaultValues: defaultValues?.downloadConfig as HuyaDownloadConfig,
    mode: "onChange"
  })

  const douyinForm = useForm<DownloadConfig>({
    resolver: zodResolver(douyinDownloadConfig),
    defaultValues: defaultValues?.downloadConfig as DouyinDownloadConfig,
    mode: "onChange"
  })

  const baseDownloadForm = useForm<DownloadConfig>({
    resolver: zodResolver(baseDownloadConfig),
    defaultValues: defaultValues?.downloadConfig as DownloadConfig,
    mode: "onChange"
  })

  const {
    fields: partedFields,
    append: partedAppend,
    remove: partedRemove,
    update: partedUpdate
  } = useFieldArray({
    control: baseDownloadForm.control,
    name: "onPartedDownload",
  })

  useEffect(() => {
    console.log("retrieving defaultValues", defaultValues)
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
    control: baseDownloadForm.control,
    name: "onStreamingFinished"
  })

  const [isTemplate, setIsTemplate] = React.useState(defaultValues?.isTemplate || false)

  const toastT = useTranslations("Toast")
  const streamerT = useTranslations("StreamerData")
  const streamerF = useTranslations("StreamerForm")
  const baseT = useTranslations("BaseDownloadConfigs")

  const huyaS = useTranslations("Huya")
  const douyinS = useTranslations("Douyin")
  const douyinQualityStrings = useTranslations("DouyinQualities")
  const douyinQualityKeys = ['origin', 'uhd', 'hd', 'sd', 'ld', 'md', 'ao'] as const

  const douyinQualityOptions = douyinQualityKeys.map((key) => ({
    quality: douyinQualityStrings(`${key}.id`),
    description: douyinQualityStrings(`${key}.name`)
  }))

  const actionsT = useTranslations("CallbacksConfigs")

  const rcloneT = useTranslations("Rclone")
  const commandT = useTranslations("Command")
  const removeT = useTranslations("RemoveAction")
  const moveT = useTranslations("MoveAction")


  const {isSubmitting} = useFormState({control: form.control})

  async function handlePlatformConfig(data: StreamerSchema, baseDownloadForm: UseFormReturn, platform: string, platformForm?: UseFormReturn) {
    // upper case platform
    data.platform = platform.toUpperCase();
    let downloadConfig: DownloadConfig = {
      "type": platform,
    };

    const baseFormValues = await baseDownloadForm.handleSubmit((baseData) => {
      downloadConfig = {...downloadConfig, ...baseData};
    })();

    let status: boolean = false;

    if (platformForm === undefined) {
      let parse = getPlatformDownloadConfigSchema(platform).safeParse(downloadConfig);
      if (!parse.success) {
        toastData(toastT('submitErrorMessage'), JSON.stringify(parse.error, null, 2), "error")
        status = false;
        return false
      }
      data.platform = "UNKNOWN"
      data.downloadConfig = parse.data;
      status = true;
    } else {
      await platformForm.handleSubmit((platformData) => {
        console.log("platformData", platformData)
        let all = {...platformData, ...downloadConfig};
        console.log("all", all)
        let parse = getPlatformDownloadConfigSchema(platform).safeParse(all);

        if (!parse.success) {
          toastData(toastT('submitErrorMessage'), JSON.stringify(parse.error, null, 2), "error")
          status = false;
          return;
        }
        data.downloadConfig = parse.data;
        status = true;
      })();
    }
    return status;
  }

  async function onSubmitData(data: StreamerSchema) {
    let status = false;
    if (platform === "huya") {
      status = await handlePlatformConfig(data, baseDownloadForm, platform, huyaForm);
    } else if (platform === "douyin") {
      status = await handlePlatformConfig(data, baseDownloadForm, platform, douyinForm);
    } else if (platform === "template") {
      status = await handlePlatformConfig(data, baseDownloadForm, "template");
    }

    console.log("validation ", status)
    if (!status) {
      return;
    }

    try {
      let isCreated = !data.id;
      await onSubmit(data);
      toastData(toastT("submitMessage"), data, "code")
      router.refresh()
      if (isCreated) {
        router.push(`/dashboard/streamers`)
      }
    } catch (e) {
      console.error(e)
      if (e instanceof Error)
        toastData("Error", (e as Error).message, "error")
    }
  }

  const [platform, setPlatform] = React.useState(defaultValues?.platform || "invalid")

  const selectedTemplateId = form.watch("templateId")


  const trySetPlatform = (e: string) => {
    let match = e.match(combinedRegex);
    if (match !== null && match?.[1]) {
      setPlatform("huya");
      return true;
    } else if (match !== null && match?.[2]) {
      setPlatform("douyin");
      return true;
    } else {
      setPlatform("invalid");
      return false;
    }
  }

  useEffect(() => {
    if (isTemplate && !defaultValues?.url) {
      form.setValue("url", "https://www.huya.com/" + Date.now())
      setPlatform("template")
    } else {
      form.setValue("url", defaultValues?.url ?? "")
    }
  }, [isTemplate, form, setIsTemplate]);


  return (
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitData)} className="space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                    <FormItem>
                      <FormLabel>{streamerT("name")}</FormLabel>
                      <FormControl>
                        <Input {...field}/>
                      </FormControl>
                      <FormDescription>
                        {streamerF("nameDescription")}
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
                            <FormLabel>{streamerT("url")}</FormLabel>
                            <FormControl>
                              <Input value={field.value} onChange={
                                (e) => {
                                  let value = e.target.value;
                                  if (value !== platform) {
                                    console.log("setting platform", value)
                                    trySetPlatform(value)
                                    field.onChange(e)
                                  }
                                }
                              }/>
                            </FormControl>
                            <FormDescription>
                              {streamerF.rich("urlDescription", {
                                code: (chunks) => <><br/><code>{chunks}</code></>
                              })}
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
                              <FormLabel>{streamerF("enabledRecording")}</FormLabel>
                              <FormDescription>
                                {streamerF("enabledRecordingDescription")}
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
                            <FormLabel>{streamerT("template")}</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn("w-[200px] justify-between", !field.value && field.value !== -1 && "text-muted-foreground")}
                                  >
                                    {field.value ? field.value === -1 ? streamerF("templateDefault") : templateUsers.find((language) => language.id === field.value)?.name : streamerT("templateDefault")}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput
                                      placeholder={streamerF("templateSearch")}
                                      className="h-9"
                                  />
                                  <CommandEmpty>{streamerF("noTemplate")}</CommandEmpty>
                                  <CommandGroup>
                                    <CommandItem value={"-1"} key={"No template"} onSelect={() => {
                                      form.setValue("templateId", -1)
                                    }}>
                                      {streamerF("doNotUseTemplate")}
                                      <CheckIcon
                                          className={cn("ml-auto h-4 w-4", field.value === -1 ? "opacity-100" : "opacity-0")}
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
                                              className={cn(
                                                  "ml-auto h-4 w-4",
                                                  language.id === field.value
                                                      ? "opacity-100"
                                                      : "opacity-0"
                                              )}
                                          />
                                        </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              {streamerF.rich("templateDescription", {
                                important: (chunks) => <><br/><strong>{chunks}</strong></>
                              })}
                            </FormDescription>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />
                </>
            )}

            {
                selectedTemplateId && selectedTemplateId < 0 && (
                    <FormField
                        control={form.control}
                        name="isTemplate"
                        render={({field}) => (
                            <FormItem
                                className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>{streamerF("asTemplate")}</FormLabel>
                                <FormDescription>
                                  {streamerF("asTemplateDescription")}
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
                {"hidden": platform === "invalid"},
                {"hidden": selectedTemplateId && selectedTemplateId !== -1},
            )}>
              <h3 className="text-md font-semibold">{streamerF("streamerOnlyOptions")}</h3>

              <Alert>
                <RocketIcon className="h-4 w-4"/>
                <AlertTitle>{streamerF("alert")}</AlertTitle>
                <AlertDescription>
                  {streamerF("alertOverrideDescription")}
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
                                   className="text-zinc-600 dark:text-zinc-200">{streamerF("platformSpecificOptions")}</TabsTrigger>
                  )}
                  <TabsTrigger value="default"
                               className="text-zinc-600 dark:text-zinc-200">{streamerF("defaultDownloadOptions")}</TabsTrigger>
                  <TabsTrigger value="actions"
                               className="text-zinc-600 dark:text-zinc-200">{streamerF("callbackOptions")}</TabsTrigger>
                </TabsList>

                <div>
                  {
                      !isTemplate && (
                          <>
                            <TabsContent value="platform">
                              {
                                  platform === "huya" && <Form  {...huyaForm}>
                                      <HuyaTabContent control={huyaForm.control} huyaStrings={{
                                        platform: huyaS("platform"),
                                        cdn: huyaS("cdn"),
                                        cdnDescription: huyaS("cdnDescription"),
                                        cdnDefault: huyaS("cdnDefault"),
                                        bitrate: huyaS("bitrate"),
                                        bitrateDescription: huyaS("bitrateDescription"),
                                        part: huyaS("part"),
                                        partDescription: huyaS.rich("partDescription"),
                                        cookieString: huyaS("cookieString"),
                                        cookieDescription: huyaS.rich("cookieDescription"),
                                      }}/>
                                  </Form>
                              }
                              {
                                  platform === "douyin" && <Form  {...douyinForm}>
                                      <DouyinTabContent control={douyinForm.control} douyinStrings={{
                                        platform: douyinS("platform"),
                                        quality: douyinS("quality"),
                                        qualityDescription: douyinS("qualityDescription"),
                                        qualityDefault: douyinS("qualityDefault"),
                                        part: douyinS("part"),
                                        partDescription: douyinS.rich("partDescription"),
                                        cookies: douyinS("cookieString"),
                                        cookiesDescription: douyinS.rich("cookiesDescription"),
                                      }} qualityOptions={douyinQualityOptions}/>
                                  </Form>
                              }
                            </TabsContent>
                          </>
                      )
                  }
                  <TabsContent value="default">
                    <Form {...baseDownloadForm}>
                      <BaseDownloadTab control={baseDownloadForm.control} strings={{
                        danmu: baseT("danmu"),
                        danmuDescription: baseT("danmuDescription"),
                        cookies: baseT("cookieString"),
                        cookiesDescription: baseT("cookiesDescription"),
                        maxBitrate: baseT("maxBitrate"),
                        maxBitrateDescription: baseT("maxBitrateDescription"),
                        outputFolder: baseT("outputFolder"),
                        outputFolderDescription: baseT.rich("outputFolderDescription", {
                          code: (chunks) => <><br/><code>{chunks}</code></>
                        }),
                        outputFilename: baseT("outputFilename"),
                        outputFilenameDescription: baseT.rich("outputFilenameDescription", {
                          important: (chunks) => <><strong>{chunks}</strong></>
                        }),
                        outputFileFormat: baseT("outputFormat"),
                        outputFileFormatDescription: baseT.rich("outputFormatDescription", {
                          important: (chunks) => <><strong>{chunks}</strong></>
                        }),
                      }}/>
                    </Form>
                  </TabsContent>
                  <TabsContent value="actions">
                    <ActionsCallbackTab addItem={partedAppend} addItemEnded={streamEndedAppend}
                                        deleteItem={partedRemove}
                                        deleteItemEnded={streamEndedRemove} list={partedFields}
                                        endedList={streamEndedFields} updateItem={
                      (index, data) => {
                        partedUpdate(index, data)
                        toastData(toastT("submitMessage"), data, "code")
                      }
                    } updateItemEnded={
                      (index, data) => {
                        streamEndedUpdate(index, data)
                        toastData(toastT("submitMessage"), data, "code")
                      }
                    } strings={
                      {
                        alert: actionsT("alert"),
                        alertDescription: actionsT("alertDescription"),
                        onPartedDownload: actionsT("onPartedDownload"),
                        onPartedDownloadDescription: actionsT.rich("onPartedDownloadDescription", {
                          important: (chunks) => <><br/><strong>{chunks}</strong></>

                        }),
                        onStreamEnded: actionsT("onStreamEnded"),
                        onStreamEndedDescription: actionsT.rich("onStreamEndedDescription", {
                          important: (chunks) => <><br/><strong>{chunks}</strong></>
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
                            remotePathDescription: rcloneT("remoteDescription"),
                            arguments: rcloneT("args"),
                            argumentsDescription: rcloneT("argsDescription"),
                          },
                          removeStrings: {
                            title: removeT("title")
                          },
                          moveStrings: {
                            title: moveT("title"),
                            destination: moveT("destination"),
                            destinationDefault: moveT("destinationDefault"),
                            destinationDescription: moveT("destinationDescription")
                          }
                        }
                      }
                    }/>
                  </TabsContent>
                </div>

              </Tabs>
            </div>

            <Button type="submit" aria-disabled={isSubmitting}
                    className="flex h-12 w-full items-center justify-center rounded-lg p-3 text-sm font-medium">{streamerF("save")}</Button>
          </form>
        </Form>
      </div>
  );
}