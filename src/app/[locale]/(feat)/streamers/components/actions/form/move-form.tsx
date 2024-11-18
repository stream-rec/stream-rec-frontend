'use client'

import {moveActionSchema, MoveActionSchema} from "@/src/lib/data/actions/definitions";
import React, {forwardRef} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import {Input} from "@/src/components/new-york/ui/input";

export type MoveFormProps = {
  defaultValues: MoveActionSchema
  strings: {
    destination: string,
    destinationDefault: string,
    destinationDescription: string
  },
  onSubmit: (data: MoveActionSchema) => void
}


export const MoveActionForm = forwardRef<HTMLFormElement, MoveFormProps>(({defaultValues, strings, onSubmit}, ref) => {

  const form = useForm(
      {
        resolver: zodResolver(moveActionSchema),
        defaultValues: defaultValues
      }
  )

  const handleSubmit: SubmitHandler<MoveActionSchema> = (data) => {
    onSubmit(data)
  }

  return <>
    <Form {...form}>
      <form ref={ref} onSubmit={event => {
        event.preventDefault()
        form.handleSubmit(handleSubmit)()
        event.stopPropagation()
      }
      }>
        <FormField control={form.control} name={"destination"} render={({field}) => (
            <FormItem>
              <FormLabel>{strings.destination}</FormLabel>
              <FormControl>
                <Input placeholder={strings.destinationDefault} {...field}/>
              </FormControl>
              <FormDescription>
                {strings.destinationDescription}
              </FormDescription>
              <FormMessage/>
            </FormItem>
        )}>
        </FormField>
      </form>
    </Form>
  </>
})

MoveActionForm.displayName = "MoveActionForm"