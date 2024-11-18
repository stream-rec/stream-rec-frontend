import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import {Input} from "@/src/components/new-york/ui/input";
import React from "react";
import {FormFieldProps} from "@/src/app/[locale]/(feat)/settings/components/form/form-field";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/src/components/new-york/ui/accordion";


export type OutputFolderFormFieldProps = {
  placeholderDescription: string | React.ReactNode
} & FormFieldProps


export function OutputFolderFormField({control, name, description, controlPrefix, placeholderDescription}: OutputFolderFormFieldProps) {

  return <FormField
      control={control}
      name={controlPrefix ? `${controlPrefix}.outputFolder` : "outputFolder"}
      render={({field}) => (
          <FormItem>
            <FormLabel>{name}</FormLabel>
            <FormControl>
              <Input placeholder="{streamer}/%Y/%m/%d" {...field} />
            </FormControl>
            <FormDescription>
              <Accordion type="single" collapsible asChild={true}>
                <AccordionItem value="item-1" className={"border-none"}>
                  <AccordionTrigger className={"text-[0.8rem] text-muted-foreground py-2"}>{description}</AccordionTrigger>
                  <AccordionContent className={"text-[0.8rem] text-muted-foreground whitespace-pre-wrap"}>
                    {placeholderDescription}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </FormDescription>
            <FormMessage/>
          </FormItem>
      )}
  />
}