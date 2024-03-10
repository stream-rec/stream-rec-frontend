import {z} from "zod";
import {baseDownloadConfig} from "@/lib/data/streams/definitions";
import {globalPlatformConfig} from "@/lib/data/platform/definitions";

export const huyaCDNs = ["AL", "TX", "HW", "WS", "HS", "AL13", "HW16", "HY"] as const;

export const huyaRegex = "(?:https?://)?(?:(?:www|m)\\.)?huya\\.com/([a-zA-Z0-9]+)"
export const huyaAvatarRegex = new RegExp("avatar\"\\s*:\\s*\"([^\"]+)")
export const huyaBaseUrl = "https://www.huya.com/"

export const huyaGlobalConfig = globalPlatformConfig.extend({
  primaryCdn: z.enum(huyaCDNs).nullish(),
  cookies: z.string().nullish(),
  maxBitRate: z.number().min(1000).nullish(),
  partedDownloadRetry: z.number().min(0).nullish(),
})
export const huyaDownloadConfig = baseDownloadConfig.merge(huyaGlobalConfig)
export type HuyaGlobalConfig = z.infer<typeof huyaGlobalConfig>
export type HuyaDownloadConfig = z.infer<typeof huyaDownloadConfig>