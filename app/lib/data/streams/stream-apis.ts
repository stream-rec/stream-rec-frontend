import {fetchApi} from "@/app/lib/data/api";
import {StreamData} from "@/app/lib/data/streams/definitions";

export const fetchStreams = async () => {
  const response = await fetchApi('/streams', {
    cache: 'no-cache'
  })
  if (!response.ok) {
    throw new Error("Error fetching streams, status: " + response.status + " " + response.statusText)
  }
  let json = await response.json() as StreamData[]
  return json.map(stream => {
    // Convert seconds to milliseconds
    stream.dateStart = stream.dateStart * 1000
    stream.dateEnd = stream.dateEnd * 1000
    return stream
  })
}

export const deleteStream = async (id: string) => {
  const response = await fetchApi('/streams/' + id, {
    cache: 'no-cache',
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error("Error deleting stream, status: " + response.status + " " + response.statusText)
  }
}