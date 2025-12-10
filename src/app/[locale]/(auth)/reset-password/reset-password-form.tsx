"use client"
import { useForm, useFormState, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/new-york/ui/form"
import { Input } from "@/src/components/new-york/ui/input"
import { LoadingButton } from "@/src/components/new-york/ui/loading-button"
import { useEffect } from "react"
import { changePassword } from "@/src/lib/data/user/user-apis"
import { toastData } from "@/src/app/utils/toast"
import { signOut } from "next-auth/react"
import { BASE_PATH } from "@/src/lib/routes"
import { useRouter } from "@/src/i18n/routing"

export const formSchema = z
	.object({
		id: z.number(),
		password: z.string().min(1),
		newPassword: z.string().min(1),
		newPassword2: z.string().min(1),
	})
	.refine(data => data.newPassword === data.newPassword2, {
		message: "Passwords do not match",
		path: ["newPassword2"],
	})

export type ResetPasswordFormStrings = {
	password: string
	passwordPlaceholder: string
	newPassword: string
	newPasswordPlaceholder: string
	confirmPassword: string
	confirmPasswordPlaceholder: string
	confirm: string
	resetPasswordSuccess: string
	resetPasswordError: string
	passwordNotMatch: string
}

export type ResetPasswordFormProps = {
	defaultValues: any
	strings: ResetPasswordFormStrings
	locale: string
}

export const ResetPasswordForm = ({ strings, defaultValues, locale }: ResetPasswordFormProps) => {
	const router = useRouter()
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues,
	})

	const { isDirty, isValid, isSubmitting } = useFormState({
		control: form.control,
	})

	// Watch for changes in the new password fields
	const newPassword = useWatch({ control: form.control, name: "newPassword" })
	const newPassword2 = useWatch({
		control: form.control,
		name: "newPassword2",
	})

	useEffect(() => {
		if (newPassword && newPassword2 && newPassword !== newPassword2) {
			form.setError("newPassword2", {
				type: "manual",
				message: strings.passwordNotMatch,
			})
		} else {
			form.clearErrors("newPassword2")
		}
	}, [strings, form, newPassword, newPassword2])

	const submit = (data: z.infer<typeof formSchema>) => {
		changePassword(data.id.toString(), data.password, data.newPassword)
			.then(() => {
				toastData("", strings.resetPasswordSuccess, "success")
				signOut({ callbackUrl: `${BASE_PATH}/${locale}/login`, redirect: false })
					.then(() => {
						console.log("Password reset successful, signing out...")
						router.push(`${BASE_PATH}/login`)
					})
			})
			.catch(e => {
				console.error(e)
				toastData("", `${strings.resetPasswordError} ${e.message}`, "error")
			})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={e => {
					e.preventDefault()
					form.handleSubmit(submit)()
				}}
			>
				<div className='grid w-full items-center gap-4'>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{strings.password}</FormLabel>
								<FormControl>
									<Input type={"password"} placeholder={strings.passwordPlaceholder} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='newPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{strings.newPassword}</FormLabel>
								<FormControl>
									<Input type={"password"} placeholder={strings.newPasswordPlaceholder} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='newPassword2'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{strings.confirmPassword}</FormLabel>
								<FormControl>
									<Input type={"password"} placeholder={strings.confirmPasswordPlaceholder} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<LoadingButton disabled={!isDirty || !isValid} loading={isSubmitting} type={"submit"} className={"mt-6 w-full"}>
					{strings.confirm}
				</LoadingButton>
			</form>
		</Form>
	)
}
