import {cookies} from "next/headers";
import Image from "next/image";
import {DashboardLayout} from "@/app/[locale]/(feat)/dashboard/dashboard-layout";
import React from "react";
import {unstable_setRequestLocale} from "next-intl/server";
import {useSidebarTranslations} from "@/app/hooks/translations/use-sidebar-translations";


export default function Layout({params: {locale}, children}: { params: { locale: string }, children: React.ReactNode }) {

  unstable_setRequestLocale(locale);

  const sidebarT = useSidebarTranslations()

  const accounts = [
    {
      label: cookies().get('username')?.value || "stream-rec",
      email: cookies().get('username')?.value || "stream-rec",
      icon: <Image src={"/stream-rec.svg"} width={40} height={40} alt={"Stream rec icon"}/>,
    },
  ]

  return (
      <DashboardLayout accounts={accounts} strings={sidebarT}>{children}
      </DashboardLayout>
  );
}