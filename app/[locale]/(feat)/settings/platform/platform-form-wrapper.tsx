import {useHuyaTranslations} from "@/app/hooks/translations/huya-translations";
import PlatformForm from "@/app/[locale]/(feat)/settings/platform/platform-form";
import {GlobalConfig} from "@/lib/data/config/definitions";
import {useTranslations} from "next-intl";
import React from "react";
import {useDouyinQualityTranslations, useDouyinTranslations} from "@/app/hooks/translations/douyin-translations";
import {useDouyuQualityTranslations, useDouyuTranslations} from "@/app/hooks/translations/douyu-translations";
import {useTwitchQualityTranslations, useTwitchTranslations} from "@/app/hooks/translations/twitch-translations";
import {usePandaTvQualityTranslations, usePandaTvTranslations} from "@/app/hooks/translations/pandatv-translations";
import {useWeiboTranslations} from "@/app/hooks/translations/weibo-translations";


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

  const pandaT = usePandaTvTranslations()
  const pandaQualityOptions = usePandaTvQualityTranslations()

  const weiboT = useWeiboTranslations()

  const settingsT = useTranslations("SettingsPage")
  return (
      <>
        <PlatformForm defaultValues={config} huyaStrings={huyaT} douyinQualityOptions={douyinQualityOptions}
                      douyinStrings={douyinT}
                      douyuStrings={douyuT} douyuQualityOptions={douyuQualityOptions}
                      twitchStrings={twitchT} twitchQualityOptions={twitchQualityOptions}
                      pandaStrings={pandaT} pandaQualityOptions={pandaQualityOptions}
                      weiboStrings={weiboT}
                      save={settingsT("save")}/>
      </>
  )
}