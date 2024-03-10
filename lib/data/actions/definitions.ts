import {z} from "zod";

export enum ActionType {
  Command = "command",
  Rclone = "rclone"
}


export const baseActionSchema = z.object({
  enabled: z.boolean(),
  type: z.nativeEnum(ActionType),
})


export const commandActionSchema = baseActionSchema.extend({
  type: z.literal(ActionType.Command),
  program: z.string({
    required_error: "Program is required",
    invalid_type_error: "Program must be a string"
  }).min(1),
  args: z.string().array().nullish(),
})

export const rcloneActionSchema = baseActionSchema.extend({
  type: z.literal(ActionType.Rclone),
  rcloneOperation: z.string().min(3),
  remotePath: z.string().min(1),
  args: z.string().array().nullish(),
})


export type BaseActionSchema = z.infer<typeof baseActionSchema>
export type CommandActionSchema = z.infer<typeof commandActionSchema>
export type RcloneActionSchema = z.infer<typeof rcloneActionSchema>
export type ActionSchema = CommandActionSchema | RcloneActionSchema