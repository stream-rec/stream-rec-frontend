import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Control} from "react-hook-form";
import React from "react";
import {Input} from "@/components/new-york/ui/input";
import {Badge} from "@/components/new-york/ui/badge";
import Select from "@/app/components/empty-select";
import {huyaCDNs} from "@/lib/data/platform/huya/constants";
import {SelectItem} from "@/components/new-york/ui/select";
import {CookiesFormfield} from "@/app/[locale]/dashboard/settings/components/form/cookies-formfield";


interface HuyaConfigProps {
  controlPrefix?: string
  control: Control<any>;
  showMaxBitrate?: boolean
  showCookies?: boolean
  showPartedDownloadRetry?: boolean,
  allowNone?: boolean
  huyaStrings: HuyaTabString
}

export type HuyaTabString = {
  platform: string,
  cdn: string,
  cdnDescription: string,
  cdnDefault: string,
  sourceFormat: string,
  sourceFormatPlaceholder: string,
  sourceFormatDescription: string,
  bitrate: string,
  bitrateDescription: string,
  part: string,
  partDescription: any,
  cookieString: string,
  cookieDescription: any,
}

export const HuyaTabContent = ({
                                 controlPrefix,
                                 control,
                                 showMaxBitrate,
                                 showCookies,
                                 showPartedDownloadRetry,
                                 allowNone = false,
                                 huyaStrings
                               }: HuyaConfigProps) => {
  {
    return (
        <div className="mt-6 space-y-6 fade-in">
          <FormField
              control={control}
              name={controlPrefix ? `${controlPrefix}.primaryCdn` : "primaryCdn"}
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{huyaStrings.cdn}</FormLabel>
                    <Select defaultValue={field.value}
                            onValueChange={field.onChange}
                            placeholder={huyaStrings.cdnDefault}
                            allowNone={allowNone}
                            options={
                              huyaCDNs.map((cdn) => (
                                  <SelectItem key={cdn} value={cdn}>
                                    {cdn}
                                  </SelectItem>
                              ))
                            }/>
                    <FormDescription>
                      {huyaStrings.cdnDescription}
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
                        {huyaStrings.sourceFormat}
                        <Badge>Experimental</Badge>
                      </div>
                    </FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder={huyaStrings.sourceFormatPlaceholder}
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
                      {huyaStrings.sourceFormatDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          {
              showMaxBitrate && (<FormField
                  control={control}
                  name={controlPrefix ? `${controlPrefix}.maxBitRate` : "maxBitRate"}
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
                      name={controlPrefix ? `${controlPrefix}.partedDownloadRetry` : "partedDownloadRetry"}
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
                  <CookiesFormfield title={huyaStrings.cookieString} description={huyaStrings.cookieDescription}
                                    name={controlPrefix ? `${controlPrefix}.cookies` : "cookies"} control={control}
                  />
              )
          }
        </div>
    )
  }
}