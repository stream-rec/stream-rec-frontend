import {FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import Select from "@/app/components/empty-select";
import {SelectItem} from "@/components/new-york/ui/select";
import React from "react";
import {
  PlatformTabContent,
  PlatformTabContentProps,
  PlatformTabContentStrings
} from "@/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";


type PandaTvConfigProps = {
  allowNone?: boolean
  qualityOptions: PandaTvQualityItem[]
} & PlatformTabContentProps<PandaTvTabString>

export type PandaTvQualityItem = {
  quality: string,
  description: string
}

export type PandaTvTabString = {
  quality: string,
  qualityPlaceholder: string,
  qualityDescription: string,
} & PlatformTabContentStrings


export const PandaTvTabContent = ({
                                      controlPrefix,
                                      control,
                                      showFetchDelay,
                                      showCookies,
                                      showPartedDownloadRetry,
                                      qualityOptions,
                                      allowNone = false,
                                      strings
                                  }: PandaTvConfigProps) =>


    <PlatformTabContent control={control} controlPrefix={controlPrefix} showCookies={showCookies}
                        showPartedDownloadRetry={showPartedDownloadRetry} strings={strings} showFetchDelay={showFetchDelay}>
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
    </PlatformTabContent>