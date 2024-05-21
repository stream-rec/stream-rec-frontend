import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import React from "react";
import {Input} from "@/components/new-york/ui/input";
import {Badge} from "@/components/new-york/ui/badge";
import Select from "@/app/components/empty-select";
import {huyaCDNs} from "@/lib/data/platform/huya/constants";
import {SelectItem} from "@/components/new-york/ui/select";
import {
  PlatformTabContent,
  PlatformTabContentProps,
  PlatformTabContentStrings
} from "@/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";


type HuyaConfigProps = {
  allowNone?: boolean
  showMaxBitrate?: boolean
} & PlatformTabContentProps<HuyaTabString>

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
} & PlatformTabContentStrings

export const HuyaTabContent = ({
                                 controlPrefix,
                                 control,
                                 showFetchDelay,
                                 showMaxBitrate,
                                 showCookies,
                                 showPartedDownloadRetry,
                                 allowNone = false,
                                 strings
                               }: HuyaConfigProps) => {
  {
    return (
        <PlatformTabContent control={control} controlPrefix={controlPrefix} showCookies={showCookies}
                            showPartedDownloadRetry={showPartedDownloadRetry} strings={strings} showFetchDelay={showFetchDelay}>

          <FormField
              control={control}
              name={controlPrefix ? `${controlPrefix}.primaryCdn` : "primaryCdn"}
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{strings.cdn}</FormLabel>
                    <Select defaultValue={field.value}
                            onValueChange={field.onChange}
                            placeholder={strings.cdnDefault}
                            allowNone={allowNone}
                            options={
                              huyaCDNs.map((cdn) => (
                                  <SelectItem key={cdn} value={cdn}>
                                    {cdn}
                                  </SelectItem>
                              ))
                            }/>
                    <FormDescription>
                      {strings.cdnDescription}
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
                        {strings.sourceFormat}
                        <Badge>Experimental</Badge>
                      </div>
                    </FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder={strings.sourceFormatPlaceholder}
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
                      {strings.sourceFormatDescription}
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
                        <FormLabel>{strings.bitrate}</FormLabel>
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
                          {strings.bitrateDescription}
                        </FormDescription>
                        <FormMessage/>
                      </FormItem>
                  )}
              />)
          }
        </PlatformTabContent>
    )
  }
}