"use client"

import { useSearchParams } from "next/navigation"
import { ErrorDialog } from "@/src/components/dialog/error-dialog"
import { useEffect, useState } from "react"

export default function ErrorPage() {
	const searchParams = useSearchParams()
	const [mounted, setMounted] = useState(false)

	const code = searchParams.get("code")
	const message = searchParams.get("message")

	// Only show the dialog after initial mount to prevent hydration issues
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<ErrorDialog
			code={code}
			message={message}
			open={true}
			onOpenChange={() => {
				// Dialog can't be closed by clicking outside or pressing escape
				return
			}}
		/>
	)
}
