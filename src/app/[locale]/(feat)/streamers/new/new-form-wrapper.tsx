import {StreamerSchema, StreamerState} from "@/src/lib/data/streams/definitions";
import React from "react";
import {StreamerFormWrapper} from "@/src/app/[locale]/(feat)/streamers/components/streamer-form-wrapper";
import {createStreamer} from "@/src/lib/data/streams/streamer-apis";

const defaultStreamerValues: StreamerSchema = {
  name: "",
  url: "",
  state: StreamerState.NOT_LIVE,
  isTemplate: false,
  templateId: 0
}

export default function NewFormWrapper({templateData}: { templateData: StreamerSchema[] }) {

  return (
      <>
        <StreamerFormWrapper defaultStreamerValues={defaultStreamerValues} templateData={templateData} onSubmit={createStreamer}/>
      </>
  )
}