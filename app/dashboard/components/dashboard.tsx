'use client';
import * as React from "react"
import {TooltipProvider} from "@/components/new-york/ui/tooltip";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/new-york/ui/resizable";
import {cn} from "@/lib/utils";
import {FileVideo2, LucideLayoutDashboard, LucideUsers, Settings, UploadCloud} from "lucide-react";
import {AccountSwitcher} from "@/app/dashboard/components/account-switcher";
import {Separator} from "@/components/new-york/ui/separator";
import {Nav} from "@/app/dashboard/components/nav";

interface MailProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
  children?: React.ReactNode
}


export function DashboardLayout(
    {
      accounts,
      defaultLayout = [265, 655],
      defaultCollapsed = false,
      navCollapsedSize,
      children,
    }: MailProps) {

  const handleCollapse = () => {
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
  }
  const handleExpand = () => {
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
  }

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)


  return (
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-col max-h-full min-h-screen">
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
                  links={[
                    {
                      title: "Dashboard",
                      label: "",
                      href: "/dashboard",
                      icon: LucideLayoutDashboard,
                    },
                    {
                      title: "Streamers",
                      label: "",
                      href: "/dashboard/streamers",
                      icon: LucideUsers,
                    },
                    {
                      title: "Records",
                      label: "",
                      href: "/dashboard/records",
                      icon: FileVideo2,
                    },

                    {
                      title: "Uploads",
                      label: "",
                      href: "/dashboard/uploads",
                      icon: UploadCloud,
                    },
                    {
                      title: "Settings",
                      label: "",
                      href: "/dashboard/settings",
                      icon: Settings,
                    },
                  ]}
              />
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30} className="">
              {children}
              {/*<Image*/}
              {/*    src="https://plus.unsplash.com/premium_photo-1673480195911-3075a87738b0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"*/}
              {/*    width={1080} // arbitrary width*/}
              {/*    height={900} // calculated height based on aspect ratio*/}
              {/*    alt="Image" className="rounded-md object-cover w-full h-full"*/}
              {/*/>*/}

              {/*<Tabs defaultValue="all">*/}
              {/*  <div className="flex items-center px-4 py-2">*/}
              {/*    <h1 className="text-xl font-bold">Inbox</h1>*/}
              {/*    <TabsList className="ml-auto">*/}
              {/*      <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">All mail</TabsTrigger>*/}
              {/*      <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">Unread</TabsTrigger>*/}
              {/*    </TabsList>*/}
              {/*  </div>*/}
              {/*  <Separator/>*/}
              {/*  <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">*/}
              {/*    <form>*/}
              {/*      <div className="relative">*/}
              {/*        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>*/}
              {/*        <Input placeholder="Search" className="pl-8"/>*/}
              {/*      </div>*/}
              {/*    </form>*/}
              {/*  </div>*/}
              {/*  <TabsContent value="all" className="m-0">*/}
              {/*    /!*<MailList items={mails} />*!/*/}
              {/*    <div className="flex items-center justify-center h-full w-screen">*/}
              {/*      <p className="text-muted-foreground">No mail found</p>*/}
              {/*    </div>*/}


              {/*   */}

              {/*  </TabsContent>*/}
              {/*  <TabsContent value="unread" className="m-0">*/}

              {/*  </TabsContent>*/}
              {/*</Tabs>*/}
            </ResizablePanel>
            <ResizableHandle/>
          </ResizablePanelGroup>

        </div>
      </TooltipProvider>
  )
}
