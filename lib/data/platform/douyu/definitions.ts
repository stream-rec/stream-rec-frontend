import {globalPlatformConfig} from "@/lib/data/platform/definitions";
import {z} from "zod";
import {baseDownloadConfig} from "@/lib/data/streams/definitions";

export const douyuRegex = "^https:\\/\\/www\\.douyu\\.com.*"
export const douyuCdns = ["ws-h5", "tctc-h5", "tct-h5", "ali-h5", "hw-h5", "akm-h5"] as const

export enum DouyuQuality {
  origin = 0,
  uhd_8m = 8,
  uhd = 4,
  hd = 3,
  sd = 2,
  ld = 1,
}

export const douyuGlobalConfig = globalPlatformConfig.extend({
  cdn: z.string().nullish(),
  quality: z.nativeEnum(DouyuQuality).nullish(),
})

export const douyuDownloadConfig = douyuGlobalConfig.merge(baseDownloadConfig)

export type DouyuGlobalConfig = z.infer<typeof douyuGlobalConfig>
export type DouyuDownloadConfig = z.infer<typeof douyuDownloadConfig>