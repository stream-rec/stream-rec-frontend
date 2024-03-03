import {Control} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/new-york/ui/form";
import {Switch} from "@/components/new-york/ui/switch";

type DanmuFlagFormfieldProps = {
  control: Control<any>;
}

export function DanmuFlagFormfield({control}: DanmuFlagFormfieldProps) {
  return <FormField
      control={control}
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
                  arial-label="Danmu switch"
              />
            </FormControl>
          </FormItem>
      )}
  />
}