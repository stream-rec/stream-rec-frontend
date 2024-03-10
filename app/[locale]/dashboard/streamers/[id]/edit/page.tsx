import {fetchStreamer, fetchStreamers} from "@/lib/data/streams/streamer-apis";
import {unstable_setRequestLocale} from "next-intl/server";
import EditFormWrapper from "@/app/[locale]/dashboard/streamers/[id]/edit/edit-form-wrapper";

export default async function Page({params}: { params: { id: string, locale : string } }) {

  unstable_setRequestLocale(params.locale)


  const {id} = params

  const streamerData = fetchStreamer(id)

  const templateDatas = fetchStreamers("template")

  const [streamer, templates] = await Promise.all([streamerData, templateDatas])

  return <EditFormWrapper streamer={streamer} templateData={templates}/>
}