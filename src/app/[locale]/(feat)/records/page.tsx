import RecordTableWrapper from "@/src/app/[locale]/(feat)/records/components/records-table-wrapper";
import {getTranslations} from "next-intl/server";
import {useTranslations} from "next-intl";
import {streamSearchParamsSchema, StreamsSearchParams} from "@/src/lib/data/streams/definitions";
import {ContentLayout} from "@/src/components/dashboard/content-layout";


export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});
  return {
    title: t('title')
  };
}

type RecordsPageProps = {
  searchParams: StreamsSearchParams
}

export default function RecordsPage({searchParams}: RecordsPageProps) {

  const search = streamSearchParamsSchema.parse(searchParams)

  const t = useTranslations("RecordsPage")

  return <>
    <ContentLayout title={t("title")}>
      <RecordTableWrapper search={search}/>
    </ContentLayout>
  </>
}