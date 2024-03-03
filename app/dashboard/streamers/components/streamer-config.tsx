'use client';

import {useFieldArray, useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Input} from "@/components/new-york/ui/input";
import React from "react";
import {Switch} from "@/components/new-york/ui/switch";
import {Button} from "@/components/new-york/ui/button";
import {HuyaTabContent} from "@/app/dashboard/settings/platform/tabs/huya-tab";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/new-york/ui/tabs";
import {clsx} from "clsx";
import {BaseDownloadTab} from "@/app/dashboard/settings/platform/tabs/base-download-tab";
import {useToast} from "@/components/new-york/ui/use-toast"
import {DouyinTabContent} from "@/app/dashboard/settings/platform/tabs/douyin-tab";
import {ActionsCallbackTab} from "@/app/dashboard/streamers/components/actions/actions-callback-tab";
import {RocketIcon} from "@radix-ui/react-icons";
import {Alert, AlertDescription, AlertTitle} from "@/components/new-york/ui/alert";
import {baseDownloadConfig, DownloadConfig, streamerSchema, StreamerSchema} from "@/app/lib/data/streams/definitions";
import {huyaDownloadConfig, HuyaGlobalConfig} from "@/app/lib/data/platform/huya/definitions";
import {douyinDownloadConfig} from "@/app/lib/data/platform/douyin/definitions";
import {combinedRegex} from "@/app/lib/data/platform/definitions";
import {CommandActionSchema, RcloneActionSchema} from "@/app/lib/data/actions/definitions";


type StreamerConfigProps = {
  defaultValues?: StreamerSchema
}

const defaultStreamerValues: StreamerSchema = {
  name: "",
  url: "",
  isActivated: true
}

export function StreamerConfig({defaultValues = defaultStreamerValues}: StreamerConfigProps) {

  const {toast} = useToast()

  const form = useForm<StreamerSchema>({
    resolver: zodResolver(streamerSchema),
    defaultValues: defaultValues,
    mode: "onChange"
  });

  const huyaForm = useForm<HuyaGlobalConfig>({
    resolver: zodResolver(huyaDownloadConfig),
    mode: "onChange"
  })

  const douyinForm = useForm<DownloadConfig>({
    resolver: zodResolver(douyinDownloadConfig),
    mode: "onChange"
  })

  const baseDownloadForm = useForm<DownloadConfig>({
    resolver: zodResolver(baseDownloadConfig),
    mode: "onChange"
  })

  const {fields: partedFields, append: partedAppend, remove: partedRemove, update: partedUpdate} = useFieldArray({
    control: baseDownloadForm.control,
    name: "onPartedDownload",
  })

  const {fields: streamEndedFields, append: streamEndedAppend, remove: streamEndedRemove, update: streamEndedUpdate} = useFieldArray({
    control: baseDownloadForm.control,
    name: "onStreamingFinished"
  })

  function toastData(data: CommandActionSchema | RcloneActionSchema) {
    toast(
        {
          title: "You updated the following values:",
          description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                                        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                                    </pre>
          ),
        }
    )
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

  async function handlePlatformConfig(data: StreamerSchema, platformForm: UseFormReturn, baseDownloadForm: UseFormReturn, platform: string) {

    let downloadConfig: DownloadConfig = {
      "type": platform,
    };

    downloadConfig = {...downloadConfig, ...baseDownloadForm.getValues()};

    let status: boolean = false;

    await platformForm.handleSubmit((platformData) => {
      console.log("platformData", platformData)
      let all = {...downloadConfig, ...platformData};
      console.log("all", all)
      let parse = getPlatformDownloadConfigSchema(platform).safeParse(all);

      if (!parse.success) {
        console.log("parse error");
        toast({
          title: "Error",
          description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(parse.error, null, 2)}</code>
                </pre>
          ),
        })
        status = false;
        return;
      }
      data.downloadConfig = parse.data;
      status = true;
    })();
    return status;
  }

  async function onSubmit(data: StreamerSchema) {
    let status = false;
    if (platform === "huya") {
      status = await handlePlatformConfig(data, huyaForm, baseDownloadForm, platform);
    } else if (platform === "douyin") {
      status = await handlePlatformConfig(data, douyinForm, baseDownloadForm, platform);
    }

    console.log("validation ", status)
    if (!status) {
      return;
    }

    toast({
      title: "You submitted the following values:",
      description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  const [platform, setPlatform] = React.useState(defaultValues.platform || "invalid")


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

  return (
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <FormField
                control={form.control}
                name="url"
                render={({field}) => (
                    <FormItem>
                      <FormLabel>Url</FormLabel>
                      <FormControl>
                        <Input value={field.value} onChange={
                          (e) => {
                            trySetPlatform(e.target.value)
                            field.onChange(e)
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

            <div className={clsx("space-y-6",
                {"hidden": platform === "invalid"}
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

              <Tabs defaultValue="platform">
                <TabsList className="grid w-full h-auto grid-cols-1 ml-auto md:grid-cols-3">
                  <TabsTrigger value="platform" className="text-zinc-600 dark:text-zinc-200">Platform specific</TabsTrigger>
                  <TabsTrigger value="default" className="text-zinc-600 dark:text-zinc-200">Default config</TabsTrigger>
                  <TabsTrigger value="actions" className="text-zinc-600 dark:text-zinc-200">Actions callbacks</TabsTrigger>
                </TabsList>

                <div>
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
                  <TabsContent value="default">
                    <Form {...baseDownloadForm}>
                      <BaseDownloadTab control={baseDownloadForm.control}/>
                    </Form>
                  </TabsContent>
                  <TabsContent value="actions">
                    <ActionsCallbackTab addItem={partedAppend} addItemEnded={streamEndedAppend} deleteItem={partedRemove}
                                        deleteItemEnded={streamEndedRemove} list={partedFields} endedList={streamEndedFields} updateItem={
                      (index, data) => {
                        partedUpdate(index, data)
                        toastData(data);
                      }
                    } updateItemEnded={
                      (index, data) => {
                        streamEndedUpdate(index, data)
                        toastData(data);
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