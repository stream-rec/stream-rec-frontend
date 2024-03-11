import {Control} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/new-york/ui/select";
import {videoFormats} from "@/lib/data/streams/definitions";

type OutputFileFormatFormfieldProps = {
  control: Control<any>;
  name: string,
  description: string | React.ReactNode,
}

export function OutputFileFormatFormfield({control, name, description}: OutputFileFormatFormfieldProps) {
  return <FormField
      control={control}
      name="outputFileFormat"
      render={({field}) => (
          <FormItem>
            <FormLabel>{name}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a output video extension"/>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {
                  videoFormats.map((format) => (
                      <SelectItem key={format} value={format}>
                        {format}
                      </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
            <FormDescription>
              {description}
            </FormDescription>
            <FormMessage/>
          </FormItem>
      )}
  />
}