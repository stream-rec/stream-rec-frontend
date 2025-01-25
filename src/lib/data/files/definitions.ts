import { z } from "zod"


const serverFileInfo = z.object({
    name: z.string(),
    size: z.number(),
    contentType: z.string(),
    exists: z.boolean(),
    hash: z.string(),
    type: z.enum(["video", "danmu"]),
})


export const fileResponse = z.object({
    id: z.string(),
    files: z.array(serverFileInfo),
})  

export type ServerFileInfo = z.infer<typeof serverFileInfo>
export type ServerFileResponse = z.infer<typeof fileResponse>
