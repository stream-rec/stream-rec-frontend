import {Control} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Input} from "@/components/new-york/ui/input";

type OutputFilenameFormfieldProps = {
    control: Control<any>;
}

export function OutputFilenameFormfield({control}: OutputFilenameFormfieldProps) {
    return <FormField
        control={control}
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
}