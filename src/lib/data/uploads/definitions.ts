import {z} from "zod";

export enum UploadPlatforms {
  RCLONE = 'RCLONE',
  NONE = 'NONE'
}


export type BaseUploadConfig = {
  platform: string;
}

export type RcloneUploadConfig = BaseUploadConfig & {
  platform: UploadPlatforms.RCLONE;
  rcloneOperation: string;
  remotePath: string;
  args: string[];
}

export type NoopUploadConfig = BaseUploadConfig & {
  platform: UploadPlatforms.NONE;
}


export type UploadData = {
  id: number;
  streamTitle: string;
  streamer: string;
  filePath: string;
  status: UploadStatus;
  streamDataId: number;
  streamerId: string;
  uploadPlatform: string;
  uploadActionId: number;
  uploadConfig: RcloneUploadConfig | NoopUploadConfig;
}

export type UploadResult = {
  id: number;
  startTime: number;
  endTime: number;
  message: string;
  isSuccess: boolean;
}

export enum UploadStatus {
  NOT_STARTED,
  UPLOADING,
  UPLOADED,
  FAILED,
  REUPLOADING
}

export const uploadSearchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  streamTitle: z.string().optional(),
  status: z.string().optional(),
  sort: z.string().optional(),
  order: z.string().optional(),
  streamer: z.string().optional(),
})

export type UploadSearchParams = z.infer<typeof uploadSearchParamsSchema>