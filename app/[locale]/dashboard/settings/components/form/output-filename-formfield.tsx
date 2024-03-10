import {Control} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Input} from "@/components/new-york/ui/input";

type OutputFilenameFormfieldProps = {
  control: Control<any>;
  name: string,
  description: string | React.ReactNode,
}

export function OutputFilenameFormfield({control, name, description}: OutputFilenameFormfieldProps) {
  return <FormField
      control={control}
      name="outputFileName"
      render={({field}) => (
          <FormItem>
            <FormLabel>{name}</FormLabel>
            <FormControl>
              <Input placeholder="%HH_%mm_%ss-{title}" {...field} />
            </FormControl>
            <FormDescription>
              {description}
            </FormDescription>
            <FormMessage/>
          </FormItem>
      )}
  />
}