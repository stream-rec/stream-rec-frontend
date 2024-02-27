import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Input} from "@/components/new-york/ui/input";
import {Control} from "react-hook-form";
import {Textarea} from "@/components/new-york/ui/textarea";


interface HuyaConfigProps {
  control: Control<any>;
}

export const HuyaTabContent: React.FC<HuyaConfigProps> = ({control}) => {
  {
    return (
        <div className="mt-6 space-y-6">
          <FormField
              control={control}
              name="huyaPrimaryCdn"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Primary CDN</FormLabel>
                    <FormControl>
                      <Input placeholder={"AL"} {...field}></Input>
                    </FormControl>
                    <FormDescription>
                      Huya primary CDN used to fetch the video stream. By default, it is set to AL.
                      Possible values are AL, TX, HW, WS, HS, AL13, HW16, HY.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <FormField
              control={control}
              name="huyaMaxBitrate"
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
                      The maximum bitrate for the Huya video stream. The tool will automatically adjust the closest bitrate available for
                      download.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />
          <FormField
              control={control}
              name="huyaCookies"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Cookies</FormLabel>
                    <FormControl>
                      <Textarea placeholder={"Optional cookies"} {...field}></Textarea>
                    </FormControl>
                    <FormDescription>
                      Cookies to be used for the Huya video stream. Optional.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />
        </div>
    )
  }
}