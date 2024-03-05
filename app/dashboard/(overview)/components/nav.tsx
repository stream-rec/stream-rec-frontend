"use client"

import Link from "next/link"
import {LucideIcon} from "lucide-react"

import {cn} from "@/lib/utils"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/new-york/ui/tooltip";
import {buttonVariants} from "@/components/new-york/ui/button";
import {usePathname} from "next/navigation";
import {clsx} from "clsx";


interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    label?: string
    href: string
    icon: LucideIcon
  }[]
}

export function Nav({links, isCollapsed}: NavProps) {


  const pathname = usePathname();

  const isCurrentLink = (link: string) => {
    if (pathname.startsWith("/dashboard/settings") && link === "/dashboard/settings" || pathname.startsWith("/dashboard/streamers") && link === "/dashboard/streamers") {
      return true
    }
    return pathname === link
  };

  const computeVariant = (link: string) => {
    if (isCurrentLink(link)) return "default"
    return "ghost"
  };

  return (
      <div
          data-collapsed={isCollapsed}
          className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
              isCollapsed ? (
                  // eslint-disable-next-line react/jsx-no-undef
                  <Tooltip key={index} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                          href={link.href}
                          className={clsx(
                              cn(
                                  buttonVariants({variant: computeVariant(link.href), size: "icon"}),
                                  "h-9 w-9",
                              ),
                              {
                                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white": isCurrentLink(link.href)
                              }
                          )}
                      >
                        <link.icon className="h-4 w-4"/>
                        <span className="sr-only">{link.title}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center gap-4">
                      {link.title}
                      {link.label && (
                          <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                      )}
                    </TooltipContent>
                  </Tooltip>
              ) : (
                  <Link
                      key={index}
                      href={link.href}
                      className={clsx(
                          cn(
                              buttonVariants({variant: computeVariant(link.href), size: "sm"}),
                              "justify-start"
                          ),
                          {
                            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white": isCurrentLink(link.href),
                          }
                      )}
                  >
                    <link.icon className="mr-2 h-4 w-4"/>
                    {link.title}
                    {link.label && (
                        <span
                            className={clsx(
                                cn(
                                    "ml-auto",
                                ),
                                {"text-background dark:text-white": isCurrentLink(link.href)}
                            )}
                        >
                  {link.label}
                </span>
                    )}
                  </Link>
              )
          )}
        </nav>
      </div>
  )
}