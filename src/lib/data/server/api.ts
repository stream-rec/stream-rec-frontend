import {fetchApi} from "@/src/lib/data/api";
import {ServerConfig} from "@/src/lib/data/server/definitions";

export const fetchServerConfig = async () => {
  const response = await fetchApi(`/server`, {
    next: {
      tags: ['server']
    }
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("Error fetching server, status: " + response.status + " " + errorText)
  }
  return await response.json() as ServerConfig
}