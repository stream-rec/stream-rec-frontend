"use client"

import { Link, useRouter } from "@/src/i18n/routing"
import { Ellipsis, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"

import { cn } from "@/src/lib/utils"
import { getMenuList } from "@/src/lib/menu-list"
import { Button } from "@/src/components/new-york/ui/button"
import { ScrollArea } from "@/src/components/new-york/ui/scroll-area"
import { CollapseMenuButton } from "@/src/components/dashboard/collapse-menu-button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/new-york/ui/tooltip"
import { SidebarStrings } from "@/src/app/hooks/translations/use-sidebar-translations"
import { BASE_PATH } from "@/src/lib/routes"

interface MenuProps {
	isOpen: boolean | undefined
	navStrings: SidebarStrings
}

export function Menu({ isOpen, navStrings }: MenuProps) {
	const pathname = usePathname()
	const menuList = getMenuList(pathname, navStrings)

	const router = useRouter()

	return (
		<ScrollArea className='[&>div>div[style]]:!block'>
			<nav className='mt-8 h-full w-full'>
				<ul className='flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]'>
					{menuList.map(({ groupLabel, menus }, index) => (
						<li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
							{(isOpen && groupLabel) || isOpen === undefined ? (
								<p className='max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground'>
									{groupLabel}
								</p>
							) : !isOpen && isOpen !== undefined && groupLabel ? (
								<TooltipProvider>
									<Tooltip delayDuration={100}>
										<TooltipTrigger className='w-full'>
											<div className='flex w-full items-center justify-center'>
												<Ellipsis className='h-5 w-5' />
											</div>
										</TooltipTrigger>
										<TooltipContent side='right'>
											<p>{groupLabel}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							) : (
								<p className='pb-2'></p>
							)}
							{menus.map(({ href, label, icon: Icon, active, submenus }, index) =>
								submenus.length === 0 ? (
									<div className='w-full' key={index}>
										<TooltipProvider disableHoverableContent>
											<Tooltip delayDuration={100}>
												<TooltipTrigger asChild>
													<Button
														variant={active ? "secondary" : "ghost"}
														className='mb-1 h-10 w-full justify-start'
														asChild
													>
														<Link href={href}>
															<span className={cn(isOpen === false ? "" : "mr-4")}>
																<Icon size={18} />
															</span>
															<p
																className={cn(
																	"max-w-[200px] truncate",
																	isOpen === false ? "-translate-x-96 opacity-0" : "translate-x-0 opacity-100"
																)}
															>
																{label}
															</p>
														</Link>
													</Button>
												</TooltipTrigger>
												{isOpen === false && <TooltipContent side='right'>{label}</TooltipContent>}
											</Tooltip>
										</TooltipProvider>
									</div>
								) : (
									<div className='w-full' key={index}>
										<CollapseMenuButton icon={Icon} label={label} active={active} submenus={submenus} isOpen={isOpen} />
									</div>
								)
							)}
						</li>
					))}
					<li className='flex w-full grow items-end'>
						<TooltipProvider disableHoverableContent>
							<Tooltip delayDuration={100}>
								<TooltipTrigger asChild>
									<Button
										onClick={async () => {
											router.push(`${BASE_PATH}/logout`)
										}}
										variant='outline'
										className='mt-5 h-10 w-full justify-center'
									>
										<span className={cn(isOpen === false ? "" : "mr-4")}>
											<LogOut size={18} />
										</span>
										<p className={cn("whitespace-nowrap", isOpen === false ? "hidden opacity-0" : "opacity-100")}>
											{navStrings.logout}
										</p>
									</Button>
								</TooltipTrigger>
								{isOpen === false && <TooltipContent side='right'>{navStrings.logout}</TooltipContent>}
							</Tooltip>
						</TooltipProvider>
					</li>
				</ul>
			</nav>
		</ScrollArea>
	)
}
