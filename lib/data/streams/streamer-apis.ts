'use server'
import {fetchApi} from "@/lib/data/api";
import {StreamerSchema} from "@/lib/data/streams/definitions";
import {fetchAvatar, getHuyaId} from "@/lib/data/platform/huya/apis";

export const fetchStreamers = async (filter: string) => {
  const response = await fetchApi('/streamers?filter=' + filter, {
    cache: 'no-cache'
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("Error fetching streamers, status: " + response.status + " " + errorText)
  }
  let streamer = await response.json() as StreamerSchema[]
  return streamer.map(s => {
    // Lowercase platform
    s.platform = s.platform?.toLowerCase()
    return s
  })
}

export const fetchStreamer = async (id: string) => {
  const response = await fetchApi('/streamers/' + id, {
    cache: 'no-cache'
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("Error fetching streamer, status: " + response.status + " " + errorText)
  }
  let json = await response.json() as StreamerSchema
  // Lowercase platform
  json.platform = json.platform?.toLowerCase()
  return json
}

export const createStreamer = async (streamer: StreamerSchema) => {
  if (!streamer.avatar || streamer.avatar !== "") {
    if (streamer.platform?.toLowerCase() === "huya") {
      let urlId = getHuyaId(streamer.url)
      await fetchAvatar(urlId).then(avatar => {
        streamer.avatar = avatar
      }).catch(e => {
        console.error("Error fetching avatar: " + e)
      })
    }
    // TODO: fetch douyin avatar
  }

  const response = await fetchApi('/streamers', {
    method: 'POST',
    body: JSON.stringify(streamer)
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("Error posting streamer, status: " + response.status + " " + errorText)
  }
  let json = await response.json() as StreamerSchema
  return json
}

export const updateStreamer = async (streamer: StreamerSchema) => {
  const response = await fetchApi('/streamers/' + streamer.id, {
    method: 'PUT',
    body: JSON.stringify(streamer)
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("Error updating streamer, status: " + response.status + " " + errorText)
  }
  let json = await response.json() as StreamerSchema
  return json
}

export const deleteStreamer = async (id: string | number) => {
  const response = await fetchApi('/streamers/' + id, {
    method: 'DELETE',
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("Error deleting streamer, status: " + response.status + " " + errorText)
  }
}