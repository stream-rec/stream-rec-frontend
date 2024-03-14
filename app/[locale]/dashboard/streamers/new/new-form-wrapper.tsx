import {StreamerSchema} from "@/lib/data/streams/definitions";
import React from "react";
import {StreamerFormWrapper} from "@/app/[locale]/dashboard/streamers/components/streamer-form-wrapper";
import {createStreamer} from "@/lib/data/streams/streamer-apis";

const defaultStreamerValues: StreamerSchema = {
  name: "",
  url: "",
  isActivated: true,
  isTemplate: false,
  templateId: -1
}

export default function NewFormWrapper({templateData}: { templateData: StreamerSchema[] }) {

  return (
      <>
        <StreamerFormWrapper defaultStreamerValues={defaultStreamerValues} templateData={templateData} onSubmit={createStreamer}/>
      </>
  )
}