"use client";

import {useFieldArray, useForm, useFormState} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/src/components/new-york/ui/form";
import {Input} from "@/src/components/new-york/ui/input";
import React, {useCallback, useEffect} from "react";
import {Button} from "@/src/components/new-york/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/src/components/new-york/ui/tabs";
import {clsx} from "clsx";
import {CaretSortIcon, CheckIcon, RocketIcon} from "@radix-ui/react-icons";
import {Alert, AlertDescription, AlertTitle,} from "@/src/components/new-york/ui/alert";
import {streamerSchema, StreamerSchema, StreamerState} from "@/src/lib/data/streams/definitions";
import {huyaDownloadConfig} from "@/src/lib/data/platform/huya/definitions";
import {douyinDownloadConfig} from "@/src/lib/data/platform/douyin/definitions";
import {platformRegexes, PlatformType} from "@/src/lib/data/platform/definitions";
import {Popover, PopoverContent, PopoverTrigger,} from "@/src/components/new-york/ui/popover";
import {cn} from "@/src/lib/utils";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem,} from "@/src/components/new-york/ui/command";
import {toastData} from "@/src/app/utils/toast";
import {ActionsCallbackTab, ActionsCallbackTabStrings,} from "@/src/app/[locale]/(feat)/streamers/components/actions/actions-callback-tab";
import {useRouter} from "@/src/i18n/routing";
import {BaseDownloadConfig} from "@/src/app/[locale]/(feat)/streamers/components/platforms/base-download-config";
import {BaseDownloadTabString} from "@/src/app/[locale]/(feat)/settings/platform/tabs/base-download-tab";
import {DouyinPlatform} from "@/src/app/[locale]/(feat)/streamers/components/platforms/douyin-platform";
import {HuyaPlatform} from "@/src/app/[locale]/(feat)/streamers/components/platforms/huya-platform";
import {LoadingButton} from "@/src/components/new-york/ui/loading-button";
import {DouyuPlatformForm} from "@/src/app/[locale]/(feat)/streamers/components/platforms/douyu-platform";
import {douyuDownloadConfig} from "@/src/lib/data/platform/douyu/definitions";
import {twitchDownloadConfig} from "@/src/lib/data/platform/twitch/definitions";
import {TwitchPlatformForm} from "@/src/app/[locale]/(feat)/streamers/components/platforms/twitch-platform";
import {pandaTvDownloadConfig} from "@/src/lib/data/platform/pandatv/definitions";
import {PandaTvPlatformForm} from "@/src/app/[locale]/(feat)/streamers/components/platforms/pandalive-platform";
import {FlagFormField} from "@/src/app/[locale]/(feat)/settings/components/form/flag-form-field";
import {TimePickerDemo} from "./timer-picker";
import {WeiboPlatformForm} from "@/src/app/[locale]/(feat)/streamers/components/platforms/weibo-platform";
import {WeiboTabString} from "@/src/app/hooks/translations/weibo-translations";
import {weiboDownloadConfig} from "@/src/lib/data/platform/weibo/definitions";
import {DouyinQuality, DouyinTabString} from "@/src/app/hooks/translations/douyin-translations";
import {HuyaTabString} from "@/src/app/hooks/translations/huya-translations";
import {DouyuQuality, DouyuTabString} from "@/src/app/hooks/translations/douyu-translations";
import {TwitchQualityItem, TwitchTabString} from "@/src/app/hooks/translations/twitch-translations";
import {PandaTvQualityItem, PandaTvTabString} from "@/src/app/hooks/translations/pandatv-translations";

type StreamerConfigProps = {
  strings: {
    toast: {
      submitErrorMessage: string;
      submitMessage: string;
    };
    streamerData: {
      name: string;
      url: string;
      template: string;
      startTime: string;
      endTime: string;
    };
    streamerForm: {
      nameDescription: string;
      urlDescription: string | React.ReactNode;
      enabledRecording: string;
      enabledRecordingDescription: string;
      templateSearch: string;
      noTemplate: string;
      templateDefault: string;
      templateDescription: string | React.ReactNode;
      doNotUseTemplate: string;
      asTemplate: string;
      asTemplateDescription: string;
      save: string;
      streamerOnlyOptions: string;
      alert: string;
      alertOverrideDescription: string;
      platformSpecificOptions: string;
      defaultDownloadOptions: string;
      callbackOptions: string;
    };
    huyaStrings: HuyaTabString;
    douyinStrings: DouyinTabString;
    douyinQualityOptions: DouyinQuality[];
    douyuStrings: DouyuTabString;
    douyuQualityOptions: DouyuQuality[];
    twitchStrings: TwitchTabString;
    twitchQualityOptions: TwitchQualityItem[];
    pandaStrings: PandaTvTabString;
    pandaQualityOptions: PandaTvQualityItem[];
    weiboStrings: WeiboTabString;
    baseDownloadStrings: BaseDownloadTabString;
    actionTabStrings: ActionsCallbackTabStrings;
  };
  defaultValues?: StreamerSchema;
  templateUsers: StreamerSchema[];
  onSubmit: (data: StreamerSchema) => Promise<StreamerSchema>;
};

export function StreamerForm({
                               strings,
                               defaultValues,
                               templateUsers,
                               onSubmit,
                             }: StreamerConfigProps) {
  const router = useRouter();

  const [platform, setPlatform] = React.useState(
      defaultValues?.platform || "invalid"
  );
  const [isTemplate, setIsTemplate] = React.useState(
      defaultValues?.isTemplate || false
  );

  const [startDate, setStartDate] = React.useState<Date>(createDateFromString(defaultValues?.startTime ?? "00:00:00"));
  const [endDate, setEndDate] = React.useState<Date>(createDateFromString(defaultValues?.endTime ?? "00:00:00"));


  function createDateFromString(dateString: string): Date {
    const [hours, minutes, seconds] = dateString.split(":").map((x) => parseInt(x));
    const date = new Date();
    date.setHours(hours, minutes, seconds);
    return date;
  }

  useEffect(() => {
    if (isTemplate && !defaultValues?.url) {
      form.setValue("url", "https://www.huya.com/" + Date.now());
      form.setValue("downloadConfig.type", PlatformType.TEMPLATE);
      setPlatform("UNKNOWN");
    } else {
      form.setValue("url", defaultValues?.url ?? "");
    }
  }, [isTemplate]);

  const platformStreamerSchema = useCallback(() => {
    const schemaMap: Record<PlatformType, any> = {
      [PlatformType.HUYA]: huyaDownloadConfig,
      [PlatformType.DOUYIN]: douyinDownloadConfig,
      [PlatformType.DOUYU]: douyuDownloadConfig,
      [PlatformType.TWITCH]: twitchDownloadConfig,
      [PlatformType.PANDATV]: pandaTvDownloadConfig,
      [PlatformType.WEIBO]: weiboDownloadConfig,
      [PlatformType.TEMPLATE]: streamerSchema.pick({downloadConfig: true}),
    };

    return platform in schemaMap
        ? streamerSchema.omit({downloadConfig: true}).extend({downloadConfig: schemaMap[platform as PlatformType]})
        : streamerSchema;
  }, [platform]);

  const form = useForm<StreamerSchema>({
    resolver: async (data, context, options) => {
      const schema = platformStreamerSchema();
      console.log("formData", data);
      console.log(
          "validation result",
          await zodResolver(schema)(data, context, options)
      );
      return zodResolver(schema)(data, context, options);
    },
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const {
    fields: partedFields,
    append: partedAppend,
    remove: partedRemove,
    update: partedUpdate,
  } = useFieldArray({
    control: form.control,
    name: "downloadConfig.onPartedDownload",
  });

  useEffect(() => {
    if (defaultValues && defaultValues.downloadConfig?.onPartedDownload) {
      partedRemove();
      defaultValues.downloadConfig?.onPartedDownload.forEach((item) => {
        console.log("appending parted action", item);
        partedAppend(item);
      });
    }
    if (defaultValues && defaultValues.downloadConfig?.onStreamingFinished) {
      streamEndedRemove();
      defaultValues.downloadConfig?.onStreamingFinished.forEach((item) => {
        console.log("appending end action", item);
        streamEndedAppend(item);
      });
    }
  }, []);

  const {
    fields: streamEndedFields,
    append: streamEndedAppend,
    remove: streamEndedRemove,
    update: streamEndedUpdate,
  } = useFieldArray({
    control: form.control,
    name: "downloadConfig.onStreamingFinished",
  });

  const {isSubmitting, isValid} = useFormState({control: form.control});

  async function onSubmitData(data: StreamerSchema) {
    try {
      let isCreated = !data.id;
      let submitData = {...data};
      submitData.platform = platform.toUpperCase();
      // if some of the times are set, set the other to 00:00:00
      if (submitData.startTime && !submitData.endTime) {
        submitData.endTime = "00:00:00";
      } else if (!submitData.startTime && submitData.endTime) {
        submitData.startTime = "00:00:00";
      } else if (!submitData.startTime && !submitData.endTime) {
        submitData.startTime = null
        submitData.endTime = null
      } else if (submitData.startTime === "00:00:00" && submitData.endTime === "00:00:00") {
        // remove start and end time if they are not set
        submitData.startTime = null
        submitData.endTime = null
      }
      await onSubmit(submitData);
      toastData(strings.toast.submitMessage, submitData, "code");
      if (isCreated) {
        router.push(`/streamers`);
      }
      router.refresh();
    } catch (e) {
      console.error(e);
      if (e instanceof Error) toastData("Error", (e as Error).message, "error");
    }
  }

  const selectedTemplateId = form.watch("templateId");

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
                        <Input {...field} />
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
                              <Input
                                  value={field.value}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    field.onChange(e);
                                    trySetPlatform(value);
                                  }}
                              />
                            </FormControl>
                            <FormDescription>
                              {strings.streamerForm.urlDescription}
                            </FormDescription>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />

                  <FlagFormField
                      control={form.control}
                      fieldName={"state"}
                      title={strings.streamerForm.enabledRecording}
                      description={strings.streamerForm.enabledRecordingDescription}
                      checked={state => state !== StreamerState.CANCELLED}
                      onChange={(value) => {
                        form.setValue("state", value ? StreamerState.NOT_LIVE : StreamerState.CANCELLED);
                      }}
                      ariaLabel={"Should record switch"}
                  />

                  <div className={"flex flex-col gap-y-2"}>
                    <FormLabel>{strings.streamerData.startTime}</FormLabel>
                    <TimePickerDemo
                        date={startDate}
                        setDate={(e) => {
                          console.log(e);
                          if (!e) {
                            form.setValue("startTime", null);
                            return;
                          }
                          setStartDate(e);
                          form.setValue(
                              "startTime",
                              `${e.getHours().toString().padStart(2, '0')}:${e.getMinutes().toString().padStart(2, '0')}:${e.getSeconds().toString().padStart(2, '0')}`
                          );
                        }}
                    />
                  </div>

                  <div className={"flex flex-col gap-y-2"}>
                    <FormLabel>{strings.streamerData.endTime}</FormLabel>
                    <TimePickerDemo
                        date={endDate}
                        setDate={(e) => {
                          console.log(e);
                          if (!e) {
                            form.setValue("endTime", null);
                            return;
                          }
                          setEndDate(e);
                          form.setValue(
                              "endTime",
                              `${e.getHours().toString().padStart(2, '0')}:${e.getMinutes().toString().padStart(2, '0')}:${e.getSeconds().toString().padStart(2, '0')}`
                          );
                        }}
                    />
                  </div>

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
                                      className={cn(
                                          "w-[200px] justify-between",
                                          !field.value &&
                                          field.value !== 0 &&
                                          "text-muted-foreground"
                                      )}
                                  >
                                    {field.value
                                        ? field.value === 0
                                            ? strings.streamerForm.templateDefault
                                            : templateUsers.find(
                                                (language) => language.id === field.value
                                            )?.name
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
                                  <CommandEmpty>
                                    {strings.streamerForm.noTemplate}
                                  </CommandEmpty>
                                  <CommandGroup>
                                    <CommandItem
                                        value={"0"}
                                        key={"No template"}
                                        onSelect={() => {
                                          form.setValue("templateId", 0);
                                        }}
                                    >
                                      {strings.streamerForm.doNotUseTemplate}
                                      <CheckIcon
                                          className={cn(
                                              "ml-auto h-4 w-4",
                                              field.value === 0
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                          )}
                                      />
                                    </CommandItem>
                                    {templateUsers.map((language) => (
                                        <CommandItem
                                            value={language.id?.toString()}
                                            key={language.name}
                                            onSelect={() => {
                                              form.setValue("templateId", language.id);
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
                              {strings.streamerForm.templateDescription}
                            </FormDescription>
                            <FormMessage/>
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
                    onChange={(value) => {
                      setIsTemplate(value);
                    }}
                />
            )}
            <div
                className={clsx("space-y-6", {
                  hidden:
                      platform === "invalid" ||
                      (selectedTemplateId && selectedTemplateId !== 0),
                })}
            >
              <h3 className="text-md font-semibold">
                {strings.streamerForm.streamerOnlyOptions}
              </h3>

              <Alert>
                <RocketIcon className="h-4 w-4"/>
                <AlertTitle>{strings.streamerForm.alert}</AlertTitle>
                <AlertDescription>
                  {strings.streamerForm.alertOverrideDescription}
                </AlertDescription>
              </Alert>

              <Tabs defaultValue={isTemplate ? "default" : "platform"}>
                <TabsList
                    className={clsx(
                        "grid w-auto h-auto grid-cols-1 ml-auto",
                        {"md:grid-cols-3": !isTemplate},
                        {"md:grid-cols-2": isTemplate}
                    )}
                >
                  {!isTemplate && (
                      <TabsTrigger
                          value="platform"
                          className="text-zinc-600 dark:text-zinc-200"
                      >
                        {strings.streamerForm.platformSpecificOptions}
                      </TabsTrigger>
                  )}
                  <TabsTrigger
                      value="default"
                      className="text-zinc-600 dark:text-zinc-200"
                  >
                    {strings.streamerForm.defaultDownloadOptions}
                  </TabsTrigger>
                  <TabsTrigger
                      value="actions"
                      className="text-zinc-600 dark:text-zinc-200"
                  >
                    {strings.streamerForm.callbackOptions}
                  </TabsTrigger>
                </TabsList>

                <div>
                  {!isTemplate && (
                      <>
                        <TabsContent value="platform">
                          {platform === PlatformType.HUYA && (
                              <HuyaPlatform
                                  allowNone={true}
                                  strings={strings.huyaStrings}
                              />
                          )}
                          {platform === PlatformType.DOUYIN && (
                              <DouyinPlatform
                                  douyinQualityOptions={strings.douyinQualityOptions}
                                  allowNone={true}
                                  strings={strings.douyinStrings}
                              />
                          )}
                          {platform === PlatformType.DOUYU && (
                              <DouyuPlatformForm
                                  strings={strings.douyuStrings}
                                  allowNone={true}
                                  douyuQualityOptions={strings.douyuQualityOptions}
                              />
                          )}
                          {platform === PlatformType.TWITCH && (
                              <TwitchPlatformForm
                                  strings={strings.twitchStrings}
                                  allowNone={true}
                                  qualities={strings.twitchQualityOptions}
                              />
                          )}
                          {platform === PlatformType.PANDATV && (
                              <PandaTvPlatformForm
                                  strings={strings.pandaStrings}
                                  allowNone={true}
                                  qualities={strings.pandaQualityOptions}
                              />
                          )}
                          {
                              platform == PlatformType.WEIBO && (
                                  <WeiboPlatformForm strings={strings.weiboStrings} allowNone={true}/>)

                          }
                        </TabsContent>
                      </>
                  )}
                  <TabsContent value="default">
                    <BaseDownloadConfig
                        allowNone={true}
                        strings={strings.baseDownloadStrings}
                    />
                  </TabsContent>
                  <TabsContent value="actions">
                    <ActionsCallbackTab
                        addItem={partedAppend}
                        addItemEnded={streamEndedAppend}
                        deleteItem={partedRemove}
                        deleteItemEnded={streamEndedRemove}
                        list={partedFields}
                        endedList={streamEndedFields}
                        updateItem={(index, data) => {
                          partedUpdate(index, data);
                          toastData(strings.toast.submitMessage, data, "code");
                        }}
                        updateItemEnded={(index, data) => {
                          streamEndedUpdate(index, data);
                          toastData(strings.toast.submitMessage, data, "code");
                        }}
                        strings={strings.actionTabStrings}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            <LoadingButton
                type="submit"
                loading={isSubmitting}
                disabled={!isValid}
                className="flex h-12 w-full items-center justify-center rounded-lg p-3 text-sm font-medium"
            >
              {strings.streamerForm.save}
            </LoadingButton>
          </form>
        </Form>
      </div>
  );
}
