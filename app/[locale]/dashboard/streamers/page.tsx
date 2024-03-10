import React, {Suspense} from "react";
import {Button} from "@/components/new-york/ui/button";
import {PlusCircledIcon} from "@radix-ui/react-icons";
import {Link} from "@/i18n";
import StreamerListSkeleton from "@/app/[locale]/dashboard/streamers/components/streamer-skeleton";
import StreamerList from "@/app/[locale]/dashboard/streamers/components/streamer-list";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";


export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});
  return {
    title: t('title')
  };
}

export default function Page({params: {locale}}: { params: { locale: string } }) {

  unstable_setRequestLocale(locale);

  const t = useTranslations('StreamersPage');


  return <div className="flex-1 flex-col space-y-8 p-8 md:flex">

    <div className="flex flex-col md:flex-row space-x-0 md:items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t("streamers")}</h2>
        <p className="text-muted-foreground">
          {t("summaryOfStreamers")}.
        </p>
      </div>
      <Link href={"/dashboard/streamers/new"}>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4"/>
          {t("addStreamer")}
        </Button>
      </Link>
    </div>

    <Suspense fallback={<StreamerListSkeleton/>}>
      <StreamerList/>
    </Suspense>
  </div>
}