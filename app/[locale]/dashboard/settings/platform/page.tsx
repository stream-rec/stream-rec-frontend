import {Separator} from "@/components/new-york/ui/separator";
import PlatformFormWrapper from "@/app/[locale]/dashboard/settings/platform/platform-form-wrapper";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";


export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title')
  };
}

export default function SettingsPlatformPage({params: {locale}}: { params: { locale: string } }) {

  unstable_setRequestLocale(locale);

  const t = useTranslations('Settings');

  return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">{t("platformSettings")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("platformSettingsDescription")}
          </p>
        </div>
        <Separator/>
        <PlatformFormWrapper/>
      </div>
  )
}