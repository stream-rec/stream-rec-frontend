'use client'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/new-york/ui/form";
import {Label} from "@/components/new-york/ui/label";
import {Input} from "@/components/new-york/ui/input";
import {useForm, useFormState} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {User, userSchema} from "@/lib/data/user/definitions";
import {useState} from "react";
import {Checkbox} from "@/components/new-york/ui/checkbox";
import {LoadingButton} from "@/components/new-york/ui/loading-button";
import {toastData} from "@/app/utils/toast";
import {login, recoverPassword} from "@/lib/data/user/user-apis";
import {useRouter} from "@/i18n";
import {storeToken} from "@/lib/data/auth/tokens";


type LoginFormProps = {
  defaultValues: User
  strings: {
    username: string
    usernamePlaceholder: string
    password: string
    passwordPlaceholder: string
    rememberMe: string
    forgotPassword: string
    recoverPasswordSuccess: string
    signIn: string,
    loginSuccessful: string
    loginFailed: string
  }
  submit: (username: string, password: string) => ReturnType<typeof login>,
  storeToken: (request: { username: string, token: string, validUntil: string }) => ReturnType<typeof storeToken>,
  recoverPassword: (username: string) => ReturnType<typeof recoverPassword>
}


export function LoginForm({strings, defaultValues, submit, storeToken, recoverPassword}: LoginFormProps) {

  const [isSave, setIsSave] = useState(defaultValues.username !== "")

  const form = useForm(
      {
        resolver: zodResolver(userSchema),
        defaultValues: defaultValues,
      }
  )

  const {isDirty, isValid, isSubmitting} = useFormState({control: form.control})

  const router = useRouter()

  const onSubmit = async (data: User) => {
    try {
      const json = await submit(data.username, data.password)
      const username = isSave ? data.username : ""
      await storeToken({username: username, token: json.token, validUntil: json.validTo.toString()})
      // save token
      router.push("/dashboard")
      toastData(strings.loginSuccessful, strings.loginSuccessful, 'success')
    } catch (e) {
      console.error(e)
      if (e instanceof Error)
        toastData("", strings.loginFailed + e.message, 'error')
    }
  }

  const recover = async (username: string) => {
    try {
      await recoverPassword(username)
      toastData("", strings.recoverPasswordSuccess, 'success')
    } catch (e) {
      if (e instanceof Error)
        toastData("", e.message, 'error')
    }
  }

  return <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-4">
          <FormField
              control={form.control}
              name="username"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{strings.username}</FormLabel>
                    <FormControl>
                      <Input placeholder={strings.usernamePlaceholder} {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>{strings.password}</FormLabel>
                    <FormControl>
                      <Input type={"password"} placeholder={strings.passwordPlaceholder} {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <div className="space-y-1.5">
            <div className={"flex justify-between w-full"}>
              <div className={"flex items-center justify-between gap-2.5"}>
                <Checkbox
                    checked={isSave}
                    onCheckedChange={(checked) => {
                      setIsSave(checked.valueOf() as boolean)
                    }}
                />
                <Label htmlFor="save">{strings.rememberMe}</Label>
              </div>

              <Label className={"text-muted-foreground text-sm cursor-pointer"} onClick={
                async () => {
                  //check if the username is non-empty
                  if (form.getValues("username")) {
                    await recover(form.getValues("username"))
                  } else {
                    // trigger the username field to show error
                    await form.trigger("username")
                  }
                }
              }>{strings.forgotPassword}</Label>
            </div>
          </div>
        </div>

        <LoadingButton disabled={!isDirty} loading={isSubmitting} type={"submit"} className={"w-full mt-6"}>{strings.signIn}</LoadingButton>
      </form>
    </Form>
  </>
}