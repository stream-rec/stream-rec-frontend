import React, {Suspense} from "react";
import {Button} from "@/components/new-york/ui/button";
import {PlusCircledIcon} from "@radix-ui/react-icons";
import {Link} from "@/i18n";
import StreamerListSkeleton from "@/app/[locale]/(feat)/streamers/components/streamer-skeleton";
import StreamerList from "@/app/[locale]/(feat)/streamers/components/streamer-list";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {ContentLayout} from "@/components/dashboard/content-layout";


export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});
  return {
    title: t('title')
  };
}

export default function Page({params: {locale}}: { params: { locale: string } }) {

  unstable_setRequestLocale(locale);

  const t = useTranslations('StreamersPage');

  return <ContentLayout title={t("title")}>
    <div className="flex flex-col space-y-8 md:flex">
      <Link href={"/streamers/new"}>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4"/>
          {t("addStreamer")}
        </Button>
      </Link>
      <Suspense fallback={<StreamerListSkeleton/>}>
        <StreamerList/>
      </Suspense>
    </div>
  </ContentLayout>
}