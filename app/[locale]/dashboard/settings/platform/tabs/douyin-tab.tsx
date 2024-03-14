import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Control} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/new-york/ui/select";
import {Textarea} from "@/components/new-york/ui/textarea";
import React from "react";
import {DouyinGlobalConfig} from "@/lib/data/platform/douyin/definitions";
import {Input} from "@/components/new-york/ui/input";

export type DouyinQuality = {
  quality: string,
  description: string
}

export type DouyinTabString = {
  platform: string,
  quality: string,
  qualityDescription: string,
  qualityDefault: string,
  part: string,
  partDescription: any,
  cookies: string,
  cookiesDescription: any
}

interface DouyinTabContentProps {
  controlPrefix?: string;
  control: Control<DouyinGlobalConfig, any, any>;
  qualityOptions: DouyinQuality[]
  showCookies?: boolean
  showPartedDownloadRetry?: boolean
  douyinStrings: DouyinTabString
}

export const DouyinTabContent = ({
                                   controlPrefix,
                                   control,
                                   showCookies,
                                   showPartedDownloadRetry,
                                   qualityOptions,
                                   douyinStrings
                                 }: DouyinTabContentProps) => {
  return (
      <div className="mt-6 space-y-6">
        <FormField
            control={control}
            name={controlPrefix ? `${controlPrefix}.quality` : "quality"}
            render={({field}) => (
                <FormItem>
                  <FormLabel>{douyinStrings.quality}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={douyinStrings.qualityDefault}/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {qualityOptions.map((quality) => (
                          <SelectItem key={quality.quality} value={quality.quality}>
                            {quality.description}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {douyinStrings.qualityDescription}
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
            )}
        />
        {
            showPartedDownloadRetry && (
                <FormField
                    control={control}
                    name={controlPrefix ? `${controlPrefix}.partedDownloadRetry` : "partedDownloadRetry"}
                    render={({field}) => (
                        <FormItem>
                          <FormLabel>{douyinStrings.part}</FormLabel>
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
                            {douyinStrings.partDescription}
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
                    name={controlPrefix ? `${controlPrefix}.cookies` : "cookies"}
                    render={({field}) => (
                        <FormItem>
                          <FormLabel>{douyinStrings.cookies}</FormLabel>
                          <FormControl>
                            <Textarea className={"h-[200px]"} placeholder="Cookies" {...field}></Textarea>
                          </FormControl>
                          <FormDescription>
                            <p>{douyinStrings.cookiesDescription}</p>
                          </FormDescription>
                          <FormMessage/>
                        </FormItem>
                    )}
                />)
        }
      </div>
  );
};