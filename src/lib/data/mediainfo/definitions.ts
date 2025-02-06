import { z } from "zod"

export const streamInfoSchema = z.object({
	url: z.string(),
	format: z.string(),
	quality: z.string(),
	bitrate: z.number(),
	priority: z.number().optional(),
	frameRate: z.number().optional(),
	extras: z.record(z.string(), z.string()).optional(),
})

export const mediaInfoSchema = z.object({
	site: z.string(),
	title: z.string(),
	artist: z.string(),
	coverUrl: z.string().optional(),
	artistImageUrl: z.string().optional(),
	live: z.boolean().default(false),
	streams: z.array(streamInfoSchema).optional(),
})

export const extractorApiResponseSchema = z.object({
	code: z.number(),
	msg: z.string(),
	data: mediaInfoSchema,
	headers: z.string().optional(),
})

export type MediaInfo = z.infer<typeof mediaInfoSchema>

export type StreamInfo = z.infer<typeof streamInfoSchema>

export type ExtractorApiResponse = z.infer<typeof extractorApiResponseSchema>
