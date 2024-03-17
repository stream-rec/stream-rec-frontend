import {AlertTriangleIcon} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/new-york/ui/alert";
import React from "react";
import {unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {GlobalFormSuspense} from "@/app/[locale]/dashboard/settings/(global)/global-form-suspense";
import {SettingsPage} from "@/app/[locale]/dashboard/settings/components/pages";

export default function Settings({params: {locale}}: { params: { locale: string } }) {

  unstable_setRequestLocale(locale);

  const t = useTranslations("SettingsPage");

  return (
      <>
        <SettingsPage strings={{
          title: t("globalSettings"),
          description: t("globalSettingsDescription")
        }} top={<div className={"mt-6"}>
          <Alert variant={"destructive"} className={""}>
            <AlertTriangleIcon className="h-4 w-4"/>
            <AlertTitle>{t("globalSettingsAlert")}</AlertTitle>
            <AlertDescription>
              {t("globalSettingsAlertDescription")}
            </AlertDescription>
          </Alert>
        </div>
        }>
          <GlobalFormSuspense/>
        </SettingsPage>
      </>
  )
}