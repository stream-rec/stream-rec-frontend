import {StreamerForm} from "@/app/dashboard/streamers/components/streamer-form";
import {StreamerSchema} from "@/app/lib/data/streams/definitions";
import {createStreamer, fetchStreamers} from "@/app/lib/data/streams/streamer-apis";


const defaultStreamerValues: StreamerSchema = {
  name: "",
  url: "",
  isActivated: true,
  isTemplate: false,
  templateId: -1
}

export default async function Page() {

  const templateDatas = await fetchStreamers("template")

  return (
      <>
        <StreamerForm defaultValues={defaultStreamerValues} templateUsers={templateDatas} onSubmit={createStreamer}/>
      </>
  )
}