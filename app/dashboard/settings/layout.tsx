import {Separator} from "@/components/new-york/ui/separator";
import {SidebarNav} from "@/app/dashboard/settings/components/sidebar-nav";
import React from "react";

const sidebarNavItems = [
  {
    title: "Global settings",
    href: "/dashboard/settings",
  },
  {
    title: "Platform settings",
    href: "/dashboard/settings/platform",
  },
  {
    title: "Appearance",
    href: "/dashboard/settings/appearance",
  },
]


interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({children}: SettingsLayoutProps) {
  return (
      <>
        <div className="space-y-6 p-8 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your global, platforms and appearance settings.
            </p>
          </div>
          <Separator className="my-6"/>
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="lg:w-1/8">
              <SidebarNav items={sidebarNavItems}/>
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </>
  )
}