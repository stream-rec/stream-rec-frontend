import {Button} from "@/components/new-york/ui/button"
import {useFieldArray, useForm} from "react-hook-form";
import {ActionSchema, ActionType, commandActionSchema, rcloneActionSchema} from "@/lib/data/actions/definitions";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import React from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/new-york/ui/select";
import {Switch} from "@/components/new-york/ui/switch";
import {Input} from "@/components/new-york/ui/input";
import {cn} from "@/lib/utils";
import {XIcon} from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/new-york/ui/alert-dialog";

type NewActionDialogProps = {
  strings: NewActionDialogStrings
  openIcon?: React.ReactNode
  onSave: (data: ActionSchema) => void
  defaultValues?: ActionSchema
}
export type NewActionDialogStrings = {
  title: string,
  description: string
  actionType: string,
  actionSelectPlaceholder: string,
  actionTypeDescription: string,
  state: string,
  stateDescription: string,
  cancel: string,
  save: string,

  commandStrings: {
    title: string,
    program: string,
    programDescription: string
    arguments: string,
    argumentsDescription: string
    addArgument: string
    removeArgument: string
  },

  rcloneStrings: {
    title: string,
    operation: string,
    operationDescription: string,
    remotePath: string,
    remotePathDescription: string
    arguments: string,
    argumentsDescription: string
  }
}

const defaultAction: ActionSchema = {
  type: ActionType.Command,
  enabled: true,
  args: [],
  program: ""
}

function useActionResolver(initial: ActionType.Command | ActionType.Rclone) {
  const [type, setType] = React.useState(initial)

  function handleTypeChange(e: ActionType.Command | ActionType.Rclone) {
    console.log("setting type", e)
    setType(e)
  }

  return {
    type,
    handleTypeChange,
    resolver: type === "command" ? commandActionSchema : rcloneActionSchema
  }
}


export function NewActionDialog({strings, openIcon, defaultValues = defaultAction, onSave}: NewActionDialogProps) {

  const [open, setOpen] = React.useState(false)

  const {type, handleTypeChange, resolver} = useActionResolver(ActionType.Command)

  const form = useForm<ActionSchema>({
    resolver: async (data, context, options) => {
      console.log("formData", data)
      console.log(
          "validation result",
          await zodResolver(resolver)(data, context, options)
      )
      return zodResolver(resolver)(data, context, options)
    },
    defaultValues: defaultValues,
    mode: "onChange"
  });

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "args",
  })


  function onSubmit(data: ActionSchema) {
    onSave(data)
    setOpen(false)
  }

  return (
      <AlertDialog open={open} onOpenChange={
        (e) => {
          if (!e) {
            console.log("resetting form")
            form.reset()
            remove()
            // setType("command")
          } else {
            console.log("setting default values")
            form.reset(defaultValues)
            handleTypeChange(defaultValues?.type as ActionType.Command | ActionType.Rclone ?? ActionType.Command)
          }
          setOpen(e)
        }
      }>
        <AlertDialogTrigger asChild>
          <Button onClick={() => open ? setOpen(false) : setOpen(true)} variant="outline">{openIcon ?? strings.title}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>{strings.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {strings.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={event => {
              event.preventDefault()
              form.handleSubmit(onSubmit)()
              event.stopPropagation()
            }} className="space-y-6">
              <FormField control={form.control} name={"type"} render={({field}) => (
                  <FormItem>
                    <FormLabel>{strings.actionType}</FormLabel>
                    <Select onValueChange={e => {
                      field.onChange(e)
                      handleTypeChange(e as ActionType.Command | ActionType.Rclone)
                    }} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={strings.actionSelectPlaceholder}/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="command">{strings.commandStrings.title}</SelectItem>
                        <SelectItem value="rclone">{strings.rcloneStrings.title}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {strings.actionTypeDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}>
              </FormField>

              <FormField
                  control={form.control}
                  name="enabled"
                  render={({field}) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>{strings.state}</FormLabel>
                          <FormDescription>
                            {strings.stateDescription}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              arial-label="State switch"
                          />
                        </FormControl>
                      </FormItem>
                  )}
              />

              {
                  type === "command" && (
                      <FormField
                          control={form.control}
                          name="program"
                          render={({field}) => (
                              <FormItem>
                                <FormLabel>{strings.commandStrings.program}</FormLabel>
                                <FormControl>
                                  <Input placeholder={"sh"} {...field}/>
                                </FormControl>
                                <FormDescription>
                                  {strings.commandStrings.programDescription}
                                </FormDescription>
                                <FormMessage/>
                              </FormItem>
                          )}
                      />
                  )
              }
              {
                  type === "rclone" && (
                      <FormField
                          control={form.control}
                          name="rcloneOperation"
                          render={({field}) => (
                              <FormItem>
                                <FormLabel>{strings.rcloneStrings.operation}</FormLabel>
                                <FormControl>
                                  <Input placeholder={"copy"} {...field}/>
                                </FormControl>
                                <FormDescription>
                                  {strings.rcloneStrings.operationDescription}
                                </FormDescription>
                                <FormMessage/>
                              </FormItem>
                          )}
                      />
                  )
              }
              {
                  type === "rclone" && (
                      <FormField
                          control={form.control}
                          name="remotePath"
                          render={({field}) => (
                              <FormItem>
                                <FormLabel>{strings.rcloneStrings.remotePath}</FormLabel>
                                <FormControl>
                                  <Input placeholder={"myremote:"} {...field}/>
                                </FormControl>
                                <FormDescription>
                                  {strings.rcloneStrings.operationDescription}
                                </FormDescription>
                                <FormMessage/>
                              </FormItem>
                          )}
                      />
                  )
              }
              <>
                {
                    fields.length > 0 && (
                        fields.map((field, index) => (
                            <FormField
                                control={form.control}
                                key={field.id}
                                name={`args.${index}`}
                                render={({field}) => (
                                    <FormItem>
                                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                                        {strings.rcloneStrings.arguments}
                                      </FormLabel>
                                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                                        {strings.rcloneStrings.argumentsDescription}
                                      </FormDescription>
                                      <FormControl>
                                        <div className="flex items-center space-x-2">
                                          <Input {...field}/>
                                          <Button type="button" variant="outline" size="sm" onClick={() => {
                                            remove(index)
                                          }}>
                                            <span className="sr-only">{strings.rcloneStrings.argumentsDescription}</span>
                                            <XIcon/>
                                          </Button>
                                        </div>
                                      </FormControl>
                                      <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        ))
                    )
                }
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => append("")}
                >
                  {strings.commandStrings.addArgument}
                </Button>
              </>
              <AlertDialogFooter>
                <AlertDialogCancel>{strings.cancel}</AlertDialogCancel>
                <Button type="submit">{strings.save}</Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
  )
}
