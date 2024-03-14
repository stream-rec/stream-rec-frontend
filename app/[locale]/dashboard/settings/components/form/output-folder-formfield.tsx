import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Input} from "@/components/new-york/ui/input";
import React from "react";
import {FormFieldProps} from "@/app/[locale]/dashboard/settings/components/form/form-field";


export function OutputFolderFormField({control, name, description, controlPrefix}: FormFieldProps) {

  return <FormField
      control={control}
      name={controlPrefix ? `${controlPrefix}.outputFolder` : "outputFolder"}
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