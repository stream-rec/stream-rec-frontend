import { z } from "zod"

export const downloadEngineSchema = z.object({
	id: z.number().optional(),
	type: z.string(),
})

export const ffmpegConfigSchema = downloadEngineSchema.extend({
	type: z.literal("ffmpeg"),
	useBuiltInSegmenter: z.boolean().default(false),
	exitDownloadOnError: z.boolean().default(false),
})

export const streamlinkConfigSchema = downloadEngineSchema.extend({
	type: z.literal("streamlink"),
	useBuiltInSegmenter: z.boolean().default(false),
	exitDownloadOnError: z.boolean().default(false),
})

export const kotlinConfigSchema = downloadEngineSchema.extend({
	type: z.literal("kotlin"),
	enableFlvFix: z.boolean().default(false),
	enableFlvDuplicateTagFiltering: z.boolean().default(false),
	combineTsFiles: z.boolean().default(false),
})

export type FfmpegConfig = z.infer<typeof ffmpegConfigSchema>
export type StreamlinkConfig = z.infer<typeof streamlinkConfigSchema>
export type KotlinConfig = z.infer<typeof kotlinConfigSchema>

export const engineConfigSchema = z.discriminatedUnion("type", [
	ffmpegConfigSchema,
	streamlinkConfigSchema,
	kotlinConfigSchema,
])

export type DownloadEngineSchema = z.infer<typeof engineConfigSchema>
