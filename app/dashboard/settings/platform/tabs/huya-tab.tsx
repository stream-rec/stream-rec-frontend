import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Control} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/new-york/ui/select";
import React from "react";
import {Input} from "@/components/new-york/ui/input";
import {Textarea} from "@/components/new-york/ui/textarea";
import {huyaCDNs, HuyaGlobalConfig} from "@/app/lib/data/platform/huya/definitions";


interface HuyaConfigProps {
  control: Control<HuyaGlobalConfig, any, any>;
  showMaxBitrate?: boolean
  showCookies?: boolean
  showPartedDownloadRetry?: boolean
}

export const HuyaTabContent: React.FC<HuyaConfigProps> = ({control, showMaxBitrate, showCookies, showPartedDownloadRetry}) => {
  {
    return (
        <div className="mt-6 space-y-6 fade-in">
          <FormField
              control={control}
              name="primaryCdn"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Primary CDN</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a primary CDN"/>
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
                      Huya primary CDN used to fetch the video stream. By default, it is set to AL.
                      Possible values are AL, TX, HW, WS, HS, AL13, HW16, HY.
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
                        <FormLabel>Max record bitrate</FormLabel>
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
                          The maximum bitrate for the Huya video stream. The tool will automatically adjust the closest bitrate available for
                          download.
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
                              The delay between each part download retry. Optional. Default is 15 seconds.
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
                            <FormLabel>Cookies</FormLabel>
                            <FormControl>
                              <Textarea placeholder={"Optional cookies"} {...field}></Textarea>
                            </FormControl>
                            <FormDescription>
                              Cookies to be used for the Huya video stream. Optional.
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