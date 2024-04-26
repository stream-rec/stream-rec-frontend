import {Control} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import React from "react";
import {Input} from "@/components/new-york/ui/input";
import {OutputFilenameFormfield} from "@/app/[locale]/dashboard/settings/components/form/output-filename-formfield";
import {OutputFileFormatFormfield} from "@/app/[locale]/dashboard/settings/components/form/output-file-format-formfield";
import {OutputFolderFormField} from "@/app/[locale]/dashboard/settings/components/form/output-folder-formfield";
import {DanmuFlagFormfield} from "@/app/[locale]/dashboard/settings/components/form/danmu-flag-formfield";
import {AutosizeTextarea} from "@/components/new-york/ui/autosize-textarea";

type BaseDownloadTabProps = {
  controlPrefix?: string;
  control: Control<any>;
  showDanmu?: boolean;
  showCookies?: boolean;
  showMaxBitrate?: boolean;
  strings: BaseDownloadTabString
}

export type BaseDownloadTabString = {
  danmu: string,
  danmuDescription: string,
  cookies: string,
  cookiesDescription: string,
  maxBitrate: string,
  maxBitrateDescription: string,
  outputFolder: string,
  outputFolderDescription: string | React.ReactNode,
  outputFilename: string,
  outputFilenameDescription: string | React.ReactNode,
  outputFileFormat: string,
  outputFileFormatDescription: string | React.ReactNode
}

export function BaseDownloadTab({
                                  controlPrefix = "downloadConfig",
                                  control,
                                  strings,
                                  showDanmu = true,
                                  showCookies = true,
                                  showMaxBitrate = true
                                }: BaseDownloadTabProps) {

  return (
      <>
        <div className="mt-6 space-y-6">
          {
              showDanmu && (
                  <DanmuFlagFormfield controlPrefix={controlPrefix} control={control} title={strings.danmu} description={strings.danmuDescription}/>
              )
          }
          {
              showCookies && (
                  <FormField
                      control={control}
                      name={controlPrefix ? `${controlPrefix}.cookies` : "cookies"}
                      render={({field}) => (
                          <FormItem>
                            <FormLabel>{strings.cookies}</FormLabel>
                            <FormControl>
                              <AutosizeTextarea id={controlPrefix ? `${controlPrefix}.cookies` : "cookies"} placeholder="Cookies" {...field}/>
                            </FormControl>
                            <FormDescription>
                              {strings.cookiesDescription}
                            </FormDescription>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />
              )
          }
          {
              showMaxBitrate && (
                  <FormField
                      control={control}
                      name={controlPrefix ? `${controlPrefix}.maxBitRate` : "maxBitRate"}
                      render={({field}) => (
                          <FormItem>
                            <FormLabel>{strings.maxBitrate}</FormLabel>
                            <FormControl>
                              <Input placeholder="10000" type={"number"} step={100} value={field.value}
                                     onChange={event => {
                                       if (event.target.value === "") {
                                         field.onChange(null);
                                       } else {
                                         field.onChange(parseInt(event.target.value));
                                       }
                                     }}/>

                            </FormControl>
                            <FormDescription>
                              {strings.maxBitrateDescription}
                            </FormDescription>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />
              )
          }
          {/*<FormField*/}
          {/*    control={control}*/}
          {/*    name="partedDownloadRetry"*/}
          {/*    render={({field}) => (*/}
          {/*        <FormItem>*/}
          {/*          <FormLabel>Parted download retry</FormLabel>*/}
          {/*          <FormControl>*/}
          {/*            <Input type={"number"} placeholder={"15"} value={field.value} onChange={e => {*/}
          {/*              if (e.target.value === "") {*/}
          {/*                field.onChange(null);*/}
          {/*              } else {*/}
          {/*                field.onChange(parseInt(e.target.value));*/}
          {/*              }*/}
          {/*            }}></Input>*/}
          {/*          </FormControl>*/}
          {/*          <FormDescription>*/}
          {/*            Delay in seconds for each part download retry. Default is 15 seconds.*/}
          {/*          </FormDescription>*/}
          {/*          <FormMessage/>*/}
          {/*        </FormItem>*/}
          {/*    )}*/}
          {/*/>*/}


          <OutputFolderFormField control={control} controlPrefix={controlPrefix} name={strings.outputFolder}
                                 description={strings.outputFolderDescription}/>
          <OutputFilenameFormfield control={control} controlPrefix={controlPrefix} name={strings.outputFilename}
                                   description={strings.outputFilenameDescription}/>
          <OutputFileFormatFormfield control={control} controlPrefix={controlPrefix} name={strings.outputFileFormat}
                                     description={strings.outputFileFormatDescription}/>
        </div>
      </>
  )
}