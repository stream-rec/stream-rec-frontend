"use client";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm, useFormState} from "react-hook-form"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/new-york/ui/select";
import {Input} from "@/src/components/new-york/ui/input";
import React, {useCallback, useEffect, useState} from "react";
import {DanmuFlagFormfield} from "@/src/app/[locale]/(feat)/settings/components/form/danmu-flag-formfield";
import {OutputFolderFormField} from "@/src/app/[locale]/(feat)/settings/components/form/output-folder-formfield";
import {OutputFilenameFormfield} from "@/src/app/[locale]/(feat)/settings/components/form/output-filename-formfield";
import {OutputFileFormatFormfield} from "@/src/app/[locale]/(feat)/settings/components/form/output-file-format-formfield";
import {convertToBytes, convertToSeconds, DurationUnit, FileSizeUnit, formatBytes, formatSeconds} from "@/src/app/utils/conversions";
import {GlobalConfig, globalConfigSchema} from "@/src/lib/data/config/definitions";
import {LoadingButton} from "@/src/components/new-york/ui/loading-button";
import {RestartNeededHoverCard} from "@/src/app/[locale]/(feat)/settings/components/restart-needed-hover-card";
import {toast} from "sonner";
import {GlobalSettingsTranslations} from "@/src/app/hooks/translations/global-settings-translations";
import {FlagFormField} from "@/src/app/[locale]/(feat)/settings/components/form/flag-form-field";
import {KotlinEngineFields} from "@/src/app/[locale]/(feat)/settings/(global)/kotlin-engine-fields";
import {FfmpegBasedEngineFields} from "@/src/app/[locale]/(feat)/settings/(global)/ffmpeg-based-engine-fields";

type GlobalFormProps = {
  appConfig: GlobalConfig,
  update: (config: GlobalConfig) => Promise<void>,
  strings: GlobalSettingsTranslations
}

const engines = ["kotlin", "ffmpeg", "streamlink"]

export function GlobalForm({appConfig, update, strings}: GlobalFormProps) {
  const [minPartSizeFormat, setMinPartSizeFormat] = useState(FileSizeUnit.B)
  const [maxPartSizeFormat, setMaxPartSizeFormat] = useState(FileSizeUnit.B)

  const [maxPartDurationFormat, setMaxPartDurationFormat] = useState(DurationUnit.SECONDS)

  const [engine, setEngine] = useState(appConfig.engine)

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
    data.minPartSize = data.minPartSize ? Math.round(convertToBytes(minPartSizeFormat, data.minPartSize)) : data.minPartSize
    data.maxPartSize = data.maxPartSize ? Math.round(convertToBytes(maxPartSizeFormat, data.maxPartSize)) : data.maxPartSize
    if (data.maxPartDuration) {
      if (data.maxPartDuration === 0) {
        data.maxPartDuration = undefined
      } else {
        data.maxPartDuration = Math.round(convertToSeconds(maxPartDurationFormat, data.maxPartDuration))
      }
    }

    toast.promise(update(data), {
      loading: "Updating config...",
      success: () => {
        return "Config updated";
      },
      error: (error) => toast.error(error.message)
    })
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
                    <Select onValueChange={(e) => {
                      setEngine(e)
                      field.onChange(e)
                    }} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="{Select a download engine}"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          engines.map((engine, index) => (
                              <SelectItem key={index} value={engine}>{engine}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {strings.engineDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          {engine === "kotlin" && (<KotlinEngineFields form={form} strings={{
            enableFix: strings.enableFixFlvTitle,
            enableFixDescription: strings.enableFixFlvDescription,
            enableFlvDuplicateTagFilteringTitle: strings.enableFlvDuplicateTagFilteringTitle,
            enableFlvDuplicateTagFilteringDescription: strings.enableFlvDuplicateTagFilteringDescription,
            combineHlsFiles: strings.combineHlsFiles,
            combineHlsFilesDescription: strings.combineHlsFilesDescription
          }}/>)}

          {(engine === "ffmpeg" || engine === "streamlink") && (<FfmpegBasedEngineFields form={form} strings={{
            useBuiltinSegmenterTitle: strings.useBuiltInSegmenter,
            useBuiltInSegmenterDescription: strings.useBuiltInSegmenterDescription,
            useBuiltInSegmenterNote: strings.useBuiltInSegmenterNote,
            useBuiltInSegmenterNoteDescription: strings.useBuiltInSegmenterNoteDescription,
            exitOnErrorTitle: strings.exitOnErrorTitle,
            exitOnErrorDescription: strings.exitOnErrorDescription
          }}/>)}

          <DanmuFlagFormfield control={form.control} title={strings.danmu} description={strings.danmuDescription}/>


          <FlagFormField control={form.control} fieldName={"deleteFilesAfterUpload"} title={strings.deleteFiles}
                         description={strings.deleteFilesDescription}
                         ariaLabel={"File deletion switch"}/>


          <OutputFolderFormField control={form.control} name={strings.outputFolder}
                                 description={strings.outputFolderDescription} placeholderDescription={strings.outputFolderPlaceholderDescription}/>
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