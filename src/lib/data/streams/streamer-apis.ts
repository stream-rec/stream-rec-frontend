'use server'
import {fetchApi} from "@/src/lib/data/api";
import {StreamerSchema, StreamerState} from "@/src/lib/data/streams/definitions";
import {fetchInfo, getHuyaId} from "@/src/lib/data/platform/huya/apis";
import {PlatformType} from "@/src/lib/data/platform/definitions";

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
    if (streamer.platform?.toLowerCase() === PlatformType.HUYA) {
      let urlId = getHuyaId(streamer.url)
      const {avatar, room} = await fetchInfo(urlId)
      streamer.avatar = avatar
      // replace url with room
      // streamer.url = streamer.url.replace(urlId, room)
    }
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

export const updateState = async (id: string, state: StreamerState) => {
  const response = await fetchApi(`/streamers/${id}?state=${state}`, {
    method: 'PUT',
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("Error updating streamer state, state: " + response.status + " " + errorText)
  }
  return await response.json() as {
    msg: string
    code: number
  }
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