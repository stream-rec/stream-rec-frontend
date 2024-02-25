"use client";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/new-york/ui/select";
import {Button} from "@/components/new-york/ui/button";
import {Input} from "@/components/new-york/ui/input";
import {Switch} from "@/components/new-york/ui/switch";
import {useState} from "react";
import {toast} from "@/components/new-york/ui/use-toast";
import {convertToBytes, convertToSeconds} from "@/app/utils/conversions";


const globalFormSchema = z.object({
  engine: z
      .string({
        required_error: "Please select a download engine.",
      }),
  danmu: z.boolean().default(true),
  deleteFiles: z.boolean().default(true),
  outputFolder: z
      .string({
        required_error: "Please enter a valid output folder.",
      }).optional(),
  outputFileName: z
      .string({
        required_error: "Please enter a valid output file name.",
      }).optional(),
  outputFileFormat: z
      .string({
        required_error: "Please select a output video extension.",
      }).optional(),
  minPartSize: z.string().max(2).optional(),
  maxPartSize: z.string().max(2).optional(),
  maxPartDuration: z.string().optional(),
  maxConcurrentDownloads: z.number().min(1).optional(),
  maxConcurrentUploads: z.number().min(1).optional(),
  maxDownloadRetries: z.number().min(1).optional(),
  downloadRetryDelay: z.number().min(0).optional(),
})

type GlobalFormValues = z.infer<typeof globalFormSchema>


// This can come from your database or API.
const defaultValues: Partial<GlobalFormValues> = {
  engine: "ffmpeg",
  danmu: true,
  deleteFiles: true,
  outputFileFormat: "flv",
  minPartSize: "MB",
  maxPartSize: "GB",
  maxPartDuration: "hh",
}


export function GlobalForm() {

  const [inputValue, setInputValue] = useState(10);
  const [maxInputValue, setMaxInputValue] = useState(2.5);
  const [maxDurationInputValue, setMaxDurationInputValue] = useState(0);

  const form = useForm<GlobalFormValues>({
    resolver: zodResolver(globalFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: GlobalFormValues) {

    if (data.minPartSize !== undefined) {
      data.minPartSize = convertToBytes(data.minPartSize, inputValue).toString()
    }
    if (data.maxPartSize !== undefined) {
      data.maxPartSize = convertToBytes(data.maxPartSize, maxInputValue).toString()
    }
    if (data.maxPartDuration !== undefined) {
      data.maxPartDuration = convertToSeconds(data.maxPartDuration, maxDurationInputValue).toString()
    }
    toast({
      title: "You submitted the following values:",
      description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
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

          <FormField
              control={form.control}
              name="danmu"
              render={({field}) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Global danmu flag</FormLabel>
                      <FormDescription>
                        Enable danmu (Bullet screen comments) recording for the download. Danmu will be saved in a separate file with the same name as
                        the video file.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          arial-label="Enable danmu recording"
                      />
                    </FormControl>
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="deleteFiles"
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
          <FormField
              control={form.control}
              name="outputFolder"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Output folder format</FormLabel>
                    <FormControl>
                      <Input placeholder="{streamer}/%yyyy-%MM-%dd" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the folder where the downloaded files will be saved. You can use placeholders like:
                      <br/>
                      <code>{`{title}`}</code> - The title of the streaming.
                      <br/>
                      <code>{`{streamer}`}</code> - The streamer name of the streaming.
                      <br/>
                      <code>{`%yyyy`}</code> - The year of the streaming.
                      <br/>
                      <code>{`%MM`}</code> - The month of the streaming.
                      <br/>
                      <code>{`%dd`}</code> - The day of the streaming.
                      <br/>
                      <code>{`%HH`}</code> - The hour of the streaming.
                      <br/>
                      <code>{`%mm`}</code> - The minute of the streaming.
                      <br/>
                      <code>{`%ss`}</code> - The second of the streaming.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="outputFileName"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Output file format</FormLabel>
                    <FormControl>
                      <Input placeholder="%HH_%mm_%ss-{title}" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the file name of the downloaded file. Same placeholders as output folder are available.
                      <br/>
                      <strong>Please do not include file extension, it will be automatically added based on the below selected format.</strong>
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="outputFileFormat"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Output video extension</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a output video extension"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="avi">avi</SelectItem>
                        <SelectItem value="flv">flv</SelectItem>
                        <SelectItem value="mov">mov</SelectItem>
                        <SelectItem value="mp4">mp4</SelectItem>
                        <SelectItem value="wmv3">wmv</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The file extension of the downloaded file.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="minPartSize"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Minimum parted download size</FormLabel>
                    <Select
                        onValueChange={(newValue) => {
                          // newValue is the new selected value
                          // You can use it to update the value of the input field
                          field.onChange(newValue);
                        }}
                        defaultValue={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <Input
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder=""
                            {...field}
                            value={inputValue}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              setInputValue(Number(newValue));
                            }}
                        />
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a size format"/>
                          </SelectTrigger>
                        </FormControl>
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
                          field.onChange(newValue);
                        }}
                        defaultValue={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <Input
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder=""
                            {...field}
                            value={maxInputValue}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              // to number
                              setMaxInputValue(Number(newValue));
                            }}
                        />
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a size format"/>
                          </SelectTrigger>
                        </FormControl>
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
                          field.onChange(newValue);
                        }}
                        defaultValue={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <Input
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder=""
                            {...field}
                            value={maxDurationInputValue}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              // to number
                              setMaxDurationInputValue(Number(newValue));
                            }}
                        />
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a duration format"/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
                             min="1"
                             placeholder="5"
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             value={field.value}/>
                    </FormControl>
                    <FormDescription>
                      The maximum number of concurrent downloads. If the number of downloads exceeds this value, the download will be queued.
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
                             min="1"
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             value={field.value}
                             placeholder="3"/>
                    </FormControl>
                    <FormDescription>
                      The maximum number of concurrent uploads. If the number of uploads exceeds this value, the upload will be queued.
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
                             min="1"
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             value={field.value}
                             placeholder="3"/>
                    </FormControl>
                    <FormDescription>
                      The maximum number of stream download retries. If the number of retries exceeds this value, the stream session will be
                      considered as finished.
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
                    <FormLabel>Delay between each download retry</FormLabel>
                    <FormControl>
                      <Input type="number"
                             min="0"
                             onChange={(e) => field.onChange(Number(e.target.value))}
                             value={field.value}
                             placeholder="10"/>
                    </FormControl>
                    <FormDescription>
                      The delay between each download retry in seconds.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />
          <Button type="submit">Update settings</Button>
        </form>
      </Form>
  )
}