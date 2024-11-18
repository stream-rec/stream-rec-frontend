import {z} from "zod";
import {baseDownloadConfig} from "@/src/lib/data/streams/definitions";
import {globalPlatformConfig} from "@/src/lib/data/platform/definitions";
import {douyinAcNonceRegex, douyinAcSignatureRegex} from "@/src/lib/data/platform/douyin/constants";


export enum DouyinQuality {
  origin = "origin",
  uhd = "uhd",
  hd = "hd",
  sd = "sd",
  ld = "ld",
  md = "md",
  ao = "ao"
}

export const douyinGlobalConfig = globalPlatformConfig.extend({
  cookies: z.string().refine((v) => {
    // check if it`s a valid cookie
    // a valid cookie must include `ac_nonce` and `__ac_signature`
    // /__ac_nonce=.*; __ac_signature=.*;/
    if (!v) return true
    const acNonce = v.match(douyinAcNonceRegex)
    const acSignature = v.match(douyinAcSignatureRegex)
    return acNonce && acSignature
  }).nullish(),
  quality: z.nativeEnum(DouyinQuality).nullish(),
  sourceFormat: z.enum(["flv", "hls"]).nullish(),
});

export const douyinDownloadConfig = baseDownloadConfig.merge(douyinGlobalConfig)

export type DouyinGlobalConfig = z.infer<typeof douyinGlobalConfig>
export type DouyinDownloadConfig = z.infer<typeof douyinDownloadConfig>

