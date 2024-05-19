import {Control} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/new-york/ui/form";
import {Switch} from "@/components/new-york/ui/switch";
import React from "react";

type DanmuFlagFormfieldProps = {
  controlPrefix?: string;
  control: Control<any>;
  title?: string;
  description?: string | React.ReactNode;
}

export function DanmuFlagFormfield({controlPrefix, control, title, description}: DanmuFlagFormfieldProps) {
  return <FormField
      control={control}
      name={controlPrefix ? `${controlPrefix}.danmu` : "danmu"}
      render={({field}) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>{title}</FormLabel>
              <FormDescription>
                {description}
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  arial-label="Danmu switch"
              />
            </FormControl>
          </FormItem>
      )}
  />
}