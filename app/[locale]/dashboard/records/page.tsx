import RecordTableWrapper from "@/app/[locale]/dashboard/records/components/records-table-wrapper";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {streamSearchParamsSchema, StreamsSearchParams} from "@/lib/data/streams/definitions";


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

  return (<>
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
              <p className="text-muted-foreground">
                {t("description")}
              </p>
            </div>
          </div>
          <RecordTableWrapper search={search}/>
        </div>
      </>
  )
}