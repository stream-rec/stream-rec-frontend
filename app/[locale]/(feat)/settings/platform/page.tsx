import PlatformFormSuspense from "@/app/[locale]/(feat)/settings/platform/platform-form-suspense";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {SettingsPage} from "@/app/[locale]/(feat)/settings/components/pages";


export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title')
  };
}

export default function SettingsPlatformPage({params: {locale}}: { params: { locale: string } }) {

  unstable_setRequestLocale(locale);

  return (
      <SettingsPage>
        <PlatformFormSuspense/>
      </SettingsPage>
  )
}