import {fetchStreamer, fetchStreamers} from "@/src/lib/data/streams/streamer-apis";
import EditFormWrapper from "@/src/app/[locale]/(feat)/streamers/[id]/edit/edit-form-wrapper";

export default async function Page({params}: { params: { id: string } }) {

  const {id} = params

  const streamerData = fetchStreamer(id)

  const templateDatas = fetchStreamers("template")

  const [streamer, templates] = await Promise.all([streamerData, templateDatas])

  return <EditFormWrapper streamer={streamer} templateData={templates}/>
}