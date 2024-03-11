import {Separator} from "@/components/new-york/ui/separator";
import React from "react";
import {unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";

export default function Layout({params : {locale}, children}: { params : {locale : string} , children: React.ReactNode }) {

  unstable_setRequestLocale(locale);

  const t = useTranslations("UploadDetails")

  return (
      <>
        <div className="space-y-6 p-8 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
            <p className="text-muted-foreground">
              {t("description")}
            </p>
          </div>
          <Separator className="my-6"/>
          <div className={"flex-1 lg:max-w-2xl"}>
            {children}
          </div>
        </div>
      </>
  )
}