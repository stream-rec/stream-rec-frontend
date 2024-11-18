import {useTranslations} from "next-intl";
import {WebForm} from "@/src/app/[locale]/(feat)/settings/web/web-form";
import {routing} from "@/src/i18n/routing";


export default function SettingsWebPage() {


  const t = useTranslations("WebSettingPage");
  const settingsT = useTranslations("SettingsPage")
  const localesT = useTranslations("Locales")
  const localesInfo = routing.locales.map((locale) => ({
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