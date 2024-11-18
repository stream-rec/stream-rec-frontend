import React, {Suspense} from "react";
import {Button} from "@/src/components/new-york/ui/button";
import {PlusCircledIcon} from "@radix-ui/react-icons";
import StreamerListSkeleton from "@/src/app/[locale]/(feat)/streamers/components/streamer-skeleton";
import StreamerList from "@/src/app/[locale]/(feat)/streamers/components/streamer-list";
import {getTranslations} from "next-intl/server";
import {useTranslations} from "next-intl";
import {ContentLayout} from "@/src/components/dashboard/content-layout";
import {Link} from "@/src/i18n/routing";


export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});
  return {
    title: t('title')
  };
}

export default function Page() {

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