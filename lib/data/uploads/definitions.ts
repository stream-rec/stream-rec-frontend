import {CheckIcon} from "@radix-ui/react-icons";
import {XIcon} from "lucide-react";

export type BaseUploadConfig = {
  platform: string;
}

export type RcloneUploadConfig = BaseUploadConfig & {
  platform: 'RCLONE';
  rcloneOperation: string;
  remotePath: string;
  args: string[];
}

export type NoopUploadConfig = BaseUploadConfig & {
  platform: 'NONE';
}

export type UploadData = {
  id: number;
  streamTitle: string;
  streamer: string;
  uploadTime: number;
  filePath: string;
  status: boolean;
  streamDataId: number;
  streamerId: string;
  uploadPlatform: string;
  uploadActionId: number;
  uploadConfig: RcloneUploadConfig | NoopUploadConfig;
}

export type UploadResult = {
  id: number;
  time: number;
  message: string;
  isSuccess: boolean;
}


export const dataStatues = [
  {
    label: 'success',
    value: "success",
    icon: CheckIcon
  },
  {
    label: 'failed',
    value: "failed",
    icon: XIcon
  }
]