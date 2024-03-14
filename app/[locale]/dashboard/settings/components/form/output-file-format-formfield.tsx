import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/new-york/ui/select";
import {videoFormats} from "@/lib/data/streams/definitions";
import {FormFieldProps} from "@/app/[locale]/dashboard/settings/components/form/form-field";


export function OutputFileFormatFormfield({control, name, description, controlPrefix}: FormFieldProps) {
  return <FormField
      control={control}
      name={controlPrefix ? `${controlPrefix}.outputFileFormat` : "outputFileFormat"}
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