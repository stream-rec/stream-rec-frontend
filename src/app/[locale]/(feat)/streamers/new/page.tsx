import {StreamerSchema} from "@/src/lib/data/streams/definitions";
import {fetchStreamers} from "@/src/lib/data/streams/streamer-apis";
import NewFormWrapper from "@/src/app/[locale]/(feat)/streamers/new/new-form-wrapper";


export default async function Page() {


  const templateData = await fetchStreamers("template") as StreamerSchema[]

  return (
      <>
        <NewFormWrapper templateData={templateData}/>
      </>
  )
}