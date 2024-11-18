import React from "react";
import {useTranslations} from "next-intl";
import {ContentLayout} from "@/src/components/dashboard/content-layout";

export default function Layout({children}: { children: Readonly<React.ReactNode> }) {

  const t = useTranslations("NewStreamerPage")
  return (
      <>
        <ContentLayout title={t("title")}>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </ContentLayout>
      </>
  )
}