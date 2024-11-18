import {StreamerSchema} from "@/src/lib/data/streams/definitions";
import {updateStreamer} from "@/src/lib/data/streams/streamer-apis";
import {StreamerFormWrapper} from "@/src/app/[locale]/(feat)/streamers/components/streamer-form-wrapper";

export default function EditFormWrapper({templateData, streamer}: {
  templateData: StreamerSchema[],
  streamer: StreamerSchema
}) {

  return (
      <>
        <StreamerFormWrapper templateData={templateData.filter((t) => t.id != streamer.id)} defaultStreamerValues={streamer}
                             onSubmit={updateStreamer}/>
      </>
  )
}