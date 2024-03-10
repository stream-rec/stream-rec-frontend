import {Separator} from "@/components/new-york/ui/separator";
import {AppearanceForm} from "@/app/[locale]/dashboard/settings/appearance/appearance-form";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";


export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title')
  };
}


export default function SettingsAppearancePage({params: {locale}}: { params: { locale: string } }) {

  unstable_setRequestLocale(locale);

  const t = useTranslations("Settings");
  const themes = useTranslations("Themes")
  const toast = useTranslations("Toast")

  return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">{t("themeSettings")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("themeSettingsDescription")}
          </p>
        </div>
        <Separator/>
        <AppearanceForm fontDescription={t("themeSettingsFontDescription")}
                        fontString={t("themeSettingsFont")}
                        saveButton={t("save")}
                        themeDark={themes("dark")}
                        themeDescription={t("themeSettingsDescription")}
                        themeLight={themes("light")}
                        themeString={t("themeSettings")}
                        submitMessage={toast("submitMessage")}/>
      </div>
  )
}