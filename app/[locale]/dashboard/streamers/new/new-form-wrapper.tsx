import {NextIntlClientProvider, useMessages} from "next-intl";
import {StreamerForm} from "@/app/[locale]/dashboard/streamers/components/streamer-form";
import {pick} from "next/dist/lib/pick";
import {StreamerSchema} from "@/lib/data/streams/definitions";
import {createStreamer} from "@/lib/data/streams/streamer-apis";

const defaultStreamerValues: StreamerSchema = {
  name: "",
  url: "",
  isActivated: true,
  isTemplate: false,
  templateId: -1
}

export default function NewFormWrapper({templateData}: { templateData: StreamerSchema[] }) {

  const messages = useMessages()

  return (
      <>
        <NextIntlClientProvider messages={
          // … and provide the relevant messages
          pick(messages, ['Toast', 'StreamerData', 'StreamerForm', 'Huya', 'Douyin', 'DouyinQualities', 'BaseDownloadConfigs', 'CallbacksConfigs','Rclone', 'Command'])
        }>
          <StreamerForm defaultValues={defaultStreamerValues} templateUsers={templateData} onSubmit={createStreamer}/>
        </NextIntlClientProvider>
      </>
  )
}