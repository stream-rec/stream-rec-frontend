'use client'
import {Form} from "@/components/new-york/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/new-york/ui/tabs";
import {Button} from "@/components/new-york/ui/button";
import {DouyinTabContent} from "@/app/dashboard/settings/platform/tabs/douyin-tab";
import {HuyaTabContent} from "@/app/dashboard/settings/platform/tabs/huya-tab";
import {useEffect, useState} from "react";
import {GlobalPlatformConfig} from "@/app/lib/data/platform/definitions";
import {huyaGlobalConfig} from "@/app/lib/data/platform/huya/definitions";
import {douyinGlobalConfig} from "@/app/lib/data/platform/douyin/definitions";
import {GlobalConfig} from "@/app/lib/data/config/definitions";
import {updateConfig} from "@/app/lib/data/config/apis";
import {toast} from "sonner";

export type PlatformFormValues = {
  defaultValues?: GlobalConfig
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

export default function PlatformForm({defaultValues}: PlatformFormValues) {

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
              <TabsTrigger value="huya" className="text-zinc-600 dark:text-zinc-200">Huya</TabsTrigger>
              <TabsTrigger value="douyin" className="text-zinc-600 dark:text-zinc-200">Douyin</TabsTrigger>
            </TabsList>

            <div>
              <TabsContent value="huya">
                <HuyaTabContent control={form.control} showCookies showMaxBitrate showPartedDownloadRetry/>
              </TabsContent>
              <TabsContent value="douyin">
                <DouyinTabContent control={form.control} showCookies showPartedDownloadRetry/>
              </TabsContent>
            </div>
          </Tabs>

          <Button type="submit">Update</Button>
        </form>
      </Form>
  );
}