import {FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {SelectItem} from "@/components/new-york/ui/select";
import {videoFormats} from "@/lib/data/streams/definitions";
import {FormFieldProps} from "@/app/[locale]/dashboard/settings/components/form/form-field";
import Select from "@/app/components/empty-select";


export function OutputFileFormatFormfield({control, name, description, controlPrefix, allowNull}: FormFieldProps) {

  return <FormField
      control={control}
      name={controlPrefix ? `${controlPrefix}.outputFileFormat` : "outputFileFormat"}
      render={({field}) => (
          <FormItem>
            <FormLabel>{name}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value} placeholder={"Select a output video extension"} options={
              videoFormats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format}
                  </SelectItem>
              ))
            } allowNone={allowNull}/>
            <FormDescription>
              {description}
            </FormDescription>
            <FormMessage/>
          </FormItem>
      )}
  />
}