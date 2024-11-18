import {z} from "zod";
import {commandActionSchema, copyActionSchema, moveActionSchema, rcloneActionSchema, removeActionSchema} from "@/src/lib/data/actions/definitions";
import {twitchRegex} from "@/src/lib/data/platform/twitch/constants";
import {huyaRegex} from "@/src/lib/data/platform/huya/constants";
import {douyinRegex} from "@/src/lib/data/platform/douyin/constants";
import {douyuRegex} from "@/src/lib/data/platform/douyu/constants";
import {pandatvRegex} from "@/src/lib/data/platform/pandatv/constants";
import {weiboRegex} from "@/src/lib/data/platform/weibo/constants";

export const videoFormats = ["mp4", "avi", "mov", "mkv", "flv", "ts"] as const;

const actionSchema = rcloneActionSchema.or(commandActionSchema).or(removeActionSchema).or(moveActionSchema).or(copyActionSchema);

export const baseDownloadConfig = z.object({
  type: z.string().nullish(),
  cookies: z.string().nullish(),
  danmu: z.boolean().nullish(),
  maxBitRate: z.number().min(1000).nullish(),
  outputFolder: z.string().nullish(),
  outputFileName: z.string().nullish(),
  outputFileExtension: z.enum(videoFormats).nullish(),
  outputFileFormat: z.string().nullish(),
  onPartedDownload: actionSchema.array().nullish(),
  onStreamingFinished: actionSchema.array().nullish(),
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


export enum StreamerState {
  NOT_LIVE = 0,
  LIVE = 1,
  OUT_OF_SCHEDULE = 2,
  INSPECTING_LIVE = 3,
  FATAL_ERROR = 4,
  CANCELLED = 5,
  NOT_FOUND = 6,
  UNKNOWN = 99,
}

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
      pandatvRegex,
      weiboRegex,
    ];
    return regexps.some((regex) => new RegExp(regex).test(url));
  }, {
    message: "Invalid url format",
  }),
  avatar: z.string().url().nullish(),
  streamTitle: z.string().nullish(),
  platform: z.string().optional(),
  state: z.nativeEnum(StreamerState),
  lastLiveTime: z.number().nullish(),
  isTemplate: z.boolean(),
  startTime: z.string().max(8).nullish(),
  endTime: z.string().max(8).nullish(),
  templateId: z.number().min(0).optional(),
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