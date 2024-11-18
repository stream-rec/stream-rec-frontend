import {Control} from "react-hook-form";
import React from "react";
import {CookiesFormfield} from "@/src/app/[locale]/(feat)/settings/components/form/cookies-formfield";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import {Input} from "@/src/components/new-york/ui/input";
import {Badge} from "@/src/components/new-york/ui/badge";

export interface PlatformTabContentProps<T extends PlatformTabContentStrings> {
  controlPrefix?: string
  control: Control<any>
  showFetchDelay?: boolean
  showPartedDownloadRetry?: boolean
  showCookies?: boolean
  showDownloadCheckInterval?: boolean
  strings: T
  children?: React.ReactNode
}

export interface PlatformTabContentStrings {
  platform: string,
  fetchDelayTitle: string
  fetchDelayDescription: string | React.ReactNode
  partTitle: string
  partDescription: string | React.ReactNode
  cookieTitle: string
  cookieDescription: string | React.ReactNode
  downloadIntervalCheckTitle: string
  downloadIntervalCheckDescription: string | React.ReactNode
}


export const PlatformTabContent = ({
                                     controlPrefix,
                                     control,
                                     showFetchDelay,
                                     showPartedDownloadRetry,
                                     showCookies,
                                     showDownloadCheckInterval = false,
                                     strings,
                                     children,
                                   }: PlatformTabContentProps<any>) => {

  console.log("PlatformTabContentProps", showDownloadCheckInterval);

  return (
      <div className="mt-6 space-y-6 fade-in">
        {children}

        {
            showDownloadCheckInterval && (
                <FormField
                    control={control}
                    name={controlPrefix ? `${controlPrefix}.downloadCheckInterval` : "downloadCheckInterval"}
                    render={({field}) => (
                        <FormItem>
                          <FormLabel>
                            {strings.downloadIntervalCheckTitle}
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="60" type={"number"} step={1} value={field.value}
                                   onChange={event => {
                                     if (event.target.value === "") {
                                       field.onChange(null);
                                     } else {
                                       field.onChange(parseInt(event.target.value));
                                     }
                                   }}/>

                          </FormControl>
                          <FormDescription>
                            {strings.downloadIntervalCheckDescription}
                          </FormDescription>
                          <FormMessage/>
                        </FormItem>
                    )}
                />)
        }

        {
            showFetchDelay && (
                <FormField
                    control={control}
                    name={controlPrefix ? `${controlPrefix}.fetchDelay` : "fetchDelay"}
                    render={({field}) => (
                        <FormItem>
                          <FormLabel>
                            <div className={"flex flex-row items-center gap-x-3"}>
                              {strings.fetchDelayTitle}
                              <Badge>Experimental</Badge>
                            </div>
                          </FormLabel>
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
                            {strings.fetchDelayDescription}
                          </FormDescription>
                          <FormMessage/>
                        </FormItem>
                    )}
                />)
        }

        {
            showPartedDownloadRetry && (
                <FormField
                    control={control}
                    name={controlPrefix ? `${controlPrefix}.partedDownloadRetry` : "partedDownloadRetry"}
                    render={({field}) => (
                        <FormItem>
                          <FormLabel>{strings.partTitle}</FormLabel>
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

        {showCookies && (
            <CookiesFormfield
                title={strings.cookieTitle}
                description={strings.cookieDescription}
                name={controlPrefix ? `${controlPrefix}.cookies` : "cookies"}
                control={control}
            />
        )}
      </div>
  );
};
