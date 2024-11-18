import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import {Input} from "@/src/components/new-york/ui/input";
import {FormFieldProps} from "@/src/app/[locale]/(feat)/settings/components/form/form-field";

export function OutputFilenameFormfield({control, name, description, controlPrefix}: FormFieldProps) {
  return <FormField
      control={control}
      name={controlPrefix ? `${controlPrefix}.outputFileName` : "outputFileName"}
      render={({field}) => (
          <FormItem>
            <FormLabel>{name}</FormLabel>
            <FormControl>
              <Input placeholder="%H_%M_%S-{title}" {...field} />
            </FormControl>
            <FormDescription>
              {description}
            </FormDescription>
            <FormMessage/>
          </FormItem>
      )}
  />
}