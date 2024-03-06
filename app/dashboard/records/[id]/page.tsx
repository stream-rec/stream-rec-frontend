import {fetchStream} from "@/app/lib/data/streams/stream-apis";
import {StreamCard} from "@/app/dashboard/records/components/stream-card";

export default async function Page({params}: { params: { id: string } }) {

  const {id} = params

  const stream = await fetchStream(id)

  return (
      <>
        <StreamCard data={stream} />
      </>
  )
}