import UploadsTableWrapper from "@/app/[locale]/dashboard/uploads/components/upload-table-wrapper";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {SearchParams} from "@/app/components/table/data-table";
import {uploadSearchParamsSchema} from "@/lib/data/uploads/definitions";

export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title')
  };
}

type UploadPageProps = {
  params: {
    locale: string
  }
  searchParams: SearchParams
}

export default function UploadPage({params: {locale}, searchParams}: UploadPageProps) {
  unstable_setRequestLocale(locale);

  const search = uploadSearchParamsSchema.parse(searchParams)

  const t = useTranslations("Upload")

  return (<>
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
              <p className="text-muted-foreground">{t("description")}</p>
            </div>
          </div>
          <UploadsTableWrapper search={search}/>
        </div>
      </>
  )
}