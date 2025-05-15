"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/new-york/ui/form"
import { Label } from "@/src/components/new-york/ui/label"
import { Input } from "@/src/components/new-york/ui/input"
import { useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { User, userSchema } from "@/src/lib/data/user/definitions"
import { useState, useCallback, memo } from "react"
import { Checkbox } from "@/src/components/new-york/ui/checkbox"
import { LoadingButton } from "@/src/components/new-york/ui/loading-button"
import { toastData } from "@/src/app/utils/toast"
import { recoverPassword } from "@/src/lib/data/user/user-apis"
import { signIn } from "next-auth/react"
import { useRouter } from "@/src/i18n/routing"
import { InvalidLoginError } from "@/auth"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/src/components/new-york/ui/button"

export type LoginFormStrings = {
	username: string
	usernamePlaceholder: string
	password: string
	passwordPlaceholder: string
	rememberMe: string
	forgotPassword: string
	recoverPasswordSuccess: string
	signIn: string
	loginSuccessful: string
	loginFailed: string
}

type LoginFormProps = {
	defaultValues: User
	strings: LoginFormStrings
}

const PasswordInput = memo(({ field, showPassword, togglePassword, placeholder }: {
	field: any,
	showPassword: boolean,
	togglePassword: () => void,
	placeholder: string
}) => (
	<div className="relative">
		<Input
			type={showPassword ? "text" : "password"}
			placeholder={placeholder}
			{...field}
			className="pr-10"
		/>
		<Button
			type="button"
			variant="ghost"
			size="sm"
			className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent focus:ring-0"
			onClick={togglePassword}
			aria-label={showPassword ? "Hide password" : "Show password"}
		>
			{showPassword ? (
				<EyeOff className="h-4 w-4" />
			) : (
				<Eye className="h-4 w-4" />
			)}
		</Button>
	</div>
));

PasswordInput.displayName = 'PasswordInput';

export function LoginForm({ strings, defaultValues }: LoginFormProps) {
	const [isSave, setIsSave] = useState(defaultValues.username !== "")
	const [showPassword, setShowPassword] = useState(false)
	const [isRecovering, setIsRecovering] = useState(false)

	const form = useForm({
		resolver: zodResolver(userSchema),
		defaultValues: defaultValues,
		mode: "onChange"
	})

	const { isDirty, isValid, isSubmitting } = useFormState({
		control: form.control,
	})
	const router = useRouter()

	const togglePasswordVisibility = useCallback(() => {
		setShowPassword(prev => !prev)
	}, [])

	const onSubmit = async (data: User) => {
		try {
			const result = await signIn("credentials", {
				username: data.username,
				password: data.password,
				redirect: false,
			})

			if (result?.error) {
				console.debug("result.error", result.error)
				toastData(strings.loginFailed, result.code, "error")
			} else {
				if (isSave) {
					saveCookie(data.username)
				} else {
					clearCookie()
				}
				toastData(strings.loginSuccessful, strings.loginSuccessful, "success")
				router.refresh()
			}
		} catch (e) {
			if (e instanceof InvalidLoginError) {
				toastData("", e.message, "error")
			}
		}
	}

	const saveCookie = useCallback((username: string) => {
		// 30 days
		document.cookie = `username=${username}; path=/; max-age=2592000; SameSite=Lax; Secure`
	}, [])

	const clearCookie = useCallback(() => {
		document.cookie = `username=; path=/; max-age=0; SameSite=Lax; Secure`
	}, [])

	const recover = async (username: string) => {
		if (isRecovering) return

		try {
			setIsRecovering(true)
			await recoverPassword(username)
			toastData("", strings.recoverPasswordSuccess, "success")
		} catch (e) {
			if (e instanceof Error) toastData("", e.message, "error")
		} finally {
			setIsRecovering(false)
		}
	}

	const handleRecoverPassword = useCallback(async () => {
		const username = form.getValues("username")
		if (username) {
			await recover(username)
		} else {
			await form.trigger("username")
		}
	}, [form])

	return (
		<Form {...form}>
			<form
				action='/api/auth/callback/credentials'
				method='post'
				onSubmit={event => {
					event.preventDefault()
					form.handleSubmit(onSubmit)()
				}}
				className="space-y-6"
			>
				<div className='grid w-full items-center gap-4'>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{strings.username}</FormLabel>
								<FormControl>
									<Input
										placeholder={strings.usernamePlaceholder}
										{...field}
										autoComplete="username"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{strings.password}</FormLabel>
								<FormControl>
									<PasswordInput
										field={field}
										showPassword={showPassword}
										togglePassword={togglePasswordVisibility}
										placeholder={strings.passwordPlaceholder}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='space-y-1.5'>
						<div className={"flex w-full justify-between"}>
							<div className={"flex items-center justify-between gap-2.5"}>
								<Checkbox
									checked={isSave}
									onCheckedChange={checked => {
										setIsSave(checked.valueOf() as boolean)
									}}
									id="remember-me"
								/>
								<Label htmlFor='remember-me' className="cursor-pointer">{strings.rememberMe}</Label>
							</div>

							<Button
								type="button"
								variant="link"
								size="sm"
								className="px-0 h-auto text-sm text-muted-foreground font-normal"
								onClick={handleRecoverPassword}
								disabled={isRecovering}
							>
								{strings.forgotPassword}
							</Button>
						</div>
					</div>
				</div>

				<LoadingButton
					disabled={!isDirty || !isValid}
					loading={isSubmitting || isRecovering}
					type={"submit"}
					className={"w-full"}
				>
					{strings.signIn}
				</LoadingButton>
			</form>
		</Form>
	)
}
