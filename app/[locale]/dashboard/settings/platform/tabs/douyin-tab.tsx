import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Control} from "react-hook-form";
import {SelectItem} from "@/components/new-york/ui/select";
import React from "react";
import {Input} from "@/components/new-york/ui/input";
import {Badge} from "@/components/new-york/ui/badge";
import Select from "@/app/components/empty-select";
import {CookiesFormfield} from "@/app/[locale]/dashboard/settings/components/form/cookies-formfield";

export type DouyinQuality = {
  quality: string,
  description: string
}

export type DouyinTabString = {
  platform: string,
  quality: string,
  qualityDescription: string,
  qualityDefault: string,
  sourceFormat: string,
  sourceFormatPlaceholder: string,
  sourceFormatDescription: string | React.ReactNode,
  part: string,
  partDescription: any,
  cookies: string,
  cookiesDescription: any
}

interface DouyinTabContentProps {
  controlPrefix?: string;
  control: Control<any>;
  qualityOptions: DouyinQuality[]
  showCookies?: boolean
  showPartedDownloadRetry?: boolean
  allowNone?: boolean
  douyinStrings: DouyinTabString
}

export const DouyinTabContent = ({
                                   controlPrefix,
                                   control,
                                   showCookies,
                                   showPartedDownloadRetry,
                                   qualityOptions,
                                   allowNone = false,
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}
                          placeholder={douyinStrings.qualityDefault} allowNone={allowNone}
                          options={
                            qualityOptions.map((quality) => (
                                <SelectItem key={quality.quality} value={quality.quality}>
                                  {quality.description}
                                </SelectItem>
                            ))}
                  />
                  <FormDescription>
                    {douyinStrings.qualityDescription}
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
            )}
        />


        <FormField
            control={control}
            name={controlPrefix ? `${controlPrefix}.sourceFormat` : "sourceFormat"}
            render={({field}) => (
                <FormItem>
                  <FormLabel>
                    <div className={"flex-row items-center space-x-3"}>
                      {douyinStrings.sourceFormat}
                      <Badge>Experimental</Badge>
                    </div>
                  </FormLabel>
                  <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder={douyinStrings.sourceFormatPlaceholder}
                      options={
                        ["flv", "hls"].map((format) => (
                            <SelectItem key={format} value={format}>
                              {format}
                            </SelectItem>
                        ))
                      }
                      allowNone={allowNone}
                  />
                  <FormDescription>
                    {douyinStrings.sourceFormatDescription}
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
                <CookiesFormfield title={douyinStrings.cookies} description={douyinStrings.cookiesDescription}
                                  name={controlPrefix ? `${controlPrefix}.cookies` : "cookies"} control={control}
                />)
        }
      </div>
  );
};