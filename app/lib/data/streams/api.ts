import {fetchApi} from "@/app/lib/data/api";
import {StreamerSchema} from "@/app/lib/data/streams/definitions";

export const fetchStreamers = async (filter: string) => {
  const response = await fetchApi('/streamers?filter=' + filter)
  if (!response.ok) {
    throw new Error("Error fetching streamers, status: " + response.status + " " + response.statusText)
  }
  return await response.json() as StreamerSchema[]
}

export const createStreamer = async (streamer: StreamerSchema) => {
  console.log("trying to create streamer : ", streamer)
  const response = await fetchApi('/streamers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(streamer)
  })
  if (!response.ok) {
    throw new Error("Error posting streamer, status: " + response.status + " " + response.statusText)
  }
  return await response.json() as StreamerSchema
}

export const updateStreamer = async (streamer: StreamerSchema) => {
  const response = await fetchApi('/streamers/' + streamer.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(streamer)
  })
  if (!response.ok) {
    throw new Error("Error updating streamer, status: " + response.status + " " + response.statusText)
  }
  return await response.json() as StreamerSchema
}

export const deleteStreamer = async (id : number) =>{
  const response = await fetchApi('/streamers/' + id, {
    method: 'DELETE',
  })
  if (!response.ok){
    throw new Error("Error deleting streamer, status: " + response.status + " " + response.statusText)
  }
}