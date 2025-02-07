"use server"
import { fetchApi } from "../api"
import { extractorApiResponseSchema, StreamInfo, streamInfoSchema } from "./definitions"

export const extractMediaInfo = async (url: string, params: Record<string, string> = {}) => {
	// Construct URL with params
	let apiUrl = `/extract?url=${url}`

	if (params && Object.keys(params).length > 0) {
		const queryString = new URLSearchParams(params).toString()
		apiUrl += `&${queryString}`
	}

	const response = await fetchApi(apiUrl, {
		cache: "no-cache",
	})

	if (!response.ok) {
		const errorText = await response.text()
		throw new Error("Error extracting media info, status: " + response.status + " " + errorText)
	}

	const data = await response.json()

	console.log(data)

	if (data.code !== 200) {
		throw new Error(data.msg)
	}

	extractorApiResponseSchema.parse(data)
	// parse headers
	const headers = data.headers ? JSON.parse(data.headers) : {}

	return {
		...data,
		headers: headers,
	}
}

export const getTrueUrl = async (url: string, data: StreamInfo) => {
	const response = await fetchApi(`/extract/getTrueUrl`, {
		method: "POST",
		body: JSON.stringify({
			url,
			data,
		}),
	})

	if (!response.ok) {
		throw new Error("Error getting true url, status: " + response.status + " " + response.text())
	}

	const responseData = await response.json()
	// console.log("responseData", responseData)

	if (responseData.code !== 200) {
		throw new Error(responseData.msg)
	}

	streamInfoSchema.parse(responseData.data)
	// console.log(responseData.data)

	return responseData.data
}
