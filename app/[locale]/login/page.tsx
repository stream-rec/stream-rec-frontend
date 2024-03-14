import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/new-york/ui/card";
import {unstable_setRequestLocale} from "next-intl/server";
import {LoginForm} from "@/app/[locale]/login/login-form";
import {login, recoverPassword} from "@/lib/data/user/user-apis";
import {cookies} from "next/headers";
import {storeToken} from "@/lib/data/auth/tokens";
import {useTranslations} from "next-intl";
import {useMemo} from "react";


export default function LoginPage({params: {locale}}: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  const defaultValues = {
    id: 0,
    username: cookies().get("username")?.value || "",
    password: ""
  }

  const t = useTranslations("LoginPage")

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

  return <>
    <div className={"flex justify-center items-center h-screen"}>
      <Card className="w-[350px] p-4">
        <CardHeader>
          <CardTitle className={"text-lg"}>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm defaultValues={defaultValues} submit={login} storeToken={storeToken} strings={loginStrings}
                     recoverPassword={recoverPassword}/>
        </CardContent>
      </Card>
    </div>
  </>
}