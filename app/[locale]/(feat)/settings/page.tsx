import React from "react";
import {unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {GlobalFormSuspense} from "@/app/[locale]/(feat)/settings/(global)/global-form-suspense";
import {SettingsPage} from "@/app/[locale]/(feat)/settings/components/pages";

export default function Settings({params: {locale}}: { params: { locale: string } }) {

  unstable_setRequestLocale(locale);

  const t = useTranslations("SettingsPage");

  return (
      <SettingsPage>
        <GlobalFormSuspense/>
      </SettingsPage>
  )
}