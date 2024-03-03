import {HuyaGlobalConfig} from "@/app/lib/data/platform/huya/definitions";
import {DouyinGlobalConfig} from "@/app/lib/data/platform/douyin/definitions";

export const combinedRegex = "(?:https?://)?(?:(?:www|m)\\.)?(?:huya\\.com/([a-zA-Z0-9]+)|(?:live\\.)?douyin\\.com/([a-zA-Z0-9]+))"
export type PlatformGlobalConfig = HuyaGlobalConfig | DouyinGlobalConfig
