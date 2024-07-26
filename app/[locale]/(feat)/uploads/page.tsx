import UploadsTableWrapper from "@/app/[locale]/(feat)/uploads/components/upload-table-wrapper";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {uploadSearchParamsSchema} from "@/lib/data/uploads/definitions";
import {ContentLayout} from "@/components/dashboard/content-layout";
import {SearchParams} from "@/types/table";

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

  const t = useTranslations("UploadsPage")

  return <ContentLayout title={t("title")}>
    <UploadsTableWrapper search={search}/>
  </ContentLayout>
}