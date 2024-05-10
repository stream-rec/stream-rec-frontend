import {z} from "zod";
import {douyuGlobalConfig} from "@/lib/data/platform/douyu/definitions";
import {twitchGlobalConfig} from "@/lib/data/platform/twitch/definitions";
import {huyaGlobalConfig} from "@/lib/data/platform/huya/definitions";
import {douyinGlobalConfig} from "@/lib/data/platform/douyin/definitions";
import {pandaliveGlobalConfig} from "@/lib/data/platform/pandalive/definitions";

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
  minPartSize: z.number().positive(),
  maxPartSize: z.number().positive(),
  maxPartDuration: z.number().min(0).nullish(),
  maxConcurrentDownloads: z.number().min(1).optional(),
  maxConcurrentUploads: z.number().min(1).optional(),
  maxDownloadRetries: z.number().min(1).optional(),
  downloadRetryDelay: z.number().min(1).optional(),
  downloadCheckInterval: z.number().min(30).optional(),
  huyaConfig: huyaGlobalConfig.optional(),
  douyinConfig: douyinGlobalConfig.optional(),
  douyuConfig: douyuGlobalConfig.optional(),
  twitchConfig: twitchGlobalConfig.optional(),
  pandaliveConfig: pandaliveGlobalConfig.optional(),
})

export type GlobalConfig = z.infer<typeof globalConfigSchema>