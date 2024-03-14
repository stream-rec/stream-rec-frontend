"use client";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm, useFormState} from "react-hook-form"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/new-york/ui/select";
import {Input} from "@/components/new-york/ui/input";
import {Switch} from "@/components/new-york/ui/switch";
import React, {useCallback, useEffect, useState} from "react";
import {toastData} from "@/app/utils/toast";
import {DanmuFlagFormfield} from "@/app/[locale]/dashboard/settings/components/form/danmu-flag-formfield";
import {OutputFolderFormField} from "@/app/[locale]/dashboard/settings/components/form/output-folder-formfield";
import {OutputFilenameFormfield} from "@/app/[locale]/dashboard/settings/components/form/output-filename-formfield";
import {OutputFileFormatFormfield} from "@/app/[locale]/dashboard/settings/components/form/output-file-format-formfield";
import {convertToBytes, convertToSeconds, DurationUnit, FileSizeUnit, formatBytes, formatSeconds} from "@/app/utils/conversions";
import {GlobalConfig, globalConfigSchema} from "@/lib/data/config/definitions";
import {LoadingButton} from "@/components/new-york/ui/loading-button";

type GlobalFormProps = {
  appConfig: GlobalConfig,
  update: (config: GlobalConfig) => Promise<void>,
  globalStrings: GlobalFormStrings
}

export type GlobalFormStrings = {
  submitMessage: string
  submitErrorMessage: string
  engine: string
  engineDescription: string
  danmu: string
  danmuDescription: string | React.ReactNode
  deleteFiles: string
  deleteFilesDescription: any
  outputFolder: string
  outputFolderDescription: string | React.ReactNode
  outputFilename: string
  outputFilenameDescription: string | React.ReactNode
  outputFormat: string
  outputFormatDescription: string | React.ReactNode
  minPart: string
  minPartDescription: string
  minPartDefault: string
  maxPart: string
  maxPartDefault: string
  maxPartDescription: string
  maxPartDuration: string
  maxPartDurationDefault: string
  maxPartDurationDescription: string | React.ReactNode
  maxConcurrentDownload: string
  maxConcurrentDownloadDescription: string | React.ReactNode
  maxConcurrentUpload: string
  maxConcurrentUploadDescription: string | React.ReactNode
  downloadRetryDelay: string
  downloadRetryDelayDescription: string
  maxDownloadRetries: string
  maxDownloadRetriesDescription: string
  save: string,
  timeFormats: {
    seconds: string
    minutes: string
    hours: string
    days: string
  }
}


export function GlobalForm({appConfig, update, globalStrings}: GlobalFormProps) {
  const [minPartSizeFormat, setMinPartSizeFormat] = useState(FileSizeUnit.B)
  const [maxPartSizeFormat, setMaxPartSizeFormat] = useState(FileSizeUnit.B)

  const [maxPartDurationFormat, setMaxPartDurationFormat] = useState(DurationUnit.SECONDS)

  const form = useForm<GlobalConfig>({
    resolver: zodResolver(globalConfigSchema),
    defaultValues: appConfig,
    mode: "onChange",
  })

  const {isSubmitting} = useFormState({control: form.control})

  const formatAndSetValues = useCallback((value: number, format: string, setFormat: Function, field: string) => {
    if (value !== undefined && format === FileSizeUnit.B) {
      const {unit, size} = formatBytes(value)
      setFormat(unit)
      // @ts-ignore
      form.setValue(field, size)
    }
  }, [form]);

  useEffect(() => {
    formatAndSetValues(appConfig.minPartSize, minPartSizeFormat, setMinPartSizeFormat, "minPartSize")
    formatAndSetValues(appConfig.maxPartSize, maxPartSizeFormat, setMaxPartSizeFormat, "maxPartSize")

    if (appConfig.maxPartDuration && maxPartDurationFormat === DurationUnit.SECONDS) {
      const {unit, value} = formatSeconds(appConfig.maxPartDuration)
      setMaxPartDurationFormat(unit)
      form.setValue("maxPartDuration", value)
    }
  }, [appConfig])

  async function onSubmit(data: GlobalConfig) {
    if (data.minPartSize !== undefined) {
      data.minPartSize = Math.round(convertToBytes(minPartSizeFormat, data.minPartSize))
    }
    if (data.maxPartSize !== undefined) {
      data.maxPartSize = Math.round(convertToBytes(maxPartSizeFormat, data.maxPartSize))
    }
    if (data.maxPartDuration) {
      if (data.maxPartDuration === 0) {
        data.maxPartDuration = undefined
      } else {
        data.maxPartDuration = Math.round(convertToSeconds(maxPartDurationFormat, data.maxPartDuration))
      }
    }
    try {
      await update(data)
      toastData(globalStrings.submitMessage, data, "code")
    } catch (e) {
      console.error(e)
      toastData(globalStrings.submitErrorMessage, (e as Error).message, "error")
    }
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
              control={form.control}
              name="engine"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{globalStrings.engine}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="{Select a download engine}"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ffmpeg">ffmpeg</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {globalStrings.engineDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <DanmuFlagFormfield control={form.control} title={globalStrings.danmu} description={globalStrings.danmuDescription}/>

          <FormField
              control={form.control}
              name="deleteFilesAfterUpload"
              render={({field}) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{globalStrings.deleteFiles}</FormLabel>
                      <FormDescription>
                        {globalStrings.deleteFilesDescription}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          arial-label="File deletion switch"
                      />
                    </FormControl>
                  </FormItem>
              )}
          />

          <OutputFolderFormField control={form.control} name={globalStrings.outputFolder}
                                 description={globalStrings.outputFolderDescription}/>
          <OutputFilenameFormfield control={form.control} name={globalStrings.outputFilename}
                                   description={globalStrings.outputFilenameDescription}/>
          <OutputFileFormatFormfield control={form.control} name={globalStrings.outputFormat}
                                     description={globalStrings.outputFormatDescription}/>

          <FormField
              control={form.control}
              name="minPartSize"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{globalStrings.minPart}</FormLabel>
                    <Select
                        onValueChange={(newValue) => {
                          if (!newValue && newValue.length === 0) {
                            return;
                          }
                          // try to parse as file size unit
                          setMinPartSizeFormat(newValue as FileSizeUnit);
                        }}
                        defaultValue={minPartSizeFormat}
                        value={minPartSizeFormat}
                    >
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Input
                              type="number"
                              placeholder=""
                              {...field}
                              value={field.value}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                field.onChange(Number(newValue));
                              }}
                          />
                        </FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={globalStrings.minPartDefault}/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={FileSizeUnit.B}>B</SelectItem>
                          <SelectItem value={FileSizeUnit.KB}>KB</SelectItem>
                          <SelectItem value={FileSizeUnit.MB}>MB</SelectItem>
                          <SelectItem value={FileSizeUnit.GB}>GB</SelectItem>
                        </SelectContent>
                      </div>
                      <FormDescription>
                        {globalStrings.minPartDescription}
                      </FormDescription>
                    </Select>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="maxPartSize"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{globalStrings.maxPart}</FormLabel>
                    <Select
                        onValueChange={(newValue) => {
                          if (!newValue && newValue.length === 0) {
                            return;
                          }
                          setMaxPartSizeFormat(newValue as FileSizeUnit);
                        }}
                        value={maxPartSizeFormat}
                    >
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Input
                              type="number"
                              placeholder=""
                              {...field}
                              value={field.value}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                field.onChange(Number(newValue));
                              }}
                          />
                        </FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={globalStrings.maxPartDefault}/>
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value={FileSizeUnit.B}>B</SelectItem>
                          <SelectItem value={FileSizeUnit.KB}>KB</SelectItem>
                          <SelectItem value={FileSizeUnit.MB}>MB</SelectItem>
                          <SelectItem value={FileSizeUnit.GB}>GB</SelectItem>
                        </SelectContent>
                      </div>
                      <FormDescription>
                        {globalStrings.maxPartDescription}
                      </FormDescription>
                    </Select>
                    <FormMessage/>
                  </FormItem>
              )}
          />


          <FormField
              control={form.control}
              name="maxPartDuration"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{globalStrings.maxPartDuration}</FormLabel>
                    <Select
                        onValueChange={(newValue) => {
                          if (!newValue && newValue.length === 0) {
                            return;
                          }
                          setMaxPartDurationFormat(newValue as DurationUnit);
                        }}
                        value={maxPartDurationFormat}
                    >
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Input
                              type="number"
                              placeholder=""
                              {...field}
                              value={
                                field.value ? field.value : undefined
                              }
                              onChange={(e) => {
                                const newValue = e.target.value;
                                const numberValue = Number(newValue);
                                if (isNaN(numberValue)) {
                                  return;
                                }
                                field.onChange(numberValue);
                              }}
                          />
                        </FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={globalStrings.maxPartDurationDefault}/>
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value={DurationUnit.SECONDS}>{globalStrings.timeFormats.seconds}</SelectItem>
                          <SelectItem value={DurationUnit.MINUTES}>{globalStrings.timeFormats.minutes}</SelectItem>
                          <SelectItem value={DurationUnit.HOURS}>{globalStrings.timeFormats.hours}</SelectItem>
                          <SelectItem value={DurationUnit.DAYS}>{globalStrings.timeFormats.days}</SelectItem>
                        </SelectContent>
                      </div>
                      <FormDescription>
                        {globalStrings.maxPartDurationDescription}
                      </FormDescription>
                    </Select>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="maxConcurrentDownloads"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{globalStrings.maxConcurrentDownload}</FormLabel>
                    <FormControl>
                      <Input type="number"
                             placeholder="5"
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             value={field.value}/>
                    </FormControl>
                    <FormDescription>
                      {globalStrings.maxConcurrentDownloadDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="maxConcurrentUploads"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{globalStrings.maxConcurrentUpload}</FormLabel>
                    <FormControl>
                      <Input type="number"
                             onChange={(e) => field.onChange(parseInt(e.target.value))}
                             value={field.value}
                             placeholder="3"/>
                    </FormControl>
                    <FormDescription>
                      {globalStrings.maxConcurrentUploadDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="downloadRetryDelay"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{globalStrings.downloadRetryDelay}</FormLabel>
                    <FormControl>
                      <Input type="number"
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             value={field.value}
                             placeholder="10"/>
                    </FormControl>
                    <FormDescription>
                      {globalStrings.downloadRetryDelayDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="maxDownloadRetries"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{globalStrings.maxDownloadRetries}</FormLabel>
                    <FormControl>
                      <Input type="number"
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             value={field.value}
                             placeholder="3"/>
                    </FormControl>
                    <FormDescription>
                      {globalStrings.maxDownloadRetriesDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <LoadingButton type="submit" loading={isSubmitting}>{globalStrings.save}</LoadingButton>
        </form>
      </Form>
  )
}