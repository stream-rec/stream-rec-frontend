import {globalPlatformConfig} from "@/lib/data/platform/definitions";
import {z} from "zod";
import {baseDownloadConfig} from "@/lib/data/streams/definitions";

export enum PandaliveQuality {
  source = "best",
  p1080 = "1080p",
  p720 = "720p",
  p480 = "480p",
  p360 = "360p",
  p160 = "160p",
}

export const pandaliveGlobalConfig = globalPlatformConfig.extend({
  cookies: z.string().nullish(),
  quality: z.nativeEnum(PandaliveQuality).nullish(),
  partedDownloadRetry: z.number().min(0).nullish(),
})

export const pandaliveDownloadConfig = pandaliveGlobalConfig.merge(baseDownloadConfig)

export type PandaliveGlobalConfig = z.infer<typeof pandaliveGlobalConfig>
export type PandaliveDownloadConfig = z.infer<typeof pandaliveDownloadConfig>
