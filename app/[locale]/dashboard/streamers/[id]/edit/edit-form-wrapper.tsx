import {StreamerSchema} from "@/lib/data/streams/definitions";
import {NextIntlClientProvider, useMessages} from "next-intl";
import {pick} from "next/dist/lib/pick";
import {StreamerForm} from "@/app/[locale]/dashboard/streamers/components/streamer-form";
import {createStreamer, updateStreamer} from "@/lib/data/streams/streamer-apis";

export default function EditFormWrapper({templateData, streamer}: { templateData: StreamerSchema[] , streamer: StreamerSchema}) {

  const messages = useMessages()

  return (
      <>
        <NextIntlClientProvider messages={
          // … and provide the relevant messages
          pick(messages, ['Toast', 'StreamerData', 'StreamerForm', 'Huya', 'Douyin', 'DouyinQualities', 'BaseDownloadConfigs', 'CallbacksConfigs','Rclone', 'Command'])
        }>
          <StreamerForm defaultValues={streamer} templateUsers={templateData.filter((t) => t.id != streamer.id)} onSubmit={updateStreamer}/>
        </NextIntlClientProvider>
      </>
  )
}