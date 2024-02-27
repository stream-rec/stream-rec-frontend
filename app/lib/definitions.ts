import {CheckIcon} from "@radix-ui/react-icons";
import {XIcon} from "lucide-react";

export type UploadData = {
  id: number;
  streamTitle: string;
  streamer: string;
  time: number;
  filePath: string;
  status: boolean;
  streamDataId: string;
}

export const dataStatues = [
  {
    label: 'Success',
    value: "success",
    icon: CheckIcon
  },
  {
    label: 'Failed',
    value: "failed",
    icon: XIcon
  }
]

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