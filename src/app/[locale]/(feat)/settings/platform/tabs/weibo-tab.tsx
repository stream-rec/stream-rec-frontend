import {FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import Select from "@/src/app/components/empty-select";
import {SelectItem} from "@/src/components/new-york/ui/select";
import React from "react";
import {PlatformTabContent, PlatformTabContentProps} from "@/src/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {Badge} from "@/src/components/new-york/ui/badge";
import {WeiboTabString} from "@/src/app/hooks/translations/weibo-translations";


type WeiboConfigProps = {
  allowNone?: boolean
} & PlatformTabContentProps<WeiboTabString>


export const WeiboTabContent = ({
                                  controlPrefix,
                                  control,
                                  showFetchDelay,
                                  showCookies,
                                  showPartedDownloadRetry,
                                  showDownloadCheckInterval,
                                  allowNone = false,
                                  strings
                                }: WeiboConfigProps) => {

  return <PlatformTabContent control={control} controlPrefix={controlPrefix} showCookies={showCookies}
                             showPartedDownloadRetry={showPartedDownloadRetry} strings={strings}
                             showFetchDelay={showFetchDelay}
                             showDownloadCheckInterval={showDownloadCheckInterval}>

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

}