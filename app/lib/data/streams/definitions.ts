import {z} from "zod";
import {combinedRegex} from "@/app/lib/data/platform/definitions";
import {commandActionSchema, rcloneActionSchema} from "@/app/lib/data/actions/definitions";


export type StreamData = {
  id: number;
  title: string;
  dateStart: number;
  dateEnd: number;
  outputFilePath: string;
  danmuFilePath: string | undefined | null;
  streamerId: number;
  streamerName: string;
  status: boolean;
}

export const videoFormats = ["mp4", "avi", "mov", "mkv", "flv"] as const;


export const baseDownloadConfig = z.object({
  type: z.string().nullish(),
  cookies: z.string().nullish(),
  danmu: z.boolean().nullish(),
  maxBitrate: z.number().min(1000).nullish(),
  outputFolder: z.string().nullish(),
  outputFileName: z.string().nullish(),
  videoFormat: z.enum(videoFormats).nullish(),
  partedDownloadRetry: z.number().min(0).nullish(),
  onPartedDownload: rcloneActionSchema.or(commandActionSchema).array().nullish(),
  onStreamingFinished: rcloneActionSchema.or(commandActionSchema).array().nullish(),
})
export type DownloadConfig = z.infer<typeof baseDownloadConfig>


export const streamerSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  url: z.string({
    required_error: "Streamer url is required",
    invalid_type_error: "Only Huya and Douyin urls are supported",
  }).url().regex(RegExp(combinedRegex)).startsWith("https://").min(1),
  avatar: z.string().url().nullish(),
  description: z.string().nullish(),
  platform: z.string().optional(),
  isLive: z.boolean().nullish(),
  lastStream: z.number().nullish(),
  isActivated: z.boolean(),
  downloadConfig: baseDownloadConfig.nullish(),
});


export type StreamerSchema = z.infer<typeof streamerSchema>