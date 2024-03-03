import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Input} from "@/components/new-york/ui/input";
import {Control} from "react-hook-form";


type OutputFolderFormFieldProps = {
  control: Control<any>;

}

export function OutputFolderFormField({control}: OutputFolderFormFieldProps) {
  return <FormField
      control={control}
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
}