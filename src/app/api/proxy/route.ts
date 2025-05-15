import { decodeParams, encodeParams } from "@/src/lib/utils/proxy"
import { getServerFile } from "@/src/lib/data/files/files-api"
import axios from "axios"

export const config = {
	api: {
		bodyParser: false,
		responseLimit: false,
	},
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const data = searchParams.get("data")

	if (!data) {
		return new Response("Missing data parameter", { status: 400 })
	}

	const decodedData = decodeParams(data)
	if (!decodedData) {
		return new Response("Invalid data parameter", { status: 400 })
	}

	const targetUrl = decodedData.url
	const { headers } = decodedData

	try {
		if (!targetUrl) {
			return new Response("Missing URL parameter", { status: 400 })
		}

		// Handle server files differently
		if (targetUrl.startsWith("/files/")) {
			const parts = targetUrl.split("/")
			const streamDataId = parts[2]
			const fileName = parts[3]

			const response = await getServerFile(streamDataId, fileName)

			return new Response(response.data, {
				headers: {
					...(response.headers as any),
				},
				status: response.status,
				statusText: response.statusText,
			})
		}

		// Handle external URLs
		const customHeaders = headers ? JSON.parse(decodeURIComponent(headers)) : {}

		// fetch client caches the response and makes memory increase indefinitely. I can't find a way to clear the cache.
		// so we use axios to get the stream and return it as a response
		const response = await axios.get(targetUrl, {
			headers: {
				Accept: "*/*",
				Connection: "keep-alive",
				...customHeaders,
			},
			responseType: "stream",
		})

		const contentType = response.headers["content-type"]

		// Check for HLS content (m3u8 files)
		if (contentType?.includes("mpegurl") || targetUrl.endsWith(".m3u8")) {
			// Convert stream to text for m3u8 files
			const chunks: Buffer[] = []
			for await (const chunk of response.data) {
				chunks.push(Buffer.from(chunk))
			}
			const text = Buffer.concat(chunks).toString("utf-8")

			// Parse the playlist and rewrite all URLs
			const baseUrl = new URL(targetUrl)
			const rewrittenText = text.split('\n').map(line => {
				// Skip comments and empty lines for URL replacement
				if (line.startsWith('#') || line.trim() === '') {
					return line
				}

				// Handle absolute and relative URLs
				let fullUrl = line
				if (!line.startsWith('http')) {
					// Handle different relative path formats
					if (line.startsWith('/')) {
						// Absolute path relative to origin
						fullUrl = `${baseUrl.origin}${line}`
					} else {
						// Relative path to current location
						// Remove filename from pathname to get directory
						const pathDir = baseUrl.pathname.substring(0, baseUrl.pathname.lastIndexOf('/') + 1)
						fullUrl = `${baseUrl.origin}${pathDir}${line}`
					}
				}

				return `/api/proxy?data=${encodeParams(fullUrl, customHeaders)}`
			}).join('\n')

			return new Response(rewrittenText, {
				headers: {
					"Content-Type": "application/vnd.apple.mpegurl",
					...(response.headers as any),
				},
				status: response.status,
				statusText: response.statusText,
			})
		}

		// For other responses, stream them directly
		const stream = new ReadableStream({
			async start(controller) {
				try {
					for await (const chunk of response.data) {
						controller.enqueue(chunk)
					}
					controller.close()
				} catch (error) {
					controller.error(error)
				}
			},
		})

		return new Response(stream, {
			headers: {
				...(response.headers as any),
			},
			status: response.status,
			statusText: response.statusText,
		})
	} catch (error: any) {
		console.error("Proxy Error:", error)
		return new Response("Proxy Error: " + (error.response?.data || error.message), {
			status: error.response?.status || 500,
		})
	}
}
