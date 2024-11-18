import {z} from "zod";
import {streamDataSchema} from "@/src/lib/data/streams/definitions";

const updateSchema = z.object({
  url: z.string(),
  platform: z.string(),
  duration: z.number(),
  speed: z.number(),
  bitrate: z.number(),
  fileSize: z.number(),
  streamerId: z.number()
})

export type UpdateSchema = z.infer<typeof updateSchema>

const streamerOnlineSchema = z.object({
  streamer: z.string(),
  streamerUrl: z.string(),
  streamerPlatform: z.string(),
  streamTitle: z.string(),
  time: z.number()
})

const streamerOfflineSchema = z.object({
  streamer: z.string(),
  streamerUrl: z.string(),
  streamerPlatform: z.string(),
  time: z.number(),
  data: streamDataSchema.array()
})

export type StreamerOnlineSchema = z.infer<typeof streamerOnlineSchema>