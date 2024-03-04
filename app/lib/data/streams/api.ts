import {fetchApi} from "@/app/lib/data/api";
import {StreamerSchema} from "@/app/lib/data/streams/definitions";

export const fetchStreamers = async (filter: string) => {

  const response = await fetchApi('/streamers?filter=' + filter)
  if (!response.ok) {
    throw new Error("Error fetching streamers, status: " + response.status + " " + response.statusText)
  }
  return await response.json() as StreamerSchema[]
}