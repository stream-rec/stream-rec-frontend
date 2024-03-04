import {StreamerConfig} from "@/app/dashboard/streamers/components/streamer-config";
import {StreamerSchema} from "@/app/lib/data/streams/definitions";


const defaultStreamerValues: StreamerSchema = {
  name: "",
  url: "",
  isActivated: true
}

export default function Page() {

  return <div>
    <StreamerConfig defaultValues={defaultStreamerValues}/>
  </div>
}