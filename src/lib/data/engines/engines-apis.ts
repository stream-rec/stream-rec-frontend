"use server"

import { fetchApi } from "../api"
import { downloadEngineSchema, DownloadEngineSchema } from "./definitions"

export const fetchEngineConfig = async (globalId: number, engineName: string) => {
	const response = await fetchApi(`/${globalId}/engines/${engineName}`)
	if (!response.ok) {
		const errorText = await response.text()
		throw new Error("Error fetching engine config, status: " + response.status + " " + errorText)
	}
	const json = await response.json()
	// validate json as DownloadEngineSchema
	downloadEngineSchema.parse(json)
	return json
}

export const updateEngineConfig = async (globalId: number, engineName: string, config: DownloadEngineSchema) => {
	const response = await fetchApi(`/${globalId}/engines/${engineName}`, {
		method: "PUT",
		body: JSON.stringify(config),
	})
	if (!response.ok) {
		const errorText = await response.text()
		throw new Error("Error updating engine config, status: " + response.status + " " + errorText)
	}

	return config
}
