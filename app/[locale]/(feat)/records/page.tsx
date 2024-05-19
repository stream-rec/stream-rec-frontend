import RecordTableWrapper from "@/app/[locale]/(feat)/records/components/records-table-wrapper";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {streamSearchParamsSchema, StreamsSearchParams} from "@/lib/data/streams/definitions";
import {ContentLayout} from "@/components/dashboard/content-layout";


export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});
  return {
    title: t('title')
  };
}

type RecordsPageProps = {
  params: {
    locale: string
  }
  searchParams: StreamsSearchParams
}

export default function RecordsPage({params: {locale}, searchParams}: RecordsPageProps) {
  unstable_setRequestLocale(locale);

  const search = streamSearchParamsSchema.parse(searchParams)

  const t = useTranslations("RecordsPage")

  return <>
    <ContentLayout title={t("title")}>
      <RecordTableWrapper search={search}/>
    </ContentLayout>
  </>
}