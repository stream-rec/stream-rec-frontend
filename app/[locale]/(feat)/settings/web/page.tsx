import {unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {WebForm} from "@/app/[locale]/(feat)/settings/web/web-form";
import {locales} from "@/i18n";
import {SettingsPage} from "@/app/[locale]/(feat)/settings/components/pages";


export default function SettingsWebPage({params: {locale}}: { params: { locale: string } }) {

  unstable_setRequestLocale(locale);

  const t = useTranslations("WebSettingPage");
  const settingsT = useTranslations("SettingsPage")
  const localesT = useTranslations("Locales")
  const localesInfo = locales.map((locale) => ({
    id: locale,
    name: localesT(`${locale}`)
  }))

  return (
      <div className={"space-y-6"}>
        <WebForm strings={
          {
            locale: t("locale"),
            localeDescription: t("localeDescription"),
            locales: localesInfo,
            save: settingsT("save")
          }
        }/>
      </div>
  )
}