export const huyaCDNs = ["AL", "TX", "HW", "WS", "HS", "AL13", "HW16", "HY"] as const;

export const huyaProfileRoomRegex = new RegExp("profileRoom\"\\s*:\\s*(\\d+)")
export const huyaRegex = "(?:https?://)?(?:(?:www|m)\\.)?huya\\.com/([a-zA-Z0-9]+)"
export const huyaAvatarRegex = new RegExp("avatar\"\\s*:\\s*\"([^\"]+)")
export const huyaBaseUrl = "https://www.huya.com/"
