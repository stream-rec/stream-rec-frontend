import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/new-york/ui/card"
import { getTranslations } from "next-intl/server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { LoginForm } from "./login-form"
import { auth } from "@/auth"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Login",
	description: "Login to your account"
}

export const dynamic = "force-dynamic"

export default async function LoginPage() {
	const session = await auth()

	// Redirect logged in users
	if (session) {
		if (session.user?.isFirstUsePassword) {
			redirect(`/reset-password`)
		} else {
			redirect("/dashboard")
		}
	}

	// Get the username from cookie
	const cookieStore = await cookies()
	const savedUsername = cookieStore.get("username")?.value || ""

	const defaultValues = {
		id: 0,
		username: savedUsername,
		password: "",
	}

	const t = await getTranslations("LoginPage")

	const loginStrings = {
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
	}

	return (
		<div className="flex h-screen items-center justify-center">
			<Card className="w-[350px] p-4">
				<CardHeader>
					<CardTitle className="text-lg">{t("title")}</CardTitle>
					<CardDescription>{t("description")}</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm defaultValues={defaultValues} strings={loginStrings} />
				</CardContent>
			</Card>
		</div>
	)
}
