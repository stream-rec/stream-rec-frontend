import {StreamerConfig} from "@/app/dashboard/streamers/components/streamer-config";
import {StreamerSchema} from "@/app/lib/data/streams/definitions";
import {createStreamer} from "@/app/lib/data/streams/streamer-apis";


const defaultStreamerValues: StreamerSchema = {
  name: "",
  url: "",
  isActivated: true
}

export default function Page() {
  return (
      <>
        <StreamerConfig defaultValues={defaultStreamerValues} onSubmit={createStreamer}/>
      </>
  )
}