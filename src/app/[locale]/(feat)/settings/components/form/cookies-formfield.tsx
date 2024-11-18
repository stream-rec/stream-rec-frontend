import {UseControllerProps} from "react-hook-form";
import React, {ReactElement} from "react";
import {AutosizeTextarea} from "@/src/components/new-york/ui/autosize-textarea";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";

type CookiesFormfieldProps = {
  title: string;
  description: string | React.ReactNode;
  onChange?: (value: string | null) => void;
} & UseControllerProps;

export type CookiesFormfieldRef = {
  element: ReactElement;
}

export const CookiesFormfield = React.forwardRef <CookiesFormfieldRef, CookiesFormfieldProps>(
    (
        {
          title,
          description,
          control,
          name,
          onChange,
          ...props
        }: CookiesFormfieldProps,
        ref: React.Ref<CookiesFormfieldRef>,
    ) => {

      function extractCookies(cookieString: string): Record<string, string> {
        if (!cookieString) {
          return {};
        }

        const cookies: Record<string, string> = {};
        const cookieArray = cookieString.split(';');

        cookieArray.forEach(cookie => {
          const separatorIndex = cookie.indexOf('=');
          if (separatorIndex !== -1) {
            const key = cookie.substring(0, separatorIndex).trim();
            cookies[key] = cookie.substring(separatorIndex + 1).trim();
          }
        });

        return cookies;
      }


      return <FormField
          control={control}
          name={name ?? "cookies"}
          render={({field}) => (
              <FormItem>
                <FormLabel>{title}</FormLabel>
                <FormControl>
                  <AutosizeTextarea id={name ?? "cookies"}
                                    placeholder="Cookies" {...field}
                                    onChange={
                                      (e) => {
                                        const value = e.target.value;
                                        if (value === "") {
                                          field.onChange(null);
                                          onChange?.(null);
                                        } else {
                                          const cookies = extractCookies(value);
                                          // transform the cookies into a string
                                          const cookieString = Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ').concat(';');
                                          field.onChange(cookieString);
                                          onChange?.(cookieString);
                                        }
                                      }
                                    }/>
                </FormControl>
                <FormDescription>
                  {description}
                </FormDescription>
                <FormMessage/>
              </FormItem>
          )}
      />
    }
);
CookiesFormfield.displayName = "CookiesFormfield";