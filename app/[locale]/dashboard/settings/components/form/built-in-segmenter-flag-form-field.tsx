import {Control} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/new-york/ui/form";
import {Switch} from "@/components/new-york/ui/switch";
import React from "react";
import {Badge} from "@/components/new-york/ui/badge";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/new-york/ui/accordion";

type BuiltInSegmenterFlagFormField = {
  controlPrefix?: string;
  control: Control<any>;
  title?: string;
  description?: string | React.ReactNode;
  note?: string;
  noteDescription?: string | React.ReactNode;
}

export function BuiltInSegmenterFlagFormField({controlPrefix, control, title, description, note, noteDescription}: BuiltInSegmenterFlagFormField) {
  return <FormField
      control={control}
      name={controlPrefix ? `${controlPrefix}.useBuiltInSegmenter` : "useBuiltInSegmenter"}
      render={({field}) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>
                <div className={"flex-row items-center space-x-3"}>
                  {title}
                  <Badge>Experimental</Badge>
                </div>
              </FormLabel>
              <FormDescription>
                {description}
              </FormDescription>
              <Accordion type="single" collapsible asChild={true}>
                <AccordionItem value="item-1" className={"border-none"}>
                  <AccordionTrigger className={"text-[0.8rem] text-muted-foreground"}>{note}</AccordionTrigger>
                  <AccordionContent className={"text-[0.8rem] text-muted-foreground whitespace-pre-wrap"}>
                    {noteDescription}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <FormControl>
              <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  arial-label="FFmpeg segmenter switch"
              />
            </FormControl>
          </FormItem>
      )}
  />
}