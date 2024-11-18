import React from "react";
import {useTranslations} from "next-intl";
import {GlobalFormSuspense} from "@/src/app/[locale]/(feat)/settings/(global)/global-form-suspense";
import {SettingsPage} from "@/src/app/[locale]/(feat)/settings/components/pages";

export default function Settings() {

  const t = useTranslations("SettingsPage");

  return (
      <SettingsPage>
        <GlobalFormSuspense/>
      </SettingsPage>
  )
}