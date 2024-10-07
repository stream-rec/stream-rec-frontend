import React from "react";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {ContentLayout} from "@/components/dashboard/content-layout";
import StatsCardGrid from "@/app/[locale]/(feat)/(stats)/stats-card-grid";
import {useTranslations} from "next-intl";
import {StreamerGridList} from "@/app/[locale]/(feat)/streamers/components/streamer-grid-list";
import {auth} from "@/auth";
import {redirect} from "@/i18n";

export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title')
  };
}


export default function DashboardPage({params: {locale}}: { params: { locale: string } }) {

  unstable_setRequestLocale(locale);

  const user = React.use(auth());
  const t = useTranslations('Dashboard');

  if (!user) {
    console.error("no user!")
    redirect("/login")
  } else {
    if (user.user.isFirstUsePassword) {
      redirect("/reset-password")
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