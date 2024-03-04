'use client'
import {Form} from "@/components/new-york/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/new-york/ui/tabs";
import {Button} from "@/components/new-york/ui/button";
import {DouyinTabContent} from "@/app/dashboard/settings/platform/tabs/douyin-tab";
import {HuyaTabContent} from "@/app/dashboard/settings/platform/tabs/huya-tab";
import {useState} from "react";
import {PlatformGlobalConfig} from "@/app/lib/data/platform/definitions";
import {huyaGlobalConfig} from "@/app/lib/data/platform/huya/definitions";
import {douyinGlobalConfig} from "@/app/lib/data/platform/douyin/definitions";
import {toastData} from "@/app/utils/toast";

export type PlatformFormValues = {
  defaultValues?: PlatformGlobalConfig
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

export default function PlatformForm(defaultValues: PlatformFormValues) {

  const {platform, handlePlatformChange, resolver} = useGlobalConfigResolver("huya")

  const form = useForm<PlatformGlobalConfig>({
    resolver: zodResolver(resolver),
    defaultValues: defaultValues.defaultValues ?? {},
    mode: "onChange",
  })

  function onSubmit(data: PlatformGlobalConfig) {
    toastData("You submitted the following values:", data);
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  min-h-svh">
          <Tabs defaultValue="huya" onValueChange={
            (value) => {
              handlePlatformChange(value as "huya" | "douyin")
              form.reset()
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