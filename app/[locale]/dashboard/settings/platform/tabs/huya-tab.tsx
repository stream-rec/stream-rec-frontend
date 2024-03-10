import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Control} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/new-york/ui/select";
import React from "react";
import {Input} from "@/components/new-york/ui/input";
import {Textarea} from "@/components/new-york/ui/textarea";
import {huyaCDNs, HuyaGlobalConfig} from "@/lib/data/platform/huya/definitions";


interface HuyaConfigProps {
  control: Control<HuyaGlobalConfig, any, any>;
  showMaxBitrate?: boolean
  showCookies?: boolean
  showPartedDownloadRetry?: boolean,
  huyaStrings: HuyaTabString
}

export type HuyaTabString = {
  platform: string,
  cdn: string,
  cdnDescription: string,
  cdnDefault: string,
  bitrate: string,
  bitrateDescription: string,
  part: string,
  partDescription: any,
  cookieString: string,
  cookieDescription: any,
}

export const HuyaTabContent = ({control, showMaxBitrate, showCookies, showPartedDownloadRetry, huyaStrings}: HuyaConfigProps) => {
  {
    return (
        <div className="mt-6 space-y-6 fade-in">
          <FormField
              control={control}
              name="primaryCdn"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{huyaStrings.cdn}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={huyaStrings.cdnDefault}/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          huyaCDNs.map((cdn) => (
                              <SelectItem key={cdn} value={cdn}>
                                {cdn}
                              </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {huyaStrings.cdnDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          {
              showMaxBitrate && (<FormField
                  control={control}
                  name="maxBitRate"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>{huyaStrings.bitrate}</FormLabel>
                        <FormControl>
                          <Input placeholder="10000" type={"number"} step={100} value={field.value}
                                 onChange={event => {
                                   if (event.target.value === "") {
                                     field.onChange(null);
                                   } else {
                                     field.onChange(parseInt(event.target.value));
                                   }
                                 }}/>

                        </FormControl>
                        <FormDescription>
                          {huyaStrings.bitrateDescription}
                        </FormDescription>
                        <FormMessage/>
                      </FormItem>
                  )}
              />)
          }
          {
              showPartedDownloadRetry && (
                  <FormField
                      control={control}
                      name="partedDownloadRetry"
                      render={({field}) => (
                          <FormItem>
                            <FormLabel>{huyaStrings.part}</FormLabel>
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
                              {huyaStrings.partDescription}
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
                            <FormLabel>{huyaStrings.cookieString}</FormLabel>
                            <FormControl>
                              <Textarea placeholder={"Cookies"} {...field}></Textarea>
                            </FormControl>
                            <FormDescription>
                              {huyaStrings.cookieDescription}
                            </FormDescription>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />
              )
          }
        </div>
    )
  }
}