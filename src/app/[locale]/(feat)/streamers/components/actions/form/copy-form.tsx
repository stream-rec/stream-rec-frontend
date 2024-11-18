'use client'

import {copyActionSchema, CopyActionSchema} from "@/src/lib/data/actions/definitions";
import React, {forwardRef} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import {Input} from "@/src/components/new-york/ui/input";

export type CopyFormProps = {
  defaultValues: CopyActionSchema
  strings: {
    destination: string,
    destinationDefault: string,
    destinationDescription: string
  },
  onSubmit: (data: CopyActionSchema) => void
}


export const CopyActionForm = forwardRef<HTMLFormElement, CopyFormProps>(({defaultValues, strings, onSubmit}, ref) => {

  const form = useForm(
      {
        resolver: zodResolver(copyActionSchema),
        defaultValues: defaultValues
      }
  )

  const handleSubmit: SubmitHandler<CopyActionSchema> = (data) => {
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

CopyActionForm.displayName = "CopyActionForm"