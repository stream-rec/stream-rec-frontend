import {fetchStream, fetchStreams} from "@/app/lib/data/streams/stream-apis";
import {RecordsDetails} from "@/app/dashboard/records/components/records-details";
import {fetchUploadResults} from "@/app/lib/data/uploads/upload-apis";

export async function generateStaticParams() {
  const streams = await fetchStreams()
  return streams.map(stream => ({params: {id: stream.id.toString()}}))
}

export default async function Page({params}: { params: { id: string } }) {

  const {id} = params

  const streamData = fetchStream(id)

  const uploadResults = fetchUploadResults(id)

  const [stream, uploads] = await Promise.all([streamData, uploadResults])

  const hasSuccessfulUpload = uploads.filter((result) => result.isSuccess).length > 0

  return (
      <>
        <RecordsDetails data={stream} isUploaded={hasSuccessfulUpload}/>
      </>
  )
}