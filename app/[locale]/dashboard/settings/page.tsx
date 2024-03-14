import {Separator} from "@/components/new-york/ui/separator";
import {AlertTriangleIcon} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/new-york/ui/alert";
import React from "react";
import GlobalFormWrapper from "@/app/[locale]/dashboard/settings/global-form-wrapper";
import {unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";

export default function Settings({params: {locale}}: { params: { locale: string } }) {

  unstable_setRequestLocale(locale);

  const t = useTranslations("SettingsPage");

  return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">{t("globalSettings")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("globalSettingsDescription")}
          </p>
          <div className={"mt-6"}>
            <Alert variant={"destructive"} className={""}>
              <AlertTriangleIcon className="h-4 w-4"/>
              <AlertTitle>{t("globalSettingsAlert")}</AlertTitle>
              <AlertDescription>
                {t("globalSettingsAlertDescription")}
              </AlertDescription>
            </Alert>
          </div>
        </div>
        <Separator/>
        <GlobalFormWrapper/>
      </div>
  )
}