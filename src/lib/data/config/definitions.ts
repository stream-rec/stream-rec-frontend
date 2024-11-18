import {z} from "zod";
import {douyuGlobalConfig} from "@/src/lib/data/platform/douyu/definitions";
import {twitchGlobalConfig} from "@/src/lib/data/platform/twitch/definitions";
import {huyaGlobalConfig} from "@/src/lib/data/platform/huya/definitions";
import {douyinGlobalConfig} from "@/src/lib/data/platform/douyin/definitions";
import {pandaTvGlobalConfig} from "@/src/lib/data/platform/pandatv/definitions";
import {weiboGlobalConfig} from "@/src/lib/data/platform/weibo/definitions";

export const globalConfigSchema = z.object({
  id: z.number(),
  engine: z
      .string({
        required_error: "Please select a download engine.",
      }),
  danmu: z.boolean().default(true),
  deleteFilesAfterUpload: z.boolean().default(true),
  outputFolder: z
      .string({
        required_error: "Please enter a valid output folder.",
      }).optional(),
  outputFileName: z
      .string({
        required_error: "Please enter a valid output file name.",
      }).optional(),
  outputFileFormat: z
      .string({
        required_error: "Please select a output video extension.",
      }).optional(),
  minPartSize: z.number().nonnegative(),
  maxPartSize: z.number().nonnegative(),
  maxPartDuration: z.number().min(0).nullish(),
  maxConcurrentDownloads: z.number().min(1).optional(),
  maxConcurrentUploads: z.number().min(1).optional(),
  maxDownloadRetries: z.number().min(1).optional(),
  downloadRetryDelay: z.number().min(1).optional(),
  downloadCheckInterval: z.number().min(1).optional(),
  useBuiltInSegmenter: z.boolean().optional(),
  enableFlvFix: z.boolean().optional(),
  enableFlvDuplicateTagFiltering: z.boolean().optional(),
  combineTsFiles: z.boolean().optional(),
  exitDownloadOnError: z.boolean().optional(),
  huyaConfig: huyaGlobalConfig.optional(),
  douyinConfig: douyinGlobalConfig.optional(),
  douyuConfig: douyuGlobalConfig.optional(),
  twitchConfig: twitchGlobalConfig.optional(),
  pandaTvConfig: pandaTvGlobalConfig.optional(),
  weiboConfig: weiboGlobalConfig.optional(),
})

export type GlobalConfig = z.infer<typeof globalConfigSchema>