import {StreamerForm} from "@/app/dashboard/streamers/components/streamer-form";
import {fetchStreamer, fetchStreamers} from "@/app/lib/data/streams/streamer-apis";
import {updateStreamer} from "@/app/lib/data/streams/streamer-apis";

export default async function Page({params}: { params: { id: string } }) {

  const {id} = params

  const streamerData =  fetchStreamer(id)

  const templateDatas = fetchStreamers("template")

  const [streamer, templates] = await Promise.all([streamerData, templateDatas])

  return (
      <StreamerForm defaultValues={streamer} templateUsers={templates.filter((t) => t.id != streamer.id)} onSubmit={updateStreamer}/>
  )
}