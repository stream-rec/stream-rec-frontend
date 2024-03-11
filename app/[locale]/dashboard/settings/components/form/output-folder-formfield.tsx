import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Input} from "@/components/new-york/ui/input";
import {Control} from "react-hook-form";
import React from "react";


type OutputFolderFormFieldProps = {
  control: Control<any>;
  name: string,
  description: string | React.ReactNode
}

export function OutputFolderFormField({control, name, description}: OutputFolderFormFieldProps) {

  return <FormField
      control={control}
      name="outputFolder"
      render={({field}) => (
          <FormItem>
            <FormLabel>{name}</FormLabel>
            <FormControl>
              <Input placeholder="{streamer}/%yyyy-%MM-%dd" {...field} />
            </FormControl>
            <FormDescription>
              {description}
            </FormDescription>
            <FormMessage/>
          </FormItem>
      )}
  />
}