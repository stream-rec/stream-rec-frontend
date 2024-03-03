import {z} from "zod";

export enum ActionType {
  Command = "command",
  Rclone = "rclone"
}


export const baseActionSchema = z.object({
  id: z.string().nullish(),
  enabled: z.boolean(),
  type: z.nativeEnum(ActionType),
})


export const commandActionSchema = baseActionSchema.extend({
  type: z.string({
    required_error: "Type is required",
    invalid_type_error: "Type must be a string"
  }),
  program: z.string({
    required_error: "Program is required",
    invalid_type_error: "Program must be a string"
  }).min(1),
  args: z.string().array().nullish(),
})

export const rcloneActionSchema = baseActionSchema.extend({
  type: z.string({
        required_error: "Type is required",
        invalid_type_error: "Type must be a string"
      }
  ),
  rcloneOperation: z.string().min(3),
  remote: z.string().min(1),
  args: z.string().array().nullish(),
})


export type BaseActionSchema = z.infer<typeof baseActionSchema>
export type CommandActionSchema = z.infer<typeof commandActionSchema>
export type RcloneActionSchema = z.infer<typeof rcloneActionSchema>
export type ActionSchema = CommandActionSchema | RcloneActionSchema