import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/new-york/ui/card";
import {unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {useMemo} from "react";
import LoginFormWrapper from "@/app/[locale]/login/login-form-wrapper";


export default function LoginPage({params: {locale}}: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

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
          <LoginFormWrapper strings={loginStrings}/>
        </CardContent>
      </Card>
    </div>
  </>
}