import {StreamerConfig} from "@/app/dashboard/streamers/components/streamer-config";
import {StreamerSchema} from "@/app/lib/data/streams/definitions";

export default async function Page({params}: { params: { id: string } }) {

  const {id} = params

  const streamer = async () => {
    return {
      id: 1,
      name: "test",
      url: "https://www.huya.com/123",
      avatar: "https://www.huya.com/123.jpg",
      description: "test",
      platform: "huya",
      isActivated: true
    } as StreamerSchema
  }

  return (
      <div>

        <StreamerConfig defaultValues={await streamer()}>

        </StreamerConfig>
      </div>
  )
}