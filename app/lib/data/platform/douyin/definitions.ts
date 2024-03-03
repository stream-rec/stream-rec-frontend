import {z} from "zod";
import {baseDownloadConfig} from "@/app/lib/data/streams/definitions";

const douyinRegex = "(?:https?://)?(?:www\\.)?(?:live\\.)?douyin\\.com/([a-zA-Z0-9]+)"

export enum DouyinQuality {
  origin = "origin",
  uhd = "uhd",
  hd = "hd",
  sd = "sd",
  ld = "ld",
  md = "md",
  ao = "ao"
}

export const douyinGlobalConfig = z.object({
  cookies: z.string().regex(/__ac_nonce=.*; __ac_signature=.*;/, {
    message: "Invalid cookies format"
  }).nullish(),
  quality: z.nativeEnum(DouyinQuality).nullish(),
  partedDownloadRetry: z.number().min(0).nullish(),
});

export const douyinDownloadConfig = baseDownloadConfig.merge(douyinGlobalConfig)

export type DouyinGlobalConfig = z.infer<typeof douyinGlobalConfig>
export type DouyinDownloadConfig = z.infer<typeof douyinDownloadConfig>

