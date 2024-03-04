import {Button} from "@/components/new-york/ui/button"
import {useFieldArray, useForm} from "react-hook-form";
import {ActionSchema, ActionType, commandActionSchema, rcloneActionSchema} from "@/app/lib/data/actions/definitions";
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
  openIcon?: React.ReactNode
  onSave: (data: ActionSchema) => void
  defaultValues?: ActionSchema
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


export function NewActionDialog({openIcon, defaultValues = defaultAction, onSave}: NewActionDialogProps) {

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
          <Button onClick={() => open ? setOpen(false) : setOpen(true)} variant="outline">{openIcon ?? "New Action"}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>New Action</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new action callback to be triggered when a new event occurs.
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
                    <FormLabel>Action Type</FormLabel>
                    <Select onValueChange={e => {
                      field.onChange(e)
                      handleTypeChange(e as ActionType.Command | ActionType.Rclone)
                    }} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an action type"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="command">Command</SelectItem>
                        <SelectItem value="rclone">Rclone</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Type of action to be triggered.
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
                          <FormLabel>State</FormLabel>
                          <FormDescription>
                            Enable or disable the action.
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
                                <FormLabel>Program</FormLabel>
                                <FormControl>
                                  <Input placeholder={"bash"} {...field}/>
                                </FormControl>
                                <FormDescription>
                                  Program to be executed.
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
                                <FormLabel>Operation</FormLabel>
                                <FormControl>
                                  <Input placeholder={"copy"} {...field}/>
                                </FormControl>
                                <FormDescription>
                                  Rclone operation to be executed.
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
                                <FormLabel>Remote path</FormLabel>
                                <FormControl>
                                  <Input placeholder={"myremote:"} {...field}/>
                                </FormControl>
                                <FormDescription>
                                  Rclone remote path.
                                </FormDescription>
                                <FormMessage/>
                              </FormItem>
                          )}
                      />
                  )
              }
              <div>
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
                                        Arguments
                                      </FormLabel>
                                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                                        Add program arguments.
                                      </FormDescription>
                                      <FormControl>
                                        <div className="flex items-center space-x-2">
                                          <Input {...field}/>
                                          <Button type="button" variant="outline" size="sm" onClick={() => {
                                            remove(index)
                                          }}>
                                            <span className="sr-only">Remove</span>
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
                  Add Argument
                </Button>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit">Save changes</Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
  )
}
