'use client'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/new-york/ui/form";
import {Label} from "@/src/components/new-york/ui/label";
import {Input} from "@/src/components/new-york/ui/input";
import {useForm, useFormState} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {User, userSchema} from "@/src/lib/data/user/definitions";
import {useState} from "react";
import {Checkbox} from "@/src/components/new-york/ui/checkbox";
import {LoadingButton} from "@/src/components/new-york/ui/loading-button";
import {toastData} from "@/src/app/utils/toast";
import {recoverPassword} from "@/src/lib/data/user/user-apis";
import {signIn} from "next-auth/react";
import {useRouter} from '@/src/i18n/routing';


export type LoginFormStrings = {
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

type LoginFormProps = {
  defaultValues: User
  strings: LoginFormStrings
}


export function LoginForm({strings, defaultValues}: LoginFormProps) {

  const [isSave, setIsSave] = useState(defaultValues.username !== "")

  const form = useForm(
      {
        resolver: zodResolver(userSchema),
        defaultValues: defaultValues,
      }
  )

  const {isDirty, isValid, isSubmitting} = useFormState({control: form.control})
  const router = useRouter()

  const onSubmit = (data: User) => {
    signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false
    }).then((result) => {
      console.log("result sign", result)
      if (result?.error) {
        toastData("", strings.loginFailed + "\n" + result.error, 'error')
        console.error(result.error)
      } else {
        toastData(strings.loginSuccessful, strings.loginSuccessful, 'success')
      }
      router.refresh()
    }).catch((e) => console.error(e))
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
      <form action="/api/auth/callback/credentials" method="post" onSubmit={
        event => {
          event.preventDefault()
          form.handleSubmit(onSubmit)()
        }
      }>
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