import {Control} from "react-hook-form";
import React from "react";
import {FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/new-york/ui/form";
import {Badge} from "@/components/new-york/ui/badge";
import {Switch} from "@/components/new-york/ui/switch";


type FlagFlagFormField = {
  controlPrefix?: string;
  control: Control<any>;
  fieldName: string;
  title?: string;
  description?: string | React.ReactNode;
  ariaLabel?: string;
  showExperimentalBadge?: boolean;
  children?: React.ReactNode;
}

export function FlagFormField({
                                controlPrefix,
                                control,
                                fieldName,
                                title,
                                description,
                                ariaLabel,
                                showExperimentalBadge,
                                children
                              }: FlagFlagFormField) {
  return <FormField
      control={control}
      name={controlPrefix ? `${controlPrefix}.${fieldName}` : fieldName}
      render={({field}) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-1.5">
              <FormLabel>
                <div className={"flex-row items-center space-x-3"}>
                  {title}
                  {showExperimentalBadge && <Badge>Experimental</Badge>}
                </div>
              </FormLabel>
              <FormDescription>
                {description}
              </FormDescription>
              {children}
            </div>
            <FormControl>
              <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  arial-label={ariaLabel}
              />
            </FormControl>
          </FormItem>
      )}
  />
}