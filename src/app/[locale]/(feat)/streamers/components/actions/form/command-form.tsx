'use client'
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {commandActionSchema, CommandActionSchema} from "@/src/lib/data/actions/definitions";
import {Input} from "@/src/components/new-york/ui/input";
import React, {forwardRef} from "react";
import {cn} from "@/src/lib/utils";
import {Button} from "@/src/components/new-york/ui/button";
import {XIcon} from "lucide-react";

export type CommandActionFormProps = {
  defaultValues: CommandActionSchema,
  strings: {
    program: string,
    programDescription: string
    arguments: string,
    argumentsDescription: string
    addArgument: string
    removeArgument: string
  }
  onSubmit: (data: CommandActionSchema) => void
}

export const CommandActionForm = forwardRef<HTMLFormElement, CommandActionFormProps>(({defaultValues, strings, onSubmit}, ref) => {

  const form = useForm({
    resolver: async (data, context, options) => {
      console.log("formData", data)
      console.log(
          "validation result",
          await zodResolver(commandActionSchema)(data, context, options)
      )
      return zodResolver(commandActionSchema)(data, context, options)
    },
    defaultValues: defaultValues
  })

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "args",
  })

  const handleSubmit: SubmitHandler<CommandActionSchema> = (data) => {
    onSubmit(data)
  }

  return (
      <>
        <Form  {...form}>

          <form ref={ref} onSubmit={e => {
            e.preventDefault()
            form.handleSubmit(handleSubmit)()
            e.stopPropagation()
          }}>

            <FormField
                control={form.control}
                name="program"
                render={({field}) => (
                    <FormItem>
                      <FormLabel>{strings.program}</FormLabel>
                      <FormControl>
                        <Input placeholder={"sh"} {...field}/>
                      </FormControl>
                      <FormDescription>
                        {strings.programDescription}
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
                                      <Button type="button" variant="outline" size="icon" onClick={() => {
                                        remove(index)
                                      }}>
                                        <span className="sr-only">{strings.argumentsDescription}</span>
                                        <XIcon className="h-4 w-4"/>
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
              {strings.addArgument}
            </Button>

          </form>
        </Form>
      </>
  )
})
CommandActionForm.displayName = 'CommandActionForm'