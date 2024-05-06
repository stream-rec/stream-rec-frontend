import {globalPlatformConfig} from "@/lib/data/platform/definitions";
import {z} from "zod";
import {baseDownloadConfig} from "@/lib/data/streams/definitions";

export enum TwitchQuality {
  source = "best",
  p1080 = "1080p",
  p720 = "720p",
  p480 = "480p",
  p360 = "360p",
  p160 = "160p",
  ao = "audio_only"
}

export const twitchGlobalConfig = globalPlatformConfig.extend({
  cookies: z.string().nullish(),
  quality: z.nativeEnum(TwitchQuality).nullish(),
  authToken: z.string().nullish(),
  partedDownloadRetry: z.number().min(0).nullish(),
})

export const twitchDownloadConfig = twitchGlobalConfig.merge(baseDownloadConfig)

export type TwitchGlobalConfig = z.infer<typeof twitchGlobalConfig>
export type TwitchDownloadConfig = z.infer<typeof twitchDownloadConfig>
