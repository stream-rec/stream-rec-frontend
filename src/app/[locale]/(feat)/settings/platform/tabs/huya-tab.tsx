import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import React from "react";
import {Input} from "@/src/components/new-york/ui/input";
import {Badge} from "@/src/components/new-york/ui/badge";
import Select from "@/src/app/components/empty-select";
import {huyaCDNs} from "@/src/lib/data/platform/huya/constants";
import {SelectItem} from "@/src/components/new-york/ui/select";
import {PlatformTabContent, PlatformTabContentProps} from "@/src/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {FlagFormField} from "@/src/app/[locale]/(feat)/settings/components/form/flag-form-field";
import {HuyaTabString} from "@/src/app/hooks/translations/huya-translations";


type HuyaConfigProps = {
  allowNone?: boolean
  showMaxBitrate?: boolean
  showForceOrigin?: boolean
  showMobileApi?: boolean
} & PlatformTabContentProps<HuyaTabString>


export const HuyaTabContent = ({
                                 controlPrefix,
                                 control,
                                 showFetchDelay,
                                 showMaxBitrate,
                                 showCookies,
                                 showPartedDownloadRetry,
                                 showDownloadCheckInterval,
                                 showForceOrigin,
                                 showMobileApi,
                                 allowNone = false,
                                 strings
                               }: HuyaConfigProps) => {
  {
    return (
        <PlatformTabContent control={control} controlPrefix={controlPrefix} showCookies={showCookies}
                            showPartedDownloadRetry={showPartedDownloadRetry} strings={strings}
                            showFetchDelay={showFetchDelay} showDownloadCheckInterval={showDownloadCheckInterval}>

          {showMobileApi && (<FlagFormField control={control} fieldName={"useMobileApi"} controlPrefix={controlPrefix}
                                            title={strings.mobileApi}
                                            description={strings.mobileApiDescription}
                                            ariaLabel={"Huya use mobile api switch"}/>)}

          {showForceOrigin && (<FlagFormField control={control} fieldName={"forceOrigin"} controlPrefix={controlPrefix}
                                              title={strings.forceOrigin}
                                              description={strings.forceOriginDescription} showExperimentalBadge
                                              ariaLabel={"Huya force origin switch"}/>)}

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
                      <div className={"flex flex-row items-center gap-x-3"}>
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