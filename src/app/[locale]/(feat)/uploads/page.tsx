import UploadsTableWrapper from "@/src/app/[locale]/(feat)/uploads/components/upload-table-wrapper";
import {getTranslations} from "next-intl/server";
import {useTranslations} from "next-intl";
import {uploadSearchParamsSchema} from "@/src/lib/data/uploads/definitions";
import {ContentLayout} from "@/src/components/dashboard/content-layout";
import {SearchParams} from "@/src/types/table";

export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title')
  };
}

type UploadPageProps = {
  searchParams: SearchParams
}

export default function UploadPage({searchParams}: UploadPageProps) {

  const search = uploadSearchParamsSchema.parse(searchParams)

  const t = useTranslations("UploadsPage")

  return <ContentLayout title={t("title")}>
    <UploadsTableWrapper search={search}/>
  </ContentLayout>
}