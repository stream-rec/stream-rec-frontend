import {Separator} from "@/components/new-york/ui/separator";
import React from "react";
import {SidebarNav} from "@/app/[locale]/dashboard/settings/components/sidebar-nav";
import {unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";


export default function SettingsLayout({params: {locale}, children}: { params: { locale: string }, children: React.ReactNode }) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("SettingsPage");

  const sidebarNavItems = [
    {
      title: t("globalSettings"),
      href: "/dashboard/settings",
    },
    {
      title: t("platformSettings"),
      href: "/dashboard/settings/platform",
    },
    {
      title: t("themeSettings"),
      href: "/dashboard/settings/appearance",
    },
  ]

  return (
      <>
        <div className="space-y-6 p-8 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
            <p className="text-muted-foreground">
              {t("settingsDescription")}
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