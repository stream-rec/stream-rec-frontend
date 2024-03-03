import {Control} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Textarea} from "@/components/new-york/ui/textarea";
import React from "react";
import {Input} from "@/components/new-york/ui/input";
import {OutputFolderFormField} from "@/app/dashboard/settings/components/form/output-folder-formfield";
import {OutputFilenameFormfield} from "@/app/dashboard/settings/components/form/output-filename-formfield";
import {OutputFileFormatFormfield} from "@/app/dashboard/settings/components/form/output-file-format-formfield";
import {DanmuFlagFormfield} from "@/app/dashboard/settings/components/form/danmu-flag-formfield";
import {DownloadConfig} from "@/app/lib/data/streams/definitions";

type BaseDownloadTabProps = {
  control: Control<DownloadConfig, any, any>;
  showDanmu?: boolean;
  showCookies?: boolean;
  showMaxBitrate?: boolean;
}

export function BaseDownloadTab({control, showDanmu = true, showCookies = true, showMaxBitrate = true}: BaseDownloadTabProps) {

  return (
      <>
        <div className="mt-6 space-y-6">
          {
              showDanmu && (
                  <DanmuFlagFormfield control={control}/>
              )
          }
          {
              showCookies && (
                  <FormField
                      control={control}
                      name="cookies"
                      render={({field}) => (
                          <FormItem>
                            <FormLabel>Cookies</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Cookies" {...field}></Textarea>
                            </FormControl>
                            <FormDescription>
                              Cookies used to retrieve the stream.
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
                      name="maxBitrate"
                      render={({field}) => (
                          <FormItem>
                            <FormLabel>Max record bitrate</FormLabel>
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
                              The maximum bitrate to record the stream. The tool will automatically adjust the closest bitrate available for download.
                            </FormDescription>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />
              )
          }
          <FormField
              control={control}
              name="partedDownloadRetry"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Parted download retry</FormLabel>
                    <FormControl>
                      <Input type={"number"} placeholder={"15"} value={field.value} onChange={e => {
                        if (e.target.value === "") {
                          field.onChange(null);
                        } else {
                          field.onChange(parseInt(e.target.value));
                        }
                      }}></Input>
                    </FormControl>
                    <FormDescription>
                      Delay in seconds for each part download retry. Default is 15 seconds.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <OutputFolderFormField control={control}/>
          <OutputFilenameFormfield control={control}/>
          <OutputFileFormatFormfield control={control}/>
        </div>
      </>
  )
}