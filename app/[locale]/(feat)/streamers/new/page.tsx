import {StreamerSchema} from "@/lib/data/streams/definitions";
import {fetchStreamers} from "@/lib/data/streams/streamer-apis";
import {unstable_setRequestLocale} from "next-intl/server";
import NewFormWrapper from "@/app/[locale]/(feat)/streamers/new/new-form-wrapper";


export default async function Page({params: {locale}}: { params: { locale: string } }) {

  unstable_setRequestLocale(locale)


  const templateData = await fetchStreamers("template") as StreamerSchema[]

  return (
      <>
        <NewFormWrapper templateData={templateData}/>
      </>
  )
}