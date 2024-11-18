import React from "react";
import {getTranslations} from "next-intl/server";
import {ContentLayout} from "@/src/components/dashboard/content-layout";
import StatsCardGrid from "@/src/app/[locale]/(feat)/(stats)/stats-card-grid";
import {useTranslations} from "next-intl";
import {StreamerGridList} from "@/src/app/[locale]/(feat)/streamers/components/streamer-grid-list";
import {redirect} from "@/src/i18n/routing";
import {auth} from "@/src/providers/auth";

export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title')
  };
}


export default function DashboardPage({params: {locale}}: { params: { locale: string } }) {

  const user = React.use(auth());
  const t = useTranslations('Dashboard');

  if (!user) {
    console.error("no user!")
    redirect({
      locale: locale,
      href: "/login"
    })
  } else {
    if (user.user.isFirstUsePassword) {
      redirect({
        locale: locale,
        href: "/reset-password"
      })
    }
  }

  const getTitleTranslation = (status: string) => t("status", {status: status});

  return <ContentLayout title={t("title")}>
    <div className="flex flex-col space-y-8">
      <StatsCardGrid/>
      <StreamerGridList disabledString={getTitleTranslation("disabled")}
                        inactiveString={getTitleTranslation("notRecording")}
                        recordingString={getTitleTranslation("recording")}/>
    </div>
  </ContentLayout>
}