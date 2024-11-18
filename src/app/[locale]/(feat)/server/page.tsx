import {getTranslations} from "next-intl/server";
import React, {Suspense} from "react";
import {ContentLayout} from "@/src/components/dashboard/content-layout";
import {fetchServerConfig} from "@/src/lib/data/server/api";
import SystemInfo from "@/src/app/[locale]/(feat)/server/system-info-cards";
import {useServerInfoTranslations} from "@/src/app/hooks/translations/use-server-info-translations";
import SystemInfoSkeleton from "@/src/app/[locale]/(feat)/server/system-info-cards-skeleton";
import {Alert, AlertDescription, AlertTitle} from "@/src/components/new-york/ui/alert";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {MIN_SERVER_VERSION} from "@/src/lib/data/server/definitions";


export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});
  return {
    title: t('title')
  };
}

export default function ServerPage() {

  const strings = useServerInfoTranslations()

  const config = React.use(fetchServerConfig())

  function shouldShowAlert() {
    return config.versionCode < Number(MIN_SERVER_VERSION)
  }

  return <ContentLayout title={strings.title}>

    <div className={"flex flex-col gap-y-6"}>
      {shouldShowAlert() &&
          <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4"/>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {strings.currentVersionNotSupported}
              </AlertDescription>
          </Alert>
      }

      <Suspense fallback={<SystemInfoSkeleton strings={strings}/>}>
        <SystemInfo strings={strings} systemInfo={config}/>
      </Suspense>
    </div>

  </ContentLayout>
}