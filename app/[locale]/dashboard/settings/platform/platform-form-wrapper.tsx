import {useHuyaTranslations} from "@/app/[locale]/dashboard/translations/huya-translations";
import PlatformForm from "@/app/[locale]/dashboard/settings/platform/platform-form";
import {GlobalConfig} from "@/lib/data/config/definitions";
import {useTranslations} from "next-intl";
import React from "react";
import {useDouyinQualityTranslations, useDouyinTranslations} from "@/app/[locale]/dashboard/translations/douyin-translations";
import {useDouyuQualityTranslations, useDouyuTranslations} from "@/app/[locale]/dashboard/translations/douyu-translations";
import {useTwitchQualityTranslations, useTwitchTranslations} from "@/app/[locale]/dashboard/translations/twitch-translations";


type PlatformFormSuspenseProps = {
  configPromise: Promise<GlobalConfig>
}

export function PlatformFormWrapper({configPromise}: PlatformFormSuspenseProps) {

  const config = React.use(configPromise)

  const huyaT = useHuyaTranslations()
  const douyinT = useDouyinTranslations()
  const douyinQualityOptions = useDouyinQualityTranslations()

  const douyuT = useDouyuTranslations()
  const douyuQualityOptions = useDouyuQualityTranslations()

  const twitchT = useTwitchTranslations()
  const twitchQualityOptions = useTwitchQualityTranslations()

  const settingsT = useTranslations("SettingsPage")
  return (
      <>
        <PlatformForm defaultValues={config} huyaStrings={huyaT} douyinQualityOptions={douyinQualityOptions} douyinStrings={douyinT}
                      douyuStrings={douyuT} douyuQualityOptions={douyuQualityOptions}
                      twitchStrings={twitchT} twitchQualityOptions={twitchQualityOptions}
                      save={settingsT("save")}/>
      </>
  )
}