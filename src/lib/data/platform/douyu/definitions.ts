import {z} from "zod";
import {baseDownloadConfig} from "@/src/lib/data/streams/definitions";
import {globalPlatformConfig} from "@/src/lib/data/platform/definitions";

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