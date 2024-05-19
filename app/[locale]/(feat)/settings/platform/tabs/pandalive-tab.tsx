import {Control} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import Select from "@/app/components/empty-select";
import {SelectItem} from "@/components/new-york/ui/select";
import {Input} from "@/components/new-york/ui/input";
import React from "react";
import {CookiesFormfield} from "@/app/[locale]/(feat)/settings/components/form/cookies-formfield";


interface PandaliveConfigProps {
  controlPrefix?: string
  control: Control<any>;
  showCookies?: boolean
  showPartedDownloadRetry?: boolean,
  allowNone?: boolean
  qualityOptions: PandaliveQualityItem[]
  strings: PandaliveTabString
}

export type PandaliveQualityItem = {
  quality: string,
  description: string
}


export type PandaliveTabString = {
  platform: string,
  quality: string,
  qualityPlaceholder: string,
  qualityDescription: string,
  part: string,
  partDescription: any,
  cookieString: string,
  cookieDescription: any,
}


export const PandaliveTabContent = ({
                                      controlPrefix,
                                      control,
                                      showCookies,
                                      showPartedDownloadRetry,
                                      qualityOptions,
                                      allowNone = false,
                                      strings
                                    }: PandaliveConfigProps) => {
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