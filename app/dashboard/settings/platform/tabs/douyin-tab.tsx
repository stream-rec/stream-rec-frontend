import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Control} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/new-york/ui/select";
import {Textarea} from "@/components/new-york/ui/textarea";
import React from "react";

const douyinQualityOptions = [
  ["origin", "Origin"],
  ["uhd", "Ultra High Definition"],
  ["hd", "High Definition"],
  ["sd", "Standard Definition"],
  ["ld", "Low Definition"],
  ["md", "Smooth Definition"],
  ["ao", "Audio"],
] as const

interface DouyinTabContentProps {
  control: Control<any>;
}

export const DouyinTabContent: React.FC<DouyinTabContentProps> = ({control}) => {
  return (
      <div className="mt-6 space-y-6">
        <FormField
            control={control}
            name="douyinQuality"
            render={({field}) => (
                <FormItem>
                  <FormLabel>Record quality</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a default quality"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {douyinQualityOptions.map((quality) => (
                          <SelectItem key={quality[0]} value={quality[0]}>
                            {quality[1]}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The quality of the Douyin video stream. Ordered from highest to lowest quality.
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
            )}
        />
        <FormField
            control={control}
            name="douyinCookies"
            render={({field}) => (
                <FormItem>
                  <FormLabel>Douyin Cookies</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Cookies" {...field}></Textarea>
                  </FormControl>
                  <FormDescription>
                    The cookies used to authenticate the Douyin account.
                    <br/>
                    <strong>__ac_nonce= and __ac_signature must be included</strong>
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
            )}
        />
      </div>
  );
};