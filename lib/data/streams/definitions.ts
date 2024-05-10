import {z} from "zod";
import {commandActionSchema, moveActionSchema, rcloneActionSchema, removeActionSchema} from "@/lib/data/actions/definitions";
import {twitchRegex} from "@/lib/data/platform/twitch/constants";
import {huyaRegex} from "@/lib/data/platform/huya/constants";
import {douyinRegex} from "@/lib/data/platform/douyin/constants";
import {douyuRegex} from "@/lib/data/platform/douyu/constants";
import {pandaliveRegex} from "@/lib/data/platform/pandalive/constants";

export const videoFormats = ["mp4", "avi", "mov", "mkv", "flv", "ts"] as const;

export const baseDownloadConfig = z.object({
  type: z.string().nullish(),
  cookies: z.string().nullish(),
  danmu: z.boolean().nullish(),
  maxBitRate: z.number().min(1000).nullish(),
  outputFolder: z.string().nullish(),
  outputFileName: z.string().nullish(),
  outputFileExtension: z.enum(videoFormats).nullish(),
  outputFileFormat: z.string().nullish(),
  onPartedDownload: rcloneActionSchema.or(commandActionSchema).or(removeActionSchema).or(moveActionSchema).array().nullish(),
  onStreamingFinished: rcloneActionSchema.or(commandActionSchema).or(removeActionSchema).or(moveActionSchema).array().nullish(),
})
export type DownloadConfig = z.infer<typeof baseDownloadConfig>

export const streamDataSchema = z.object({
  id: z.number(),
  title: z.string(),
  dateStart: z.number(),
  dateEnd: z.number(),
  outputFilePath: z.string(),
  danmuFilePath: z.string().nullish(),
  outputFileSize: z.number(),
  streamerId: z.number(),
  streamerName: z.string(),
})

export type StreamData = z.infer<typeof streamDataSchema>


export const streamerSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  url: z.string({
    required_error: "Streamer url is required",
    invalid_type_error: "Invalid url format",
  }).url().startsWith("https://").min(1).refine((url) => {
    const regexps = [
      huyaRegex,
      douyinRegex,
      douyuRegex,
      twitchRegex,
      pandaliveRegex,
    ];
    return regexps.some((regex) => new RegExp(regex).test(url));
  }, {
    message: "Invalid url format",
  }),
  avatar: z.string().url().nullish(),
  streamTitle: z.string().nullish(),
  platform: z.string().optional(),
  isLive: z.boolean().nullish(),
  lastLiveTime: z.number().nullish(),
  isActivated: z.boolean(),
  isTemplate: z.boolean(),
  templateId: z.number().optional(),
  downloadConfig: baseDownloadConfig.nullish(),
});


export type StreamerSchema = z.infer<typeof streamerSchema>

export const streamSearchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  title: z.string().optional(),
  sort: z.string().optional(),
  order: z.string().optional(),
  streamerName: z.string().optional(),
  dateStart: z.string().optional(),
  dateEnd: z.string().optional(),
})

export type StreamsSearchParams = z.infer<typeof streamSearchParamsSchema>