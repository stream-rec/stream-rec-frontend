import {huyaAvatarRegex, huyaBaseUrl, huyaProfileRoomRegex, huyaRegex} from "@/src/lib/data/platform/huya/constants";

export async function fetchInfo(id: string) {

  const respose = await fetch(huyaBaseUrl + id, {
    cache: 'no-cache',
    headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
      "Origin": huyaBaseUrl,
      "Referer": huyaBaseUrl,
    }
  })
  if (!respose.ok) {
    throw new Error("Error fetching avatar, status: " + respose.status + " " + respose.statusText)
  }
  let text = await respose.text()
  let match = text.match(huyaAvatarRegex)
  if (!match) {
    throw new Error("Error parsing avatar")
  }
  let roomMatch = text.match(huyaProfileRoomRegex)
  if (!roomMatch) {
    throw new Error("Error parsing room")
  }
  return {
    avatar: match[1],
    room: roomMatch[1]
  }
}

export const getHuyaId = (url: string) => {
  let match = url.match(huyaRegex)
  if (!match) {
    throw new Error("Invalid huya url")
  }
  return match[1]
}