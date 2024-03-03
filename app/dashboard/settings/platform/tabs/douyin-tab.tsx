import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Control} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/new-york/ui/select";
import {Textarea} from "@/components/new-york/ui/textarea";
import React from "react";
import {DouyinGlobalConfig, DouyinQuality} from "@/app/lib/data/platform/douyin/definitions";
import {Input} from "@/components/new-york/ui/input";

const douyinQualityOptions = [
  [DouyinQuality.origin, "Origin"],
  [DouyinQuality.uhd, "Ultra High Definition"],
  [DouyinQuality.hd, "High Definition"],
  [DouyinQuality.sd, "Standard Definition"],
  [DouyinQuality.ld, "Low Definition"],
  [DouyinQuality.md, "Smooth Definition"],
  [DouyinQuality.ao, "Audio"],
] as const

interface DouyinTabContentProps {
  control: Control<DouyinGlobalConfig, any, any>;
  showCookies?: boolean
  showPartedDownloadRetry?: boolean
}

export const DouyinTabContent: React.FC<DouyinTabContentProps> = ({control, showCookies, showPartedDownloadRetry}) => {
  return (
      <div className="mt-6 space-y-6">
        <FormField
            control={control}
            name="quality"
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
        {
            showPartedDownloadRetry && (
                <FormField
                    control={control}
                    name="partedDownloadRetry"
                    render={({field}) => (
                        <FormItem>
                          <FormLabel>Part download delay</FormLabel>
                          <FormControl>
                            <Input placeholder="10" type={"number"} step={1} value={field.value}
                                   onChange={event => {
                                     if (event.target.value === "") {
                                       field.onChange(null);
                                     } else {
                                       field.onChange(parseInt(event.target.value));
                                     }
                                   }}/>

                          </FormControl>
                          <FormDescription>
                            The delay between each part download retry. Optional. Default is 3 seconds.
                          </FormDescription>
                          <FormMessage/>
                        </FormItem>
                    )}
                />)
        }

        {
            showCookies && (
                <FormField
                    control={control}
                    name="cookies"
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
                />)
        }
      </div>
  );
};