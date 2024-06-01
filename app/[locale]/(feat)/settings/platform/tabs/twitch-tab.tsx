import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import Select from "@/app/components/empty-select";
import {SelectItem} from "@/components/new-york/ui/select";
import React, {useState} from "react";
import {
  PlatformTabContent,
  PlatformTabContentProps,
  PlatformTabContentStrings
} from "@/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {Input} from "@/components/new-york/ui/input";
import {Switch} from "@/components/new-york/ui/switch";
import {Badge} from "@/components/new-york/ui/badge";


type TwitchConfigProps = {
  allowNone?: boolean
  qualityOptions: TwitchQualityItem[]
  showSkipAds?: boolean
} & PlatformTabContentProps<TwitchTabString>

export type TwitchQualityItem = {
  quality: string,
  description: string
}

export type TwitchTabString = {
  quality: string,
  qualityPlaceholder: string,
  qualityDescription: string,
  authToken: string,
  authTokenPlaceholder: string,
  authTokenDescription: string | React.ReactNode,
  skipAds: string,
  skipAdsDescription: string | React.ReactNode,
} & PlatformTabContentStrings


export const TwitchTabContent = ({
                                   controlPrefix,
                                   control,
                                   showFetchDelay,
                                   showCookies,
                                   showPartedDownloadRetry,
                                   showSkipAds,
                                   qualityOptions,
                                   allowNone = false,
                                   strings
                                 }: TwitchConfigProps) => {


  const [skipAds, setSkipAds] = useState(control._defaultValues?.twitchConfig?.skipAds || false)

  return <PlatformTabContent control={control} controlPrefix={controlPrefix} showCookies={showCookies}
                             showPartedDownloadRetry={showPartedDownloadRetry} strings={strings} showFetchDelay={showFetchDelay}>

    {showSkipAds && <FormField
        control={control}
        name={controlPrefix ? `${controlPrefix}.skipAds` : "skipAds"}
        render={({field}) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>
                  <div className={"flex flex-row items-center gap-x-2"}>
                    {strings.skipAds}
                    <Badge>Experimental</Badge>
                  </div>
                </FormLabel>
                <FormDescription>
                  {strings.skipAdsDescription}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                    checked={field.value}
                    onCheckedChange={(value) => {
                      field.onChange(value)
                      setSkipAds(value)
                    }}
                    arial-label="Twitch skip ads switch"
                />
              </FormControl>
            </FormItem>
        )}
    />}

    <FormField
        control={control}
        name={controlPrefix ? `${controlPrefix}.quality` : "quality"}
        render={({field}) => <FormItem>
          <FormLabel>{strings.quality}</FormLabel>
          <Select defaultValue={field.value}
                  onValueChange={field.onChange}
                  placeholder={strings.qualityPlaceholder}
                  allowNone={allowNone}
                  options={
                    (skipAds ? qualityOptions.slice(0, 1) : qualityOptions).map(
                        (quality) => (
                            <SelectItem key={quality.quality} value={quality.quality}>
                              {quality.description}
                            </SelectItem>
                        )
                    )
                  }/>
          <FormDescription>
            {strings.qualityDescription}
          </FormDescription>
          <FormMessage/>
        </FormItem>}
    />
    <FormField
        control={control}
        name={controlPrefix ? `${controlPrefix}.authToken` : "authToken"}
        render={({field}) => (
            <FormItem>
              <FormLabel>{strings.authToken}</FormLabel>
              <FormControl>
                <Input maxLength={30} minLength={30} placeholder={strings.authTokenPlaceholder}
                       value={field.value} onChange={field.onChange}/>
              </FormControl>
              <FormDescription>
                {strings.authTokenDescription}
              </FormDescription>
              <FormMessage/>
            </FormItem>
        )}
    />
  </PlatformTabContent>

}