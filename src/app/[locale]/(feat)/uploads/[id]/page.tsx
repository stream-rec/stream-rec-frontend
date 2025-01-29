import UploadDetailsWrapper from "@/src/app/[locale]/(feat)/uploads/[id]/upload-details-wrapper";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params
  return (
    <>
      <UploadDetailsWrapper id={id} />
    </>
  )
}