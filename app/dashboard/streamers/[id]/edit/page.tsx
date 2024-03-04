import {StreamerConfig} from "@/app/dashboard/streamers/components/streamer-config";
import {fetchStreamer} from "@/app/lib/data/streams/api";

export default async function Page({params}: { params: { id: string } }) {

  const {id} = params

  const streamer = await fetchStreamer(id)

  return (
      <StreamerConfig defaultValues={streamer}/>
  )
}