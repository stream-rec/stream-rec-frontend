import {useHuyaTranslations} from "@/app/[locale]/dashboard/translations/huya-translations";
import PlatformForm from "@/app/[locale]/dashboard/settings/platform/platform-form";
import {GlobalConfig} from "@/lib/data/config/definitions";
import {useTranslations} from "next-intl";
import React from "react";
import {useDouyinQualityTranslations, useDouyinTranslations} from "@/app/[locale]/dashboard/translations/douyin-translations";


type PlatformFormSuspenseProps = {
  configPromise: Promise<GlobalConfig>
}

export function PlatformFormWrapper({configPromise}: PlatformFormSuspenseProps) {

  const config = React.use(configPromise)

  const huyaT = useHuyaTranslations()
  const douyinT = useDouyinTranslations()
  const douyinQualityOptions = useDouyinQualityTranslations()

  const settingsT = useTranslations("Settings")
  return (
      <>
        <PlatformForm defaultValues={config} huyaStrings={huyaT} douyinQualityOptions={douyinQualityOptions} douyinStrings={douyinT}
                      save={settingsT("save")}/>
      </>
  )
}