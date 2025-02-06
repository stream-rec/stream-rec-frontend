"use client"

import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/src/components/new-york/ui/alert-dialog"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface ErrorDialogProps {
	code?: string | null
	message?: string | null
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function ErrorDialog({ code, message, open, onOpenChange }: ErrorDialogProps) {
	const t = useTranslations("Errors")
	const router = useRouter()

	const decodedMessage = message ? decodeURIComponent(message) : undefined

	const getErrorMessage = () => {
		switch (code) {
			case "503":
				return t("serviceUnavailable")
			case "network_error":
				return t("networkError")
			default:
				return t("serverError", { code, message: decodedMessage })
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className='flex items-center gap-2'>
						<ExclamationTriangleIcon className='h-5 w-5 text-destructive' />
						<AlertDialogTitle>{t("error")}</AlertDialogTitle>
					</div>
					<AlertDialogDescription>{getErrorMessage()}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction onClick={() => router.back()}>{t("goBack")}</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
