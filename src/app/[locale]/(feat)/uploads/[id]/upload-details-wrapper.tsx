import {fetchUpload, fetchUploadResults} from "@/src/lib/data/uploads/upload-apis";
import {UploadDetails} from "@/src/app/[locale]/(feat)/uploads/components/upload-details";

export default async function UploadDetailsWrapper({id}: { id: string }) {
  const streamData = fetchUpload(id)

  const uploadResults = fetchUploadResults(id)

  const [uploadData, results] = await Promise.all([streamData, uploadResults])

  return (
      <>
        <UploadDetails data={uploadData} results={results}/>
      </>
  )
}