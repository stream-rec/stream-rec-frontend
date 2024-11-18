import {FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import Select from "@/src/app/components/empty-select";
import {SelectItem} from "@/src/components/new-york/ui/select";
import React from "react";
import {PlatformTabContent, PlatformTabContentProps} from "@/src/app/[locale]/(feat)/settings/platform/tabs/common-platform-tab";
import {PandaTvQualityItem, PandaTvTabString} from "@/src/app/hooks/translations/pandatv-translations";


type PandaTvConfigProps = {
  allowNone?: boolean
  qualityOptions: PandaTvQualityItem[]
} & PlatformTabContentProps<PandaTvTabString>

export const PandaTvTabContent = ({
                                    controlPrefix,
                                    control,
                                    showFetchDelay,
                                    showCookies,
                                    showPartedDownloadRetry,
                                    showDownloadCheckInterval,
                                    qualityOptions,
                                    allowNone = false,
                                    strings
                                  }: PandaTvConfigProps) =>


    <PlatformTabContent control={control} controlPrefix={controlPrefix} showCookies={showCookies}
                        showPartedDownloadRetry={showPartedDownloadRetry} strings={strings} showFetchDelay={showFetchDelay}
                        showDownloadCheckInterval={showDownloadCheckInterval}>
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