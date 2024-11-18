import {FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import {SelectItem} from "@/src/components/new-york/ui/select";
import React from "react";
import {Badge} from "@/src/components/new-york/ui/badge";
import Select from "@/src/app/components/empty-select";
import {PlatformTabContent, PlatformTabContentProps} from "@/src/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {DouyinQuality, DouyinTabString} from "@/src/app/hooks/translations/douyin-translations";

export type DouyinTabContentProps = {
  qualityOptions: DouyinQuality[]
  allowNone?: boolean
} & PlatformTabContentProps<DouyinTabString>

export const DouyinTabContent = ({
                                   controlPrefix,
                                   control,
                                   showFetchDelay,
                                   showCookies,
                                   showPartedDownloadRetry,
                                   showDownloadCheckInterval,
                                   qualityOptions,
                                   allowNone = false,
                                   strings
                                 }: DouyinTabContentProps) => {


  return (
      <PlatformTabContent control={control} controlPrefix={controlPrefix} showCookies={showCookies}
                          showPartedDownloadRetry={showPartedDownloadRetry} strings={strings}
                          showFetchDelay={showFetchDelay} showDownloadCheckInterval={showDownloadCheckInterval}>

        <FormField
            control={control}
            name={controlPrefix ? `${controlPrefix}.quality` : "quality"}
            render={({field}) => (
                <FormItem>
                  <FormLabel>{strings.quality}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}
                          placeholder={strings.qualityDefault} allowNone={allowNone}
                          options={
                            qualityOptions.map((quality) => (
                                <SelectItem key={quality.quality} value={quality.quality}>
                                  {quality.description}
                                </SelectItem>
                            ))}
                  />
                  <FormDescription>
                    {strings.qualityDescription}
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

      </PlatformTabContent>
  );
};