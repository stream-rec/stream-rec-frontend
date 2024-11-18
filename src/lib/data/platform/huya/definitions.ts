import {z} from "zod";
import {baseDownloadConfig} from "@/src/lib/data/streams/definitions";
import {globalPlatformConfig} from "@/src/lib/data/platform/definitions";
import {huyaCDNs} from "@/src/lib/data/platform/huya/constants";


export const huyaGlobalConfig = globalPlatformConfig.extend({
  primaryCdn: z.enum(huyaCDNs).nullish(),
  maxBitRate: z.number().min(1000).nullish(),
  sourceFormat: z.enum(["flv", "hls"]).nullish(),
  forceOrigin: z.boolean().nullish(),
  useMobileApi: z.boolean().nullish(),
})
export const huyaDownloadConfig = baseDownloadConfig.merge(huyaGlobalConfig).omit({forceOrigin: true, useMobileApi: true})
export type HuyaGlobalConfig = z.infer<typeof huyaGlobalConfig>
export type HuyaDownloadConfig = z.infer<typeof huyaDownloadConfig>