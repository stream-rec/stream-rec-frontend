import {StreamerConfig} from "@/app/dashboard/streamers/components/streamer-config";
import {StreamerSchema} from "@/app/lib/data/streamer/definitions";


const defaultStreamerValues: StreamerSchema = {
  name: "",
  url: "",
  isActivated: true
}

export default function Page() {
  return (
      <>
        <StreamerConfig defaultValues={defaultStreamerValues}/>
      </>
  )
}