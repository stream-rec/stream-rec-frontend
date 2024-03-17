import PlatformFormSuspense from "@/app/[locale]/dashboard/settings/platform/platform-form-suspense";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {SettingsPage} from "@/app/[locale]/dashboard/settings/components/pages";


export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title')
  };
}

export default function SettingsPlatformPage({params: {locale}}: { params: { locale: string } }) {

  unstable_setRequestLocale(locale);

  const t = useTranslations('SettingsPage');

  return (
      <SettingsPage strings={
        {
          title: t("platformSettings"),
          description: t("platformSettingsDescription")
        }
      }>
        <PlatformFormSuspense/>
      </SettingsPage>
  )
}