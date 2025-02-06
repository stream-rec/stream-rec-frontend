import { Link } from "@/src/i18n/routing"

import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/new-york/ui/button"
import { Menu } from "@/src/components/dashboard/menu"
import { SidebarToggle } from "@/src/components/dashboard/sidebar-toggle"
import { useStore } from "zustand"
import { useSidebarToggle } from "@/src/app/hooks/use-sidebar-toggle"
import StreamRecIcon from "@/src/components/Logo"
import { SidebarStrings } from "@/src/app/hooks/translations/use-sidebar-translations"

export function Sidebar({ navStrings }: { navStrings: SidebarStrings }) {
	const sidebar = useStore(useSidebarToggle, state => state)

	if (!sidebar) return null

	return (
		<aside
			className={cn(
				"fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0",
				sidebar?.isOpen === false ? "w-[90px]" : "w-72"
			)}
		>
			<SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
			<div className='relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800'>
				<Button
					className={cn(
						"mb-1 transition-transform duration-300 ease-in-out",
						sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
					)}
					variant='link'
					asChild
				>
					<Link href='/dashboard' className='flex items-center gap-2'>
						<div className='mr-1 h-10 w-10'>
							<StreamRecIcon />
						</div>
						<h1
							className={cn(
								"whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
								sidebar?.isOpen === false ? "hidden -translate-x-96 opacity-0" : "translate-x-0 opacity-100"
							)}
						>
							Stream-rec
						</h1>
					</Link>
				</Button>
				<Menu isOpen={sidebar?.isOpen} navStrings={navStrings} />
			</div>
		</aside>
	)
}
