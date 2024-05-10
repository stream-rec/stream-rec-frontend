import {z} from "zod";

export const globalPlatformConfig = z.object({
  partedDownloadRetry: z.number().min(0).nullish(),
})

export type GlobalPlatformConfig = z.infer<typeof globalPlatformConfig>


export enum PlatformType {
  HUYA = "huya",
  DOUYIN = "douyin",
  DOUYU = "douyu",
  TWITCH = "twitch",
  PANDALIVE = "pandalive",
  TEMPLATE = "template"
}