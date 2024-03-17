import {AppearanceForm} from "@/app/[locale]/dashboard/settings/appearance/appearance-form";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {SettingsPage} from "@/app/[locale]/dashboard/settings/components/pages";


export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});
  return {
    title: t('title')
  };
}


export default function SettingsAppearancePage({params: {locale}}: { params: { locale: string } }) {

  unstable_setRequestLocale(locale);

  const t = useTranslations("SettingsPage");
  const themes = useTranslations("Themes")
  const toast = useTranslations("Toast")

  return (
      <SettingsPage strings={{
        title: t("themeSettings"),
        description: t("themeSettingsDescription"),
      }}>
        <AppearanceForm fontDescription={t("themeSettingsFontDescription")}
                        fontString={t("themeSettingsFont")}
                        saveButton={t("save")}
                        themeDark={themes("dark")}
                        themeDescription={t("themeSettingsDescription")}
                        themeLight={themes("light")}
                        themeString={t("themeSettings")}
                        submitMessage={toast("submitMessage")}/>
      </SettingsPage>
  )
}