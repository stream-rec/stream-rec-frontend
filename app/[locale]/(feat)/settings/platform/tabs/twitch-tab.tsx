import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import Select from "@/app/components/empty-select";
import {SelectItem} from "@/components/new-york/ui/select";
import React from "react";
import {
  PlatformTabContent,
  PlatformTabContentProps,
  PlatformTabContentStrings
} from "@/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {Input} from "@/components/new-york/ui/input";
import {FlagFormField} from "@/app/[locale]/(feat)/settings/components/form/flag-form-field";
import {useFormContext} from "react-hook-form";


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

  const {watch} = useFormContext()

  const skipAds = watch(`${controlPrefix}.skipAds`, false)

  return <PlatformTabContent control={control} controlPrefix={controlPrefix} showCookies={showCookies}
                             showPartedDownloadRetry={showPartedDownloadRetry} strings={strings} showFetchDelay={showFetchDelay}>

    {showSkipAds && (
        <FlagFormField control={control} fieldName={"skipAds"} controlPrefix={controlPrefix} title={strings.skipAds}
                       description={strings.skipAdsDescription} showExperimentalBadge
                       ariaLabel={"Twitch skip ads switch"}/>
    )}

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