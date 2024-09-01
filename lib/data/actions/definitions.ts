import {z} from "zod";

export enum ActionType {
  Command = "command",
  Rclone = "rclone",
  Remove = "remove",
  Move = "move",
  Copy = "copy"
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

export const removeActionSchema = baseActionSchema.extend({
  type: z.literal(ActionType.Remove),
})

export const moveActionSchema = baseActionSchema.extend({
  type: z.literal(ActionType.Move),
  destination: z.string().min(1),
})

export const copyActionSchema = baseActionSchema.extend({
  type: z.literal(ActionType.Copy),
  destination: z.string().min(1),
})

export type BaseActionSchema = z.infer<typeof baseActionSchema>
export type CommandActionSchema = z.infer<typeof commandActionSchema>
export type RcloneActionSchema = z.infer<typeof rcloneActionSchema>
export type RemoveActionSchema = z.infer<typeof removeActionSchema>
export type MoveActionSchema = z.infer<typeof moveActionSchema>
export type CopyActionSchema = z.infer<typeof copyActionSchema>
export type ActionSchema = CommandActionSchema | RcloneActionSchema | RemoveActionSchema | MoveActionSchema | CopyActionSchema