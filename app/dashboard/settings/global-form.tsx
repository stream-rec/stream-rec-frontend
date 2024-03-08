"use client";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm, useFormState} from "react-hook-form"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/new-york/ui/select";
import {Button} from "@/components/new-york/ui/button";
import {Input} from "@/components/new-york/ui/input";
import {Switch} from "@/components/new-york/ui/switch";
import {useState} from "react";
import {convertToBytes, convertToSeconds} from "@/app/utils/conversions";
import {OutputFolderFormField} from "@/app/dashboard/settings/components/form/output-folder-formfield";
import {OutputFilenameFormfield} from "@/app/dashboard/settings/components/form/output-filename-formfield";
import {OutputFileFormatFormfield} from "@/app/dashboard/settings/components/form/output-file-format-formfield";
import {DanmuFlagFormfield} from "@/app/dashboard/settings/components/form/danmu-flag-formfield";
import {GlobalConfig, globalConfigSchema} from "@/app/lib/data/config/definitions";
import {toastData} from "@/app/utils/toast";


type GlobalFormProps = {
  appConfig: GlobalConfig,
  update: (config: GlobalConfig) => Promise<void>,
}


export function GlobalForm({appConfig, update}: GlobalFormProps) {
  const [minPartSizeFormat, setMinPartSizeFormat] = useState("B")
  const [maxPartSizeFormat, setMaxPartSizeFormat] = useState("B")

  const [maxPartDurationFormat, setMaxPartDurationFormat] = useState("ss")

  const form = useForm<GlobalConfig>({
    resolver: zodResolver(globalConfigSchema),
    defaultValues: appConfig,
    mode: "onChange",
  })

  const {isSubmitting} = useFormState({control: form.control})

  async function onSubmit(data: GlobalConfig) {
    if (data.minPartSize !== undefined) {
      data.minPartSize = convertToBytes(minPartSizeFormat, data.minPartSize)
    }
    if (data.maxPartSize !== undefined) {
      data.maxPartSize = convertToBytes(maxPartSizeFormat, data.maxPartSize)
    }
    if (data.maxPartDuration !== undefined) {
      if (data.maxPartDuration === 0) {
        data.maxPartDuration = undefined
      } else {
        data.maxPartDuration = convertToSeconds(maxPartDurationFormat, data.maxPartDuration)
      }
    }
    try {
      await update(data)
      toastData("You submitted the following values:", data, "code")
    } catch (e) {
      console.error(e)
      toastData("An error occurred while submitting the form", (e as Error).message, "error")
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
                    <FormLabel>Engine</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a download engine"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ffmpeg">ffmpeg</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The engine used for the download.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <DanmuFlagFormfield control={form.control}/>

          <FormField
              control={form.control}
              name="deleteFilesAfterUpload"
              render={({field}) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Global delete files flag</FormLabel>
                      <FormDescription>
                        Enable files deletion after download, if disabled, files will be kept in the download folder.
                        <br/>
                        <strong>It only works when onPartedDownload or onStreamingFinished callbacks are not set.</strong>
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          arial-label="Enable files deletion after download, if disabled, files will be kept in the download folder. It only works when onPartedDownload or onStreamingFinished callbacks are not set."
                      />
                    </FormControl>
                  </FormItem>
              )}
          />

          <OutputFolderFormField control={form.control}/>
          <OutputFilenameFormfield control={form.control}/>
          <OutputFileFormatFormfield control={form.control}/>

          <FormField
              control={form.control}
              name="minPartSize"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Minimum parted download size</FormLabel>
                    <Select
                        onValueChange={(newValue) => {
                          minPartSizeFormat && setMinPartSizeFormat(newValue);
                        }}
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
                          <SelectValue placeholder="Select a size format"/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="KB">KB</SelectItem>
                          <SelectItem value="MB">MB</SelectItem>
                          <SelectItem value="GB">GB</SelectItem>
                        </SelectContent>
                      </div>
                      <FormDescription>
                        The minimum size of a parted download. If the download size is less than this value, the download will be deleted.
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
                    <FormLabel>Maximum parted download size</FormLabel>
                    <Select
                        onValueChange={(newValue) => {
                          maxPartSizeFormat && setMaxPartSizeFormat(newValue);
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
                          <SelectValue placeholder="Select a size format"/>
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="KB">KB</SelectItem>
                          <SelectItem value="MB">MB</SelectItem>
                          <SelectItem value="GB">GB</SelectItem>
                        </SelectContent>
                      </div>
                      <FormDescription>
                        The maximum size of a parted download. If the download size exceeds this value, the download will be parted.
                        If the value is 0, it will use the default value of 2.5GB.
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
                    <FormLabel>Maximum parted download duration</FormLabel>
                    <Select
                        onValueChange={(newValue) => {
                          maxPartDurationFormat && setMaxPartDurationFormat(newValue);
                        }}
                        value={maxPartDurationFormat}
                    >
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Input
                              type="number"
                              placeholder=""
                              {...field}
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
                          <SelectValue placeholder="Select a duration format"/>
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="ss">seconds</SelectItem>
                          <SelectItem value="mm">minutes</SelectItem>
                          <SelectItem value="hh">hours</SelectItem>
                          <SelectItem value="dd">days</SelectItem>
                        </SelectContent>
                      </div>
                      <FormDescription>
                        The maximum duration of a parted download. If the download duration exceeds this value, the download will be parted.
                        If the value is 0, it disables the maximum parted download duration.
                        <br/>
                        <strong>It has priority over the maximum parted download size</strong>
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
                    <FormLabel>Maximum concurrent downloads</FormLabel>
                    <FormControl>
                      <Input type="number"
                             placeholder="5"
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             value={field.value}/>
                    </FormControl>
                    <FormDescription>
                      The maximum number of concurrent downloads. If the number of downloads exceeds this value, the download will be queued.
                      Default is set to 5.
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
                    <FormLabel>Maximum concurrent uploads</FormLabel>
                    <FormControl>
                      <Input type="number"
                             onChange={(e) => field.onChange(parseInt(e.target.value))}
                             value={field.value}
                             placeholder="3"/>
                    </FormControl>
                    <FormDescription>
                      The maximum number of concurrent uploads. If the number of uploads exceeds this value, the upload will be queued.
                      Default is set to 3.
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
                    <FormLabel>Download retry delay</FormLabel>
                    <FormControl>
                      <Input type="number"
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             value={field.value}
                             placeholder="10"/>
                    </FormControl>
                    <FormDescription>
                      This is the delay <strong>(in seconds)</strong> used to check if a streamer is still live after a failed download (usually
                      encountered when the streamer goes offline or network issues).
                      Increasing this value will reduce the number of requests to the platform.
                      Default is set to 10 seconds.
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
                    <FormLabel>Maximum retry counts</FormLabel>
                    <FormControl>
                      <Input type="number"
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             value={field.value}
                             placeholder="3"/>
                    </FormControl>
                    <FormDescription>
                      The maximum number of stream download retries. If the number of retries exceeds this value, the stream session will be
                      considered as finished.
                      Default is set to 3.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <Button type="submit" aria-disabled={isSubmitting}>Update settings</Button>
        </form>
      </Form>
  )
}