'use client'
import {Form} from "@/components/new-york/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/new-york/ui/tabs";
import {Button} from "@/components/new-york/ui/button";
import {useEffect, useState} from "react";
import {GlobalPlatformConfig} from "@/lib/data/platform/definitions";
import {huyaGlobalConfig} from "@/lib/data/platform/huya/definitions";
import {douyinGlobalConfig} from "@/lib/data/platform/douyin/definitions";
import {GlobalConfig} from "@/lib/data/config/definitions";
import {updateConfig} from "@/lib/data/config/apis";
import {toast} from "sonner";
import {HuyaTabContent, HuyaTabString} from "@/app/[locale]/dashboard/settings/platform/tabs/huya-tab";
import {DouyinQuality, DouyinTabContent, DouyinTabString} from "@/app/[locale]/dashboard/settings/platform/tabs/douyin-tab";


export type PlatformFormValues = {
  defaultValues?: GlobalConfig,
  save: string,
  huyaStrings: HuyaTabString
  douyinStrings: DouyinTabString
  douyinQualityOptions: DouyinQuality[]
}

function useGlobalConfigResolver(initial: "huya" | "douyin") {
  const [platform, setPlatform] = useState(initial)

  function handlePlatformChange(platform: "huya" | "douyin") {
    setPlatform(platform)
  }

  return {
    platform,
    handlePlatformChange,
    resolver: platform == "huya" ? huyaGlobalConfig : douyinGlobalConfig
  }
}

export default function PlatformForm({defaultValues, save, huyaStrings, douyinStrings, douyinQualityOptions}: PlatformFormValues) {

  const {platform, handlePlatformChange, resolver} = useGlobalConfigResolver("huya")

  const [defaultPlatformConfig, setDefaultPlatformConfig] = useState<GlobalConfig | undefined>(defaultValues)

  const form = useForm<GlobalPlatformConfig>({
    resolver: zodResolver(resolver),
    defaultValues: defaultPlatformConfig?.huyaConfig,
    mode: "onChange",
  })

  useEffect(() => {
    form.reset(platform == "huya" ? defaultPlatformConfig?.huyaConfig : defaultPlatformConfig?.douyinConfig)
  }, [setDefaultPlatformConfig])

  async function onSubmit(data: GlobalPlatformConfig) {
    const config = {
      ...defaultValues,
      huyaConfig: platform == "huya" ? data : defaultPlatformConfig?.huyaConfig,
      douyinConfig: platform == "douyin" ? data : defaultPlatformConfig?.douyinConfig
    } as GlobalConfig
    setDefaultPlatformConfig(config)
    toast.promise(updateConfig(config), {
      loading: "Updating config...",
      success: () => "Config updated",
      error: (error) => toast.error(error.message)
    })
  }


  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="huya" onValueChange={
            (value) => {
              handlePlatformChange(value as "huya" | "douyin")
              form.reset(value == "huya" ? defaultPlatformConfig?.huyaConfig : defaultPlatformConfig?.douyinConfig)
            }
          }>
            <TabsList className="ml-auto">
              <TabsTrigger value="huya" className="text-zinc-600 dark:text-zinc-200">{huyaStrings.platform}</TabsTrigger>
              <TabsTrigger value="douyin" className="text-zinc-600 dark:text-zinc-200">{douyinStrings.platform}</TabsTrigger>
            </TabsList>

            <div>
              <TabsContent value="huya">
                <HuyaTabContent control={form.control} showCookies showMaxBitrate showPartedDownloadRetry huyaStrings={huyaStrings}/>
              </TabsContent>
              <TabsContent value="douyin">

                <DouyinTabContent control={form.control} showCookies showPartedDownloadRetry douyinStrings={douyinStrings}
                                  qualityOptions={douyinQualityOptions}/>
              </TabsContent>
            </div>
          </Tabs>

          <Button type="submit">{save}</Button>
        </form>
      </Form>
  );
}