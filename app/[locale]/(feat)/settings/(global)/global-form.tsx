"use client";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm, useFormState} from "react-hook-form"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/new-york/ui/select";
import {Input} from "@/components/new-york/ui/input";
import {Switch} from "@/components/new-york/ui/switch";
import React, {useCallback, useEffect, useState} from "react";
import {toastData} from "@/app/utils/toast";
import {DanmuFlagFormfield} from "@/app/[locale]/(feat)/settings/components/form/danmu-flag-formfield";
import {OutputFolderFormField} from "@/app/[locale]/(feat)/settings/components/form/output-folder-formfield";
import {OutputFilenameFormfield} from "@/app/[locale]/(feat)/settings/components/form/output-filename-formfield";
import {OutputFileFormatFormfield} from "@/app/[locale]/(feat)/settings/components/form/output-file-format-formfield";
import {convertToBytes, convertToSeconds, DurationUnit, FileSizeUnit, formatBytes, formatSeconds} from "@/app/utils/conversions";
import {GlobalConfig, globalConfigSchema} from "@/lib/data/config/definitions";
import {LoadingButton} from "@/components/new-york/ui/loading-button";
import {BuiltInSegmenterFlagFormField} from "@/app/[locale]/(feat)/settings/components/form/built-in-segmenter-flag-form-field";
import {RestartNeededHoverCard} from "@/app/[locale]/(feat)/settings/components/restart-needed-hover-card";

type GlobalFormProps = {
  appConfig: GlobalConfig,
  update: (config: GlobalConfig) => Promise<void>,
  strings: GlobalFormStrings
}

export type GlobalFormStrings = {
  alertTitle: string
  alertDescription: string
  submitMessage: string
  submitErrorMessage: string
  engine: string
  engineDescription: string | React.ReactNode
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
  downloadCheckInterval: string
  downloadCheckIntervalDescription: string
  maxDownloadRetries: string
  maxDownloadRetriesDescription: string,
  useBuiltInSegmenter: string,
  useBuiltInSegmenterDescription: string | React.ReactNode,
  useBuiltInSegmenterNote: string,
  useBuiltInSegmenterNoteDescription: string | React.ReactNode,
  save: string,
  timeFormats: {
    seconds: string
    minutes: string
    hours: string
    days: string
  }
}


export function GlobalForm({appConfig, update, strings}: GlobalFormProps) {
  const [minPartSizeFormat, setMinPartSizeFormat] = useState(FileSizeUnit.B)
  const [maxPartSizeFormat, setMaxPartSizeFormat] = useState(FileSizeUnit.B)

  const [maxPartDurationFormat, setMaxPartDurationFormat] = useState(DurationUnit.SECONDS)

  const form = useForm<GlobalConfig>({
    resolver: zodResolver(globalConfigSchema),
    defaultValues: appConfig,
    mode: "onChange",
  })

  const {isSubmitting, isValid} = useFormState({control: form.control})

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      toastData(strings.submitMessage, data, "code")
    } catch (e) {
      console.error(e)
      toastData(strings.submitErrorMessage, (e as Error).message, "error")
    }
  }

  const AlertCard = (children: React.ReactNode) => {
    return (
        <div className="flex flex-row gap-x-2 items-center">
          {children}
          <RestartNeededHoverCard title={strings.alertTitle} description={strings.alertDescription}/>
        </div>
    );
  }


  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
              control={form.control}
              name="engine"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{strings.engine}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="{Select a download engine}"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ffmpeg">ffmpeg</SelectItem>
                        <SelectItem value="streamlink">streamlink</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {strings.engineDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <DanmuFlagFormfield control={form.control} title={strings.danmu} description={strings.danmuDescription}/>

          <FormField
              control={form.control}
              name="deleteFilesAfterUpload"
              render={({field}) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{strings.deleteFiles}</FormLabel>
                      <FormDescription>
                        {strings.deleteFilesDescription}
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

          <BuiltInSegmenterFlagFormField control={form.control} title={strings.useBuiltInSegmenter}
                                         description={strings.useBuiltInSegmenterDescription} note={strings.useBuiltInSegmenterNote}
                                         noteDescription={strings.useBuiltInSegmenterNoteDescription}/>

          <OutputFolderFormField control={form.control} name={strings.outputFolder}
                                 description={strings.outputFolderDescription}/>
          <OutputFilenameFormfield control={form.control} name={strings.outputFilename}
                                   description={strings.outputFilenameDescription}/>
          <OutputFileFormatFormfield control={form.control} name={strings.outputFormat}
                                     description={strings.outputFormatDescription}/>

          <FormField
              control={form.control}
              name="minPartSize"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{strings.minPart}</FormLabel>
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
                          <SelectValue placeholder={strings.minPartDefault}/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={FileSizeUnit.B}>{FileSizeUnit.B}</SelectItem>
                          <SelectItem value={FileSizeUnit.KB}>{FileSizeUnit.KB}</SelectItem>
                          <SelectItem value={FileSizeUnit.MB}>{FileSizeUnit.MB}</SelectItem>
                          <SelectItem value={FileSizeUnit.GB}>{FileSizeUnit.GB}</SelectItem>
                        </SelectContent>
                      </div>
                      <FormDescription>
                        {strings.minPartDescription}
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
                    <FormLabel>{strings.maxPart}</FormLabel>
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
                          <SelectValue placeholder={strings.maxPartDefault}/>
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value={FileSizeUnit.B}>{FileSizeUnit.B}</SelectItem>
                          <SelectItem value={FileSizeUnit.KB}>{FileSizeUnit.KB}</SelectItem>
                          <SelectItem value={FileSizeUnit.MB}>{FileSizeUnit.MB}</SelectItem>
                          <SelectItem value={FileSizeUnit.GB}>{FileSizeUnit.GB}</SelectItem>
                        </SelectContent>
                      </div>
                      <FormDescription>
                        {strings.maxPartDescription}
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
                    <FormLabel>{strings.maxPartDuration}</FormLabel>
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
                          <SelectValue placeholder={strings.maxPartDurationDefault}/>
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value={DurationUnit.SECONDS}>{strings.timeFormats.seconds}</SelectItem>
                          <SelectItem value={DurationUnit.MINUTES}>{strings.timeFormats.minutes}</SelectItem>
                          <SelectItem value={DurationUnit.HOURS}>{strings.timeFormats.hours}</SelectItem>
                          <SelectItem value={DurationUnit.DAYS}>{strings.timeFormats.days}</SelectItem>
                        </SelectContent>
                      </div>
                      <FormDescription>
                        {strings.maxPartDurationDescription}
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
                    <FormLabel>
                      {AlertCard(strings.maxConcurrentDownload)}
                    </FormLabel>
                    <FormControl>
                      <Input type="number"
                             placeholder="5"
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             value={field.value}/>
                    </FormControl>
                    <FormDescription>
                      {strings.maxConcurrentDownloadDescription}
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
                    <FormLabel>
                      {AlertCard(strings.maxConcurrentUpload)}
                    </FormLabel>
                    <FormControl>
                      <Input type="number"
                             onChange={(e) => field.onChange(parseInt(e.target.value))}
                             value={field.value}
                             placeholder="3"/>
                    </FormControl>
                    <FormDescription>
                      {strings.maxConcurrentUploadDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="downloadCheckInterval"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      {AlertCard(strings.downloadCheckInterval)}
                    </FormLabel>
                    <FormControl>
                      <Input type="number"
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             value={field.value}
                             placeholder="60"/>
                    </FormControl>
                    <FormDescription>
                      {strings.downloadCheckIntervalDescription}
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
                    <FormLabel>
                      {AlertCard(strings.downloadRetryDelay)}
                    </FormLabel>
                    <FormControl>
                      <Input type="number"
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             value={field.value}
                             placeholder="10"/>
                    </FormControl>
                    <FormDescription>
                      {strings.downloadRetryDelayDescription}
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
                    <FormLabel>
                      {AlertCard(strings.maxDownloadRetries)}
                    </FormLabel>
                    <FormControl>
                      <Input type="number"
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             value={field.value}
                             placeholder="3"/>
                    </FormControl>
                    <FormDescription>
                      {strings.maxDownloadRetriesDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <LoadingButton type="submit" loading={isSubmitting} disabled={!isValid}>{strings.save}</LoadingButton>
        </form>
      </Form>
  )
}