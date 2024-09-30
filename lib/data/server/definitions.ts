import {z} from "zod";

export const serverConfig = z.object({
  osName: z.string(),
  osVersion: z.string(),
  osArch: z.string(),
  javaVersion: z.string(),
  javaVendor: z.string(),
  docker: z.boolean(),
  versionName: z.string(),
  versionCode: z.number(),
  commitHash: z.string(),
})

export type ServerConfig = z.infer<typeof serverConfig>


export const MIN_SERVER_VERSION = process.env.MIN_SERVER_VERSION