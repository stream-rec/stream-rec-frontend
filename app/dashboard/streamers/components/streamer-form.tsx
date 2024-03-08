'use client';

import {useFieldArray, useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Input} from "@/components/new-york/ui/input";
import React, {useEffect} from "react";
import {Switch} from "@/components/new-york/ui/switch";
import {Button} from "@/components/new-york/ui/button";
import {HuyaTabContent} from "@/app/dashboard/settings/platform/tabs/huya-tab";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/new-york/ui/tabs";
import {clsx} from "clsx";
import {BaseDownloadTab} from "@/app/dashboard/settings/platform/tabs/base-download-tab";
import {DouyinTabContent} from "@/app/dashboard/settings/platform/tabs/douyin-tab";
import {ActionsCallbackTab} from "@/app/dashboard/streamers/components/actions/actions-callback-tab";
import {CaretSortIcon, CheckIcon, RocketIcon} from "@radix-ui/react-icons";
import {Alert, AlertDescription, AlertTitle} from "@/components/new-york/ui/alert";
import {baseDownloadConfig, DownloadConfig, streamerSchema, StreamerSchema} from "@/app/lib/data/streams/definitions";
import {HuyaDownloadConfig, huyaDownloadConfig, HuyaGlobalConfig} from "@/app/lib/data/platform/huya/definitions";
import {DouyinDownloadConfig, douyinDownloadConfig} from "@/app/lib/data/platform/douyin/definitions";
import {combinedRegex} from "@/app/lib/data/platform/definitions";
import {toastData} from "@/app/utils/toast";
import {useRouter} from "next/navigation";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/new-york/ui/popover";
import {cn} from "@/lib/utils";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/new-york/ui/command";


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
        toastData("Error", JSON.stringify(parse.error, null, 2), "error")
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
          toastData("Error", JSON.stringify(parse.error, null, 2), "error")
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
      toastData("You submitted the following values:", data, "code")
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
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field}/>
                      </FormControl>
                      <FormDescription>
                        Name of the streamer
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
                            <FormLabel>Url</FormLabel>
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
                              Url of the streamer. Supported platforms: Huya, Douyin.
                              <br/>
                              <code>{`https://www.huya.com/{name}`}</code> - Huya url
                              <br/>
                              <code>{`https://live.douyin.com/{id}`}</code> - Douyin url
                              <br/>
                            </FormDescription>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />

                  <FormField
                      control={form.control}
                      name="isActivated"
                      render={({field}) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Record flag</FormLabel>
                              <FormDescription>
                                Enable or disable auto recording
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
                            <FormLabel>Template</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn("w-[200px] justify-between", !field.value && field.value !== -1 && "text-muted-foreground")}
                                  >
                                    {field.value ? field.value === -1 ? "Select template" : templateUsers.find((language) => language.id === field.value)?.name : "Select template"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput
                                      placeholder="Search template..."
                                      className="h-9"
                                  />
                                  <CommandEmpty>No template found.</CommandEmpty>
                                  <CommandGroup>
                                    <CommandItem value={"-1"} key={"No template"} onSelect={() => {
                                      form.setValue("templateId", -1)
                                    }}>
                                      {"Don't use template"}
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
                              This streamer will use the selected template configurations
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
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>Template flag</FormLabel>
                                <FormDescription>
                                  Whether to use this streamer as a template
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
              <h3 className="text-md font-semibold">Streamer only configuration</h3>

              <Alert>
                <RocketIcon className="h-4 w-4"/>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  Below configs overrides global configurations. Each field default value is null by
                  default.
                </AlertDescription>
              </Alert>


              <Tabs defaultValue={isTemplate ? "default" : "platform"}>
                <TabsList className={clsx(
                    "grid w-auto h-auto grid-cols-1 ml-auto",
                    {"md:grid-cols-3": !isTemplate},
                    {"md:grid-cols-2": isTemplate}
                )}>
                  {!isTemplate && (
                      <TabsTrigger value="platform" className="text-zinc-600 dark:text-zinc-200">Platform specific</TabsTrigger>
                  )}
                  <TabsTrigger value="default" className="text-zinc-600 dark:text-zinc-200">Default config</TabsTrigger>
                  <TabsTrigger value="actions" className="text-zinc-600 dark:text-zinc-200">Actions callbacks</TabsTrigger>
                </TabsList>

                <div>
                  {
                      !isTemplate && (
                          <>
                            <TabsContent value="platform">
                              {
                                  platform === "huya" && <Form  {...huyaForm}>
                                      <HuyaTabContent control={huyaForm.control}/>
                                  </Form>
                              }
                              {
                                  platform === "douyin" && <Form  {...douyinForm}>
                                      <DouyinTabContent control={douyinForm.control}/>
                                  </Form>
                              }
                            </TabsContent>
                          </>
                      )
                  }
                  <TabsContent value="default">
                    <Form {...baseDownloadForm}>
                      <BaseDownloadTab control={baseDownloadForm.control}/>
                    </Form>
                  </TabsContent>
                  <TabsContent value="actions">
                    <ActionsCallbackTab addItem={partedAppend} addItemEnded={streamEndedAppend}
                                        deleteItem={partedRemove}
                                        deleteItemEnded={streamEndedRemove} list={partedFields}
                                        endedList={streamEndedFields} updateItem={
                      (index, data) => {
                        partedUpdate(index, data)
                        toastData("You updated the following values:", data, "code")
                      }
                    } updateItemEnded={
                      (index, data) => {
                        streamEndedUpdate(index, data)
                        toastData("You updated the following values:", data, "code")
                      }
                    }/>
                  </TabsContent>
                </div>

              </Tabs>
            </div>

            <Button type="submit"
                    className="flex h-12 w-full items-center justify-center rounded-lg p-3 text-sm font-medium"> Save </Button>
          </form>
        </Form>
      </div>
  );
}