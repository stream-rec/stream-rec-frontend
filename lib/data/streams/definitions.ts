import {z} from "zod";
import {combinedRegex} from "@/lib/data/platform/definitions";
import {commandActionSchema, rcloneActionSchema} from "@/lib/data/actions/definitions";

export const videoFormats = ["mp4", "avi", "mov", "mkv", "flv"] as const;

export const baseDownloadConfig = z.object({
  type: z.string().nullish(),
  cookies: z.string().nullish(),
  danmu: z.boolean().nullish(),
  maxBitRate: z.number().min(1000).nullish(),
  outputFolder: z.string().nullish(),
  outputFileName: z.string().nullish(),
  outputFileExtension: z.enum(videoFormats).nullish(),
  onPartedDownload: rcloneActionSchema.or(commandActionSchema).array().nullish(),
  onStreamingFinished: rcloneActionSchema.or(commandActionSchema).array().nullish(),
})
export type DownloadConfig = z.infer<typeof baseDownloadConfig>


export type StreamData = {
  id: number;
  title: string;
  dateStart: number;
  dateEnd: number;
  outputFilePath: string;
  danmuFilePath: string | undefined | null;
  streamerId: number;
  streamerName: string;
}


export const streamerSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  url: z.string({
    required_error: "Streamer url is required",
    invalid_type_error: "Only Huya and Douyin urls are supported",
  }).url().regex(RegExp(combinedRegex)).startsWith("https://").min(1),
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