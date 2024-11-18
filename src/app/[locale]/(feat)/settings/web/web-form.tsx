'use client'
import {useForm, useFormState} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/new-york/ui/select";
import React, {useTransition} from "react";
import {usePathname, useRouter} from "@/src/i18n/routing";
import {useLocale} from "next-intl";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoadingButton} from "@/src/components/new-york/ui/loading-button";

type WebFormProps = {
  strings: {
    locale: string,
    localeDescription: string,
    locales: {
      id: string,
      name: string
    }[],
    save: string
  }
}

const webSchema = z.object({
  locale: z.string()
})

export function WebForm({strings}: WebFormProps) {

  const locale = useLocale()

  const form = useForm(
      {
        resolver: zodResolver(webSchema),
        defaultValues: {
          locale: locale
        }
      }
  )

  const {isSubmitting} = useFormState({control: form.control})

  const router = useRouter()
  // transition to the new locale
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  const updateLocale = (locale: string) => {
    startTransition(() => {
      router.replace(pathname, {locale})
    });
  }

  const submit = (data: z.infer<typeof webSchema>) => {
    updateLocale(data.locale)
  }

  return (
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
            <FormField control={form.control} name="locale" render={
              ({field}) => (
                  <FormItem>

                    <FormLabel>{strings.locale}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="{Select a locale}"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          strings.locales.map((locale) => (
                              <SelectItem key={locale.id} value={locale.id}>
                                {locale.name}
                              </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {strings.localeDescription}
                    </FormDescription>
                    <FormMessage/>


                  </FormItem>
              )
            }>
            </FormField>
            <LoadingButton type="submit" loading={isSubmitting}>{strings.save}</LoadingButton>
          </form>

        </Form>
      </>

  )
}