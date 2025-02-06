import { Navbar } from "@/src/components/dashboard/navbar"
import React from "react"
import { useSidebarTranslations } from "@/src/app/hooks/translations/use-sidebar-translations"

interface ContentLayoutProps {
	title: string
	children: React.ReactNode
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
	const sidebarStrings = useSidebarTranslations()
	return (
		<div>
			<Navbar title={title} navStrings={sidebarStrings} />
			<div className='px-4 pb-8 pt-8 sm:px-8'>{children}</div>
		</div>
	)
}
