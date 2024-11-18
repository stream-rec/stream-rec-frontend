import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import {Select as OriginalSelect, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/new-york/ui/select";
import React from "react";
import {douyuCdns} from "@/src/lib/data/platform/douyu/constants";
import Select from "@/src/app/components/empty-select";
import {PlatformTabContent, PlatformTabContentProps} from "@/src/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {DouyuQuality, DouyuTabString} from "@/src/app/hooks/translations/douyu-translations";

export type DouyuTabProps = {
  qualityOptions: DouyuQuality[]
  allowNone?: boolean
} & PlatformTabContentProps<DouyuTabString>


export default function DouyuTabContent({
                                          controlPrefix,
                                          control,
                                          showFetchDelay,
                                          showCookies,
                                          showPartedDownloadRetry,
                                          showDownloadCheckInterval,
                                          strings,
                                          qualityOptions,
                                          allowNone = false
                                        }: DouyuTabProps) {

  return <PlatformTabContent control={control} controlPrefix={controlPrefix} showCookies={showCookies}
                             showPartedDownloadRetry={showPartedDownloadRetry} strings={strings} showFetchDelay={showFetchDelay}
                             showDownloadCheckInterval={showDownloadCheckInterval}>
    <FormField
        control={control}
        name={controlPrefix ? `${controlPrefix}.cdn` : "cdn"}
        render={({field}) => (
            <FormItem>
              <FormLabel>{strings.cdn}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} placeholder={strings.cdnDefault}
                      allowNone={allowNone} options={
                douyuCdns.map((cdn) => (
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
        name={controlPrefix ? `${controlPrefix}.quality` : "quality"}
        render={({field}) => (
            <FormItem>
              <FormLabel>{strings.quality}</FormLabel>
              <OriginalSelect onValueChange={
                e => {
                  if (e === "" || e === "99999") {
                    field.onChange(null);
                  } else {
                    field.onChange(parseInt(e));
                  }
                }
              } defaultValue={field.value?.toString() || ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={strings.qualityDefault}/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                      allowNone &&
                      <SelectItem key="null" value={"99999"}>{strings.qualityDefault}</SelectItem>
                  }
                  {qualityOptions.map((quality) => (
                      <SelectItem key={quality.quality.toString()} value={quality.quality.toString()}>
                        {quality.description}
                      </SelectItem>
                  ))}
                </SelectContent>
              </OriginalSelect>
              <FormDescription>
                {strings.qualityDescription}
              </FormDescription>
              <FormMessage/>
            </FormItem>
        )}
    />
  </PlatformTabContent>
}