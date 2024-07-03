import React, {Suspense} from "react";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {getServerSession} from "next-auth";
import {ContentLayout} from "@/components/dashboard/content-layout";
import {StreamerWrapperSkeleton} from "@/app/[locale]/(feat)/streamers/components/streamer-wrapper-skeleton";
import StatsCardWrapper from "@/app/[locale]/(feat)/(stats)/stats-card-wrapper";
import {useTranslations} from "next-intl";
import {StreamerWrapper} from "@/app/[locale]/(feat)/streamers/components/streamer-wrapper";

export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title')
  };
}


export default function DashboardPage({params: {locale}}: { params: { locale: string } }) {

  unstable_setRequestLocale(locale);

  const t = useTranslations('Dashboard');
  const user = React.use(getServerSession());

  if (!user) {
    console.log("no user")
    return {
      redirect: {
        destination: `/${locale}/login`,
        permanent: false
      }
    }
  }

  const getTitleTranslation = (status: string) => t("status", {status: status});

  return <ContentLayout title={t("title")}>
    <div className="flex flex-col space-y-8">
      <div className="grid gap-4 md:grids-col-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-2 xl:gap-x-16">
        <StatsCardWrapper/>
      </div>

      <div
          className="grid gap-4 grid-cols-1 md:grids-col-3 lg:grid-cols-3 lg:space-x-8">
        <Suspense fallback={<StreamerWrapperSkeleton recording={getTitleTranslation("recording")}
                                                     inactive={getTitleTranslation("notRecording")}
                                                     disabled={getTitleTranslation("disabled")}/>}>
          <StreamerWrapper disabledString={getTitleTranslation("disabled")}
                           inactiveString={getTitleTranslation("notRecording")}
                           recordingString={getTitleTranslation("recording")}/>
        </Suspense>
      </div>

    </div>
  </ContentLayout>
}