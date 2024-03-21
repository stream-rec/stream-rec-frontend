'use client';
import * as React from "react"
import {TooltipProvider} from "@/components/new-york/ui/tooltip";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/new-york/ui/resizable";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/new-york/ui/separator";
import {AccountSwitcher} from "@/app/[locale]/dashboard/(overview)/components/account-switcher";
import {Nav} from "@/app/[locale]/dashboard/(overview)/components/nav";
import {FileVideo2, LogOutIcon, LucideLayoutDashboard, LucideUsers, Settings, UploadCloud} from "lucide-react";
import {signOut} from "next-auth/react";

interface DashboardProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode,
  }[]
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
  strings: {
    dashboard: string
    streamers: string
    records: string
    settings: string
    uploads: string,
    logout: string
  }
  children?: React.ReactNode
}


export function DashboardLayout(
    {
      accounts,
      defaultLayout = [265, 655],
      defaultCollapsed = false,
      navCollapsedSize,
      strings,
      children,
    }: DashboardProps) {


  const dashboardLinks = React.useMemo(() =>
      [
        {
          title: strings.dashboard,
          label: "",
          href: "/dashboard",
          icon: LucideLayoutDashboard,
        },
        {
          title: strings.streamers,
          label: "",
          href: "/dashboard/streamers",
          icon: LucideUsers,
        },
        {
          title: strings.records,
          label: "",
          href: "/dashboard/records",
          icon: FileVideo2,
        },

        {
          title: strings.uploads,
          label: "",
          href: "/dashboard/uploads",
          icon: UploadCloud,
        },
        {
          title: strings.settings,
          label: "",
          href: "/dashboard/settings",
          icon: Settings,
        },
        {
          title: strings.logout,
          label: "",
          href: "/login",
          icon: LogOutIcon,
          action: async () => {
            await signOut({
              callbackUrl: "/login"
            })
          }
        }
      ], [strings])

  const handleCollapse = () => {
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
  }
  const handleExpand = () => {
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
  }

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)


  return (
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-col">
          <ResizablePanelGroup
              direction="horizontal"
              onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                    sizes
                )}`
              }}
              className="h-full w-full overflow-hidden bg-background/95 dark:bg-background/95"
          >

            <ResizablePanel
                defaultSize={defaultLayout[0]}
                collapsedSize={navCollapsedSize}
                collapsible={true}
                minSize={15}
                maxSize={20}
                onCollapse={() => {
                  handleCollapse()
                  setIsCollapsed(true)
                }}
                onExpand={() => {
                  handleExpand()
                  setIsCollapsed(false)
                }}
                className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
            >
              <div className={cn("flex h-[52px] items-center justify-center", isCollapsed ? 'h-[52px]' : 'px-2')}>
                <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts}/>
              </div>
              <Separator/>
              <Nav

                  isCollapsed={isCollapsed}
                  links={dashboardLinks}
              />
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30} className="max-h-full min-h-svh">
              {children}
            </ResizablePanel>
            <ResizableHandle/>
          </ResizablePanelGroup>

        </div>
      </TooltipProvider>
  )
}
