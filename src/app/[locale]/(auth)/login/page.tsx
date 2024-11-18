import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/new-york/ui/card";
import {getTranslations} from "next-intl/server";
import {auth} from "@/src/providers/auth";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {useMemo} from "react";
import {LoginForm} from "@/src/app/[locale]/(auth)/login/login-form";


export default async function LoginPage() {

  const session = await auth()

  if (session) {
    if (session.user && session.user.isFirstUsePassword) {
      // Redirect to change password page if first use
      redirect(`/reset-password`)
    } else {
      // Redirect to home page if already logged in
      redirect("/dashboard")
    }
  }

  const defaultValues = {
    id: 0,
    username: cookies().get("username")?.value || "",
    password: ""
  }

  const t = await getTranslations("LoginPage")

  return <LoginFormWrapper defaultValues={defaultValues} t={t}/>
}


function LoginFormWrapper({defaultValues, t}: { defaultValues: any, t: any }) {

  const loginStrings = useMemo(() => ({
    username: t("username"),
    usernamePlaceholder: t("usernamePlaceholder"),
    password: t("password"),
    passwordPlaceholder: t("passwordPlaceholder"),
    rememberMe: t("rememberMe"),
    forgotPassword: t("forgotPassword"),
    recoverPasswordSuccess: t("recoverPasswordSuccess"),
    signIn: t("signIn"),
    loginSuccessful: t("loginSuccess"),
    loginFailed: t("loginError"),
  }), [t])

  return (
      <div className={"flex justify-center items-center h-screen"}>
        <Card className="w-[350px] p-4">
          <CardHeader>
            <CardTitle className={"text-lg"}>{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm defaultValues={defaultValues} strings={loginStrings}/>
          </CardContent>
        </Card>
      </div>
  )
}