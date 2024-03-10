import {z} from "zod";

export const combinedRegex = "(?:https?://)?(?:(?:www|m)\\.)?(?:huya\\.com/([a-zA-Z0-9]+)|(?:live\\.)?douyin\\.com/([a-zA-Z0-9]+))"
export const globalPlatformConfig = z.object({
  partedDownloadRetry: z.number().min(0).nullish(),
})

export type GlobalPlatformConfig = z.infer<typeof globalPlatformConfig>