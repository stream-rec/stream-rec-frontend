import UploadDetailsWrapper from "@/app/[locale]/dashboard/uploads/[id]/upload-details-wrapper";
import {unstable_setRequestLocale} from "next-intl/server";

export default async function Page({params}: { params: { id: string, locale : string } }) {

  unstable_setRequestLocale(params.locale);

  return (
      <>
        <UploadDetailsWrapper id={params.id}/>
      </>
  )
}