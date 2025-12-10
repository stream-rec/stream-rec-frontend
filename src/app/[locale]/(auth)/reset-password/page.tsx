import { getTranslations } from "next-intl/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/new-york/ui/card"
import { ResetPasswordForm } from "@/src/app/[locale]/(auth)/reset-password/reset-password-form"
import { cookies } from "next/headers"
import { auth } from "@/auth"

export default async function ResetPage({ params }: { params: Promise<{ locale: string }> }) {
  	const { locale } = await params
	const session = await auth()

	const t = await getTranslations("ResetPasswordPage")

	const strings = {
		password: t("currentPassword"),
		passwordPlaceholder: t("currentPasswordPlaceholder"),
		newPassword: t("newPassword"),
		newPasswordPlaceholder: t("newPasswordPlaceholder"),
		confirmPassword: t("confirmPassword"),
		confirmPasswordPlaceholder: t("confirmPasswordPlaceholder"),
		confirm: t("confirm"),
		resetPasswordSuccess: t("resetPasswordSuccess"),
		resetPasswordError: t("resetPasswordError"),
		passwordNotMatch: t("passwordNotMatch"),
	}

	const id = session?.user?.id

	const cookieStore = await cookies()

	const defaultValues = {
		id: id ? Number(id) : 0,
		username: cookieStore.get("username")?.value || "",
		password: "",
		newPassword: "",
	}

	return (
		<>
			<div className={"flex h-screen items-center justify-center"}>
				<Card className='w-[350px] p-4'>
					<CardHeader>
						<CardTitle className={"text-lg"}>{t("title")}</CardTitle>
					</CardHeader>
					<CardContent>
						<ResetPasswordForm strings={strings} defaultValues={defaultValues} locale={locale} />
					</CardContent>
				</Card>
			</div>
		</>
	)
}
