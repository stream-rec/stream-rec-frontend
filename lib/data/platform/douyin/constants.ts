export const douyinRegex = "(?:https?://)?(?:www\\.)?live\\.douyin\\.com/([a-zA-Z0-9]+)"

export const douyinTTwidRegex = "ttwid=(.*?)(;|$)" as const
export const douyinMsTokenRegex = "msToken=(.*?)(;|$)" as const
export const douyinAcNonceRegex = "__ac_nonce=(.*?)(;|$)" as const
export const douyinAcSignatureRegex = "__ac_signature=(.*?)(;|$)" as const