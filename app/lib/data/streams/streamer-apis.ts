'use server'
import {fetchApi} from "@/app/lib/data/api";
import {StreamerSchema} from "@/app/lib/data/streams/definitions";
import {fetchAvatar, getHuyaId} from "@/app/lib/data/platform/huya/apis";
import {revalidateTag} from "next/cache";

export const fetchStreamers = async (filter: string) => {
  const response = await fetchApi('/streamers?filter=' + filter, {
    next: {
      tags: ['streamers'],
      revalidate: 60
    }
  })
  if (!response.ok) {
    throw new Error("Error fetching streamers, status: " + response.status + " " + response.statusText)
  }
  return await response.json() as StreamerSchema[]
}

export const fetchStreamer = async (id: string) => {
  const response = await fetchApi('/streamers/' + id, {
    cache: 'no-cache'
  })
  if (!response.ok) {
    throw new Error("Error fetching streamer, status: " + response.status + " " + response.statusText)
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
    throw new Error("Error posting streamer, status: " + response.status + " " + response.statusText)
  }
  let json = await response.json() as StreamerSchema
  revalidateTag('streamers')
  return json
}

export const updateStreamer = async (streamer: StreamerSchema) => {
  const response = await fetchApi('/streamers/' + streamer.id, {
    method: 'PUT',
    body: JSON.stringify(streamer)
  })
  if (!response.ok) {
    throw new Error("Error updating streamer, status: " + response.status + " " + response.statusText)
  }
  let json = await response.json() as StreamerSchema
  revalidateTag('streamers')
  return json
}

export const deleteStreamer = async (id: string | number) => {
  const response = await fetchApi('/streamers/' + id, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error("Error deleting streamer, status: " + response.status + " " + response.statusText)
  }
  revalidateTag('streamers')
}