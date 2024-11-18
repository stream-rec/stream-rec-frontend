'use client'
import {rcloneActionSchema, RcloneActionSchema} from "@/src/lib/data/actions/definitions";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import {cn} from "@/src/lib/utils";
import {Input} from "@/src/components/new-york/ui/input";
import {Button} from "@/src/components/new-york/ui/button";
import {XIcon} from "lucide-react";
import React, {forwardRef} from "react";

export type RcloneActionFormProps = {
  defaultValues: RcloneActionSchema,
  strings: {
    operation: string,
    operationDescription: string,
    remotePath: string,
    remotePathDescription: string | React.ReactNode
    arguments: string,
    argumentsDescription: string,
    addArgument: string,
  },
  onSubmit: (data: RcloneActionSchema) => void
}

export const RcloneActionForm = forwardRef<HTMLFormElement, RcloneActionFormProps>(({defaultValues, strings, onSubmit}, ref) => {

  const form = useForm({
    resolver: async (data, context, options) => {
      console.log("formData", data)
      console.log(
          "validation result",
          await zodResolver(rcloneActionSchema)(data, context, options)
      )
      return zodResolver(rcloneActionSchema)(data, context, options)
    },
    defaultValues: defaultValues
  })

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "args",
  })

  const handleSubmit: SubmitHandler<RcloneActionSchema> = (data) => {
    onSubmit(data)
  }

  return (
      <>
        <Form {...form}  >
          <form ref={ref} className={"space-y-4"} onSubmit={e => {
            e.preventDefault()
            form.handleSubmit(handleSubmit)()
            e.stopPropagation()
          }}>
            <FormField
                control={form.control}
                name="rcloneOperation"
                render={({field}) => (
                    <FormItem>
                      <FormLabel>{strings.operation}</FormLabel>
                      <FormControl>
                        <Input placeholder={"copy"} {...field}/>
                      </FormControl>
                      <FormDescription>
                        {strings.operationDescription}
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="remotePath"
                render={({field}) => (
                    <FormItem>
                      <FormLabel>{strings.remotePath}</FormLabel>
                      <FormControl>
                        <Input placeholder={"myremote:records/{streamer}/%MM/%dd"} {...field}/>
                      </FormControl>
                      <FormDescription>
                        {strings.remotePathDescription}
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                )}
            />

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
                                    {strings.arguments}
                                  </FormLabel>
                                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                                    {strings.argumentsDescription}
                                  </FormDescription>
                                  <FormControl>
                                    <div className="flex items-center space-x-2">
                                      <Input {...field}/>
                                      <Button type="button" variant="outline" size="sm" onClick={() => {
                                        remove(index)
                                      }}>
                                        <span className="sr-only">{strings.argumentsDescription}</span>
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
                onClick={() => append("")}
            >
              {strings.addArgument}
            </Button>

          </form>
        </Form>

      </>
  )
})
RcloneActionForm.displayName = "RcloneActionForm"