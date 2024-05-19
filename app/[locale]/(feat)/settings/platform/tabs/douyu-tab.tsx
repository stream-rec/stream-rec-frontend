import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Select as OriginalSelect, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/new-york/ui/select";
import {Input} from "@/components/new-york/ui/input";
import React from "react";
import {Control} from "react-hook-form";
import {douyuCdns} from "@/lib/data/platform/douyu/constants";
import Select from "@/app/components/empty-select";
import {CookiesFormfield} from "@/app/[locale]/(feat)/settings/components/form/cookies-formfield";


export type DouyuQuality = {
  quality: string,
  description: string
}

export type DouyuTabProps = {
  controlPrefix?: string;
  control: Control<any>;
  showCookies?: boolean
  showPartedDownloadRetry?: boolean
  strings: DouyuTabString,
  qualityOptions: DouyuQuality[]
  allowNone?: boolean
}

export type DouyuTabString = {
  platform: string,
  cdn: string,
  cdnDescription: string,
  cdnDefault: string,
  quality: string,
  qualityDescription: string,
  qualityDefault: string,
  part: string,
  partDescription: string | React.ReactNode,
  cookies: string,
  cookiesDescription: string | React.ReactNode,
}


export default function DouyuTabContent({
                                          controlPrefix,
                                          control,
                                          showCookies,
                                          showPartedDownloadRetry,
                                          strings,
                                          qualityOptions,
                                          allowNone = false
                                        }: DouyuTabProps) {

  return (
      <>
        <div className="mt-6 space-y-6">
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

          {
              showPartedDownloadRetry && (
                  <FormField
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
                  />)
          }

          {
              showCookies && (
                  <CookiesFormfield title={strings.cookies} description={strings.cookiesDescription}
                                    name={controlPrefix ? `${controlPrefix}.cookies` : "cookies"} control={control}
                  />
              )
          }
        </div>
      </>
  )
}