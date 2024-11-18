import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import Select from "@/src/app/components/empty-select";
import {SelectItem} from "@/src/components/new-york/ui/select";
import React from "react";
import {PlatformTabContent, PlatformTabContentProps} from "@/src/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {Input} from "@/src/components/new-york/ui/input";
import {FlagFormField} from "@/src/app/[locale]/(feat)/settings/components/form/flag-form-field";
import {useFormContext} from "react-hook-form";
import {TwitchQualityItem, TwitchTabString} from "@/src/app/hooks/translations/twitch-translations";


type TwitchConfigProps = {
  allowNone?: boolean
  qualityOptions: TwitchQualityItem[]
  showSkipAds?: boolean
  showTtvProxyRelated?: boolean
} & PlatformTabContentProps<TwitchTabString>

export const TwitchTabContent = ({
                                   controlPrefix,
                                   control,
                                   showFetchDelay,
                                   showCookies,
                                   showPartedDownloadRetry,
                                   showSkipAds,
                                   showDownloadCheckInterval,
                                   qualityOptions,
                                   allowNone = false,
                                   showTtvProxyRelated = false,
                                   strings
                                 }: TwitchConfigProps) => {

  const {watch} = useFormContext()

  const skipAds = watch(`${controlPrefix}.skipAds`, false)

  return <PlatformTabContent control={control} controlPrefix={controlPrefix} showCookies={showCookies}
                             showPartedDownloadRetry={showPartedDownloadRetry} strings={strings} showFetchDelay={showFetchDelay}
                             showDownloadCheckInterval={showDownloadCheckInterval}>

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

    {
        showTtvProxyRelated && (<>
          <FlagFormField control={control} fieldName={"twitchProxyPlaylistFallback"} controlPrefix={controlPrefix}
                         title={strings.ttvProxyPlaylistFallback}
                         description={strings.ttvProxyPlaylistFallbackDescription}
                         ariaLabel={"Twitch twitchProxyPlaylistFallback flag"}/>

          <FormField
              control={control}
              name={controlPrefix ? `${controlPrefix}.twitchProxyPlaylist` : "twitchProxyPlaylist"}
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{strings.ttvProxyPlaylist}</FormLabel>
                    <FormControl>
                      <Input value={field.value} onChange={field.onChange}/>
                    </FormControl>
                    <FormDescription>
                      {strings.ttvProxyPlaylistDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}>
          </FormField>

          <FormField
              control={control}
              name={controlPrefix ? `${controlPrefix}.twitchProxyPlaylistExclude` : "twitchProxyPlaylistExclude"}
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{strings.ttvProxyPlaylistExclude}</FormLabel>
                    <FormControl>
                      <Input value={field.value} onChange={field.onChange}/>
                    </FormControl>
                    <FormDescription>
                      {strings.ttvProxyPlaylistExcludeDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}>
          </FormField>

        </>)
    }
  </PlatformTabContent>

}