import {fetchStream} from "@/src/lib/data/streams/stream-apis";
import {fetchUploadResults} from "@/src/lib/data/uploads/upload-apis";
import {RecordsDetails} from "@/src/app/[locale]/(feat)/records/components/records-details";
import {getTranslations} from "next-intl/server";


export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title')
  };
}

export default async function Page({params}: { params: { id: string } }) {


  const streamData = fetchStream(params.id)

  const uploadResults = fetchUploadResults(params.id)

  const [stream, uploads] = await Promise.all([streamData, uploadResults])

  const hasSuccessfulUpload = uploads.filter((result) => result.isSuccess).length > 0

  return (
      <>
        <RecordsDetails data={stream} isUploaded={hasSuccessfulUpload}/>
      </>
  )
}