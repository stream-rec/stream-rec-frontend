"use client"
import { use, useEffect } from "react"
import { signOut } from "next-auth/react"
import { BASE_PATH } from "@/src/lib/routes"
import { Loader2 } from "lucide-react"

export default function LogoutPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = use(params)

	useEffect(() => {
		// Sign out
		signOut({ callbackUrl: `${BASE_PATH}/${locale}/login`, redirect: true })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className='flex h-screen flex-col items-center justify-center gap-4'>
			<Loader2 className='h-6 w-6 animate-spin' />
			<p className='text-muted-foreground'>Logging out...</p>
		</div>
	)
}
