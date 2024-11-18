"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {ChevronDownIcon} from "@radix-ui/react-icons"
import {useForm, useFormState} from "react-hook-form"
import {z} from "zod"

import {cn} from "@/src/lib/utils"
import {buttonVariants} from "@/src/components/new-york/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/src/components/new-york/ui/form"
import {RadioGroup, RadioGroupItem} from "@/src/components/new-york/ui/radio-group"
import {useTheme} from "next-themes";
import React from "react";
import {useConfig} from "@/src/app/hooks/use-config";
import {toastData} from "@/src/app/utils/toast";
import {LoadingButton} from "@/src/components/new-york/ui/loading-button";

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme.",
  }),
  font: z.enum(["inter", "manrope", "system"], {
    invalid_type_error: "Select a font",
    required_error: "Please select a font.",
  }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AppearanceFormValues> = {
  theme: "light",
  font: "inter",
}

type AppearanceFormProps = {
  fontString: string
  fontDescription: string
  themeString: string
  themeDescription: string,
  themeLight: string,
  themeDark: string,
  saveButton: string
  submitMessage: string
}

export function AppearanceForm({
                                 fontString,
                                 fontDescription,
                                 themeString,
                                 themeDescription,
                                 themeLight,
                                 themeDark,
                                 saveButton,
                                 submitMessage
                               }: AppearanceFormProps) {
  const [config, setConfig] = useConfig()
  const {setTheme, theme, themes} = useTheme()
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      ...defaultValues,
      theme: theme === "light" || theme === "dark" ? theme : "light",
    },
  })


  const {isSubmitting} = useFormState({control: form.control})

  function onSubmit(data: AppearanceFormValues) {
    if (data.theme !== theme) {
      setTheme(data.theme)
    }
    toastData(submitMessage, data, "code")
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
              control={form.control}
              name="font"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{fontString}</FormLabel>
                    <div className="relative w-max">
                      <FormControl>
                        <select
                            className={cn(
                                buttonVariants({variant: "outline"}),
                                "w-[200px] appearance-none font-normal"
                            )}
                            {...field}
                        >
                          <option value="inter">Inter</option>
                          <option value="manrope">Manrope</option>
                          <option value="system">System</option>
                        </select>
                      </FormControl>
                      <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50"/>
                    </div>
                    <FormDescription>
                      {fontDescription}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="theme"
              render={({field}) => (
                  <FormItem className="space-y-1">
                    <FormLabel>{themeString}</FormLabel>
                    <FormDescription>
                      {themeDescription}
                    </FormDescription>
                    <FormMessage/>
                    <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid max-w-md grid-cols-2 gap-8 pt-2"
                    >
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="light" className="sr-only"/>
                          </FormControl>
                          <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                            <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                              <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]"/>
                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"/>
                              </div>
                              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-[#ecedef]"/>
                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"/>
                              </div>
                              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-[#ecedef]"/>
                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"/>
                              </div>
                            </div>
                          </div>
                          <span className="block w-full p-2 text-center font-normal">
                      {themeLight}
                    </span>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="dark" className="sr-only"/>
                          </FormControl>
                          <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                            <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                              <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div className="h-2 w-[80px] rounded-lg bg-slate-400"/>
                                <div className="h-2 w-[100px] rounded-lg bg-slate-400"/>
                              </div>
                              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-slate-400"/>
                                <div className="h-2 w-[100px] rounded-lg bg-slate-400"/>
                              </div>
                              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-slate-400"/>
                                <div className="h-2 w-[100px] rounded-lg bg-slate-400"/>
                              </div>
                            </div>
                          </div>
                          <span className="block w-full p-2 text-center font-normal">
                      {themeDark}
                    </span>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
              )}
          />

          <LoadingButton type="submit" loading={isSubmitting}>{saveButton}</LoadingButton>
        </form>
      </Form>
  )
}