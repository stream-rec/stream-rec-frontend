'use server'
import {fetchConfig} from "@/lib/data/config/apis";
import PlatformForm from "@/app/[locale]/dashboard/settings/platform/platform-form";
import {getTranslations} from "next-intl/server";

export default async function PlatformFormWrapper() {

  const config = await fetchConfig()

  const t = await getTranslations("Huya")
  const douyinStrings = await getTranslations("Douyin")
  const douyinQualityStrings = await getTranslations("DouyinQualities")
  const douyinQualityKeys = ['origin', 'uhd', 'hd', 'sd', 'ld', 'md', 'ao'] as const

  const douyinQualityOptions = douyinQualityKeys.map((key) => ({
    quality: douyinQualityStrings(`${key}.id`),
    description: douyinQualityStrings(`${key}.name`)
  }))

  const globalStrings = await getTranslations("GlobalSettings")
  return (
      <>
        <PlatformForm defaultValues={config} huyaStrings={{
          platform: t("platform"),
          cdn: t("cdn"),
          cdnDescription: t("cdnDescription"),
          cdnDefault: t("cdnDefault"),
          bitrate: t("bitrate"),
          bitrateDescription: t("bitrateDescription"),
          part: t("part"),
          partDescription: t.rich("partDescription"),
          cookieString: t("cookieString"),
          cookieDescription: t.rich("cookieDescription"),
        }} douyinQualityOptions={douyinQualityOptions} douyinStrings={{
          platform: douyinStrings("platform"),
          quality: douyinStrings("quality"),
          qualityDescription: douyinStrings("qualityDescription"),
          qualityDefault: douyinStrings("qualityDefault"),
          part: douyinStrings("part"),
          partDescription: douyinStrings.rich("partDescription"),
          cookies: douyinStrings("cookieString"),
          cookiesDescription: douyinStrings.rich("cookiesDescription"),
        }} save={globalStrings("save")}/>
      </>
  )
}