import {fetchUpload, fetchUploadResults} from "@/app/lib/data/uploads/upload-apis";
import {UploadDetails} from "@/app/dashboard/uploads/components/upload-details";

type UploadDetailsWrapperProps = {
  id: string
}

export default async function UploadDetailsWrapper({id}: UploadDetailsWrapperProps) {
  const streamData = fetchUpload(id)

  const uploadResults = fetchUploadResults(id)

  const [uploadData, results] = await Promise.all([streamData, uploadResults])

  return (
      <>
        <UploadDetails data={uploadData} results={results}/>
      </>
  )
}