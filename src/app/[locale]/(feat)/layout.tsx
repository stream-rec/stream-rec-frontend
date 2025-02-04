import { cookies, } from "next/headers";
import Image from "next/image";
import { DashboardLayout } from "@/src/app/[locale]/(feat)/dashboard/dashboard-layout";
import React, { use } from "react";
import { useSidebarTranslations } from '@/src/app/hooks/translations/use-sidebar-translations';
import { BASE_PATH } from "@/src/lib/routes";


export default function Layout({ children }: { children: Readonly<React.ReactNode> }) {

  const userCookies = use(cookies())
  const translations = useSidebarTranslations()

  const accounts = [
    {
      label: userCookies.get('username')?.value || "stream-rec",
      email: userCookies.get('username')?.value || "stream-rec",
      icon: <Image src={`${BASE_PATH}/stream-rec.svg`} width={40} height={40} alt={"Stream rec icon"} />,
    },

  ]

  return (
    <DashboardLayout accounts={accounts} strings={translations}>{children}
    </DashboardLayout>
  );
}