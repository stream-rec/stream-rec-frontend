import {cookies} from "next/headers";
import Image from "next/image";
import {DashboardLayout} from "@/src/app/[locale]/(feat)/dashboard/dashboard-layout";
import React from "react";
import {useSidebarTranslations} from "@/src/app/hooks/translations/use-sidebar-translations";


export default function Layout({children}: { children: Readonly<React.ReactNode> }) {


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