import {z} from "zod";
import {baseDownloadConfig} from "@/src/lib/data/streams/definitions";
import {globalPlatformConfig} from "@/src/lib/data/platform/definitions";


export const weiboGlobalConfig = globalPlatformConfig.extend({
  sourceFormat: z.enum(["flv", "hls"]).nullish(),
});

export const weiboDownloadConfig = baseDownloadConfig.merge(weiboGlobalConfig)

export type WeiboGlobalConfig = z.infer<typeof weiboGlobalConfig>
export type WeiboDownloadConfig = z.infer<typeof weiboDownloadConfig>

