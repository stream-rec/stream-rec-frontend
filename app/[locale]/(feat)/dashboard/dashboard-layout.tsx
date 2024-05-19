'use client';
import * as React from "react"
import {cn} from "@/lib/utils";
import {Sidebar} from "@/components/dashboard/sidebar";
import {Footer} from "@/components/dashboard/footer";
import {useStore} from "@/app/hooks/use-store";
import {useSidebarToggle} from "@/app/hooks/use-sidebar-toggle";

interface DashboardProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode,
  }[]
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
      strings,
      children,
    }: DashboardProps) {

  const sidebar = useStore(useSidebarToggle, (state) => state);

  return (
      <>
        <Sidebar navStrings={
          {
            dashboard: strings.dashboard,
            streamers: strings.streamers,
            records: strings.records,
            settings: strings.settings,
            uploads: strings.uploads,
            users: strings.streamers,
            logout: strings.logout
          }
        }/>
        <main
            className={cn(
                "min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300",
                sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
            )}
        >
          {children}
        </main>
        <footer
            className={cn(
                "transition-[margin-left] ease-in-out duration-300",
                sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
            )}
        >
          <Footer/>
        </footer>
      </>
  );
}
