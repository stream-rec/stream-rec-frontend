import {globalPlatformConfig} from "@/lib/data/platform/definitions";
import {z} from "zod";
import {baseDownloadConfig} from "@/lib/data/streams/definitions";

export enum PandaTvQuality {
  source = "best",
  p1080 = "1080p",
  p720 = "720p",
  p480 = "480p",
  p360 = "360p",
  p160 = "160p",
}

export const pandatvGlobalConfig = globalPlatformConfig.extend({
  cookies: z.string().nullish(),
  quality: z.nativeEnum(PandaTvQuality).nullish(),
  partedDownloadRetry: z.number().min(0).nullish(),
})

export const pandatvDownloadConfig = pandatvGlobalConfig.merge(baseDownloadConfig)

export type PandaTvGlobalConfig = z.infer<typeof pandatvGlobalConfig>
export type PandaTvDownloadConfig = z.infer<typeof pandatvDownloadConfig>
