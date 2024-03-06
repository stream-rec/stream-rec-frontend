import UploadDetailsWrapper from "@/app/dashboard/uploads/[id]/upload-details-wrapper";


export default async function Page({params}: { params: { id: string } }) {
  return (
      <>
        <UploadDetailsWrapper id={params.id}/>
      </>
  )
}