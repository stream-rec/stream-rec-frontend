import UploadDetailsWrapper from "@/src/app/[locale]/(feat)/uploads/[id]/upload-details-wrapper";

export default async function Page({params}: { params: { id: string } }) {

  return (
      <>
        <UploadDetailsWrapper id={params.id}/>
      </>
  )
}