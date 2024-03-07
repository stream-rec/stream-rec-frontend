'use server'
import {fetchApi} from "@/app/lib/data/api";
import {GlobalConfig} from "@/app/lib/data/config/definitions";
import {revalidateTag} from "next/cache";

export const fetchConfig = async () => {
  const response = await fetchApi(`/config`, {
    next: {
      tags: ['config']
    }
  })
  if (!response.ok) {
    throw new Error("Error fetching config, status: " + response.status + " " + response.statusText)
  }
  return await response.json() as GlobalConfig
}

export const updateConfig = async (config: GlobalConfig) => {
  const response = await fetchApi('/config', {
    method: 'PUT',
    body: JSON.stringify(config)
  })
  if (!response.ok) {
    throw new Error("Error updating config, status: " + response.status + " " + response.statusText)
  }
  revalidateTag('config')
}