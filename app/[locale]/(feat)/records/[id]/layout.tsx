import React from "react";
import {unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {ContentLayout} from "@/components/dashboard/content-layout";


export default function StreamCardLayout({params: {locale}, children}: { params: { locale: string }, children: React.ReactNode }) {

  unstable_setRequestLocale(locale);

  const t = useTranslations("RecordDetails")

  return <ContentLayout title={t("title")}>
    <div className="flex-1 lg:max-w-2xl">{children}</div>
  </ContentLayout>
}