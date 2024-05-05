import {z} from "zod";
import {baseDownloadConfig} from "@/lib/data/streams/definitions";
import {globalPlatformConfig} from "@/lib/data/platform/definitions";
import {huyaCDNs} from "@/lib/data/platform/huya/constants";


export const huyaGlobalConfig = globalPlatformConfig.extend({
  primaryCdn: z.enum(huyaCDNs).nullish(),
  cookies: z.string().nullish(),
  maxBitRate: z.number().min(1000).nullish(),
  partedDownloadRetry: z.number().min(0).nullish(),
  sourceFormat: z.enum(["flv", "hls"]).nullish(),
})
export const huyaDownloadConfig = baseDownloadConfig.merge(huyaGlobalConfig)
export type HuyaGlobalConfig = z.infer<typeof huyaGlobalConfig>
export type HuyaDownloadConfig = z.infer<typeof huyaDownloadConfig>