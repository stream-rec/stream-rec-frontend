import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/new-york/ui/select";
import {Input} from "@/components/new-york/ui/input";
import {AutosizeTextarea} from "@/components/new-york/ui/autosize-textarea";
import React from "react";
import {Control} from "react-hook-form";
import {douyuCdns} from "@/lib/data/platform/douyu/definitions";


export type DouyuQuality = {
  quality: string,
  description: string
}

export type DouyuTabProps = {
  controlPrefix?: string;
  control: Control<any>;
  showCookies?: boolean
  showPartedDownloadRetry?: boolean
  strings: DouyuTabString,
  qualityOptions: DouyuQuality[]
}

export type DouyuTabString = {
  platform: string,
  cdn: string,
  cdnDescription: string,
  cdnDefault: string,
  quality: string,
  qualityDescription: string,
  qualityDefault: string,
  part: string,
  partDescription: string | React.ReactNode,
  cookies: string,
  cookiesDescription: string | React.ReactNode,
}


export default function DouyuTabContent({controlPrefix, control, showCookies, showPartedDownloadRetry, strings, qualityOptions}: DouyuTabProps) {

  return (
      <>
        <div className="mt-6 space-y-6">
          <FormField
              control={control}
              name={controlPrefix ? `${controlPrefix}.cdn` : "cdn"}
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{strings.cdn}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={strings.cdnDefault}/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          douyuCdns.map((cdn) => (
                              <SelectItem key={cdn} value={cdn}>
                                {cdn}
                              </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {strings.cdnDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <FormField
              control={control}
              name={controlPrefix ? `${controlPrefix}.quality` : "quality"}
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{strings.quality}</FormLabel>
                    <Select onValueChange={
                      e => {
                        if (e === "") {
                          field.onChange(null);
                        } else {
                          field.onChange(parseInt(e));
                        }
                      }
                    } defaultValue={field.value?.toString() || undefined}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={strings.qualityDefault}/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {qualityOptions.map((quality) => (
                            <SelectItem key={quality.quality.toString()} value={quality.quality.toString()}>
                              {quality.description}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {strings.qualityDescription}
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
                            <FormLabel>{strings.part}</FormLabel>
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
                              {strings.partDescription}
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
                            <FormLabel>{strings.cookies}</FormLabel>
                            <FormControl>
                              <AutosizeTextarea className={"h-[200px]"} placeholder="Cookies" {...field}></AutosizeTextarea>
                            </FormControl>
                            <FormDescription>
                              <p>{strings.cookiesDescription}</p>
                            </FormDescription>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />)
          }
        </div>
      </>
  )
}