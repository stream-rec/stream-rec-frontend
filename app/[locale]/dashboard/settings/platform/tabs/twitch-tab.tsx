import {Control} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import Select from "@/app/components/empty-select";
import {SelectItem} from "@/components/new-york/ui/select";
import {Input} from "@/components/new-york/ui/input";
import React from "react";
import {CookiesFormfield} from "@/app/[locale]/dashboard/settings/components/form/cookies-formfield";


interface TwitchConfigProps {
  controlPrefix?: string
  control: Control<any>;
  showCookies?: boolean
  showPartedDownloadRetry?: boolean,
  allowNone?: boolean
  qualityOptions: TwitchQualityItem[]
  strings: TwitchTabString
}

export type TwitchQualityItem = {
  quality: string,
  description: string
}


export type TwitchTabString = {
  platform: string,
  quality: string,
  qualityPlaceholder: string,
  qualityDescription: string,
  authToken: string,
  authTokenPlaceholder: string,
  authTokenDescription: string | React.ReactNode,
  part: string,
  partDescription: any,
  cookieString: string,
  cookieDescription: any,
}


export const TwitchTabContent = ({
                                   controlPrefix,
                                   control,
                                   showCookies,
                                   showPartedDownloadRetry,
                                   qualityOptions,
                                   allowNone = false,
                                   strings
                                 }: TwitchConfigProps) => {
  {
    return (
        <div className="mt-6 space-y-6 fade-in">
          <FormField
              control={control}
              name={controlPrefix ? `${controlPrefix}.quality` : "quality"}
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{strings.quality}</FormLabel>
                    <Select defaultValue={field.value}
                            onValueChange={field.onChange}
                            placeholder={strings.qualityPlaceholder}
                            allowNone={allowNone}
                            options={
                              qualityOptions.map((quality) => (
                                  <SelectItem key={quality.quality} value={quality.quality}>
                                    {quality.description}
                                  </SelectItem>
                              ))
                            }/>
                    <FormDescription>
                      {strings.qualityDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />
          {
              showPartedDownloadRetry && <FormField
                  control={control}
                  name={controlPrefix ? `${controlPrefix}.partedDownloadRetry` : "partedDownloadRetry"}
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>{strings.part}</FormLabel>
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
                          {strings.partDescription}
                        </FormDescription>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
          }

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
              showCookies && (
                  <CookiesFormfield title={strings.cookieString} description={strings.cookieDescription}
                                    name={controlPrefix ? `${controlPrefix}.cookies` : "cookies"} control={control}
                  />)
          }
        </div>
    )
  }
}