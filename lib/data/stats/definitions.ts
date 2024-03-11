import {z} from "zod";

export const statsSchema = z.object({
  timeStamp: z.number(),
  streams: z.number(),
  uploads: z.number(),
  failedUploads: z.number()
})

export const summarySchema = z.object({
  totalRecords: z.number(),
  previousRecords: z.number(),
  totalUploads: z.number(),
  previousUploads: z.number(),
  stats: z.array(statsSchema).optional(),
})

export type SummaryStats = z.infer<typeof summarySchema>

export type Stats = z.infer<typeof statsSchema>