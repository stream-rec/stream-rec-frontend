import {globalPlatformConfig} from "@/src/lib/data/platform/definitions";
import {z} from "zod";
import {baseDownloadConfig} from "@/src/lib/data/streams/definitions";

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
  quality: z.nativeEnum(TwitchQuality).nullish(),
  authToken: z.string().nullish(),
  skipAds: z.boolean().nullish(),
  twitchProxyPlaylist: z.string().nullish(),
  twitchProxyPlaylistExclude: z.string().nullish(),
  twitchProxyPlaylistFallback: z.boolean().optional()
})

export const twitchDownloadConfig = twitchGlobalConfig.omit({skipAds: true}).merge(baseDownloadConfig)

export type TwitchGlobalConfig = z.infer<typeof twitchGlobalConfig>
export type TwitchDownloadConfig = z.infer<typeof twitchDownloadConfig>
