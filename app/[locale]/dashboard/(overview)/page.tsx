import React, {Suspense} from "react";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import StatsCardWrapper from "@/app/[locale]/dashboard/(overview)/(stats)/stats-card-wrapper";
import StreamerWrapper from "@/app/[locale]/dashboard/(overview)/(streamers)/streamer-wrapper";
import {StreamerWrapperSkeleton} from "@/app/[locale]/dashboard/(overview)/(streamers)/streamer-wrapper-skeleton";
import {getServerSession} from "next-auth";

export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title')
  };
}


export default async function DashboardPage({params: {locale}}: { params: { locale: string } }) {

  unstable_setRequestLocale(locale);

  const t = await getTranslations('Dashboard');
  const user = await getServerSession()
  if (!user) {
    console.log("no user")
    return {
      redirect: {
        destination: `/${locale}/login`,
        permanent: false
      }
    }
  }

  return (
      <>
        <div className="flex-1 flex-col space-y-8 p-8 flex">

          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
              <p className="text-muted-foreground">
                {t("summaryOfDashboard")}
              </p>
            </div>
          </div>
          <div className="flex-grow space-y-6">
            <div className="grid gap-4 md:grids-col-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-2 xl:gap-x-16">
              <StatsCardWrapper/>
            </div>
          </div>

          <div className="flex-grow space-y-6">
            <h2 className="text-xl font-bold tracking-tight">{t("streamers")}</h2>
            <div
                className="grid gap-4 grid-cols-1 md:grids-col-3 lg:grid-cols-3 lg:space-x-8">
              <Suspense fallback={<StreamerWrapperSkeleton/>}>
                <StreamerWrapper disabledString={t("status", {status: "disabled"})} inactiveString={t("status", {status: "notRecording"})}
                                 recordingString={t("status", {status: "recording"})}/>
              </Suspense>
            </div>
          </div>

        </div>
      </>
  )
}