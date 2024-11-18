import {z} from "zod";
import {huyaRegex} from "@/src/lib/data/platform/huya/constants";
import {douyinRegex} from "@/src/lib/data/platform/douyin/constants";
import {douyuRegex} from "@/src/lib/data/platform/douyu/constants";
import {twitchRegex} from "@/src/lib/data/platform/twitch/constants";
import {pandatvRegex} from "@/src/lib/data/platform/pandatv/constants";
import {weiboRegex} from "@/src/lib/data/platform/weibo/constants";

export const globalPlatformConfig = z.object({
  cookies: z.string().nullish(),
  partedDownloadRetry: z.number().min(0).nullish(),
  fetchDelay: z.number().min(0).nullish(),
  downloadCheckInterval: z.number().min(0).nullish(),
})

export type GlobalPlatformConfig = z.infer<typeof globalPlatformConfig>


export enum PlatformType {
  HUYA = "huya",
  DOUYIN = "douyin",
  DOUYU = "douyu",
  TWITCH = "twitch",
  PANDATV = "pandatv",
  WEIBO = "weibo",
  TEMPLATE = "template"
}

export const platformRegexes = [
  {platformType: PlatformType.HUYA, regex: huyaRegex},
  {platformType: PlatformType.DOUYIN, regex: douyinRegex},
  {platformType: PlatformType.DOUYU, regex: douyuRegex},
  {platformType: PlatformType.TWITCH, regex: twitchRegex},
  {platformType: PlatformType.PANDATV, regex: pandatvRegex},
  {platformType: PlatformType.WEIBO, regex: weiboRegex}
];
