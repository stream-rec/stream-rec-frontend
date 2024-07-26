import React from "react";
import {deleteStreamer, fetchStreamers} from "@/lib/data/streams/streamer-apis";
import StreamerListWrapper from "@/app/[locale]/(feat)/streamers/components/streamer-list-wrapper";
import {getTranslations} from "next-intl/server";

export default async function StreamerList() {
  const streamerData = fetchStreamers("non-template");
  const templateStreamersData = fetchStreamers("template");

  const contextMenuT = await getTranslations('OpenVideoContextMenu');
  const [streamers, templateStreamers] = await Promise.all([streamerData, templateStreamersData])

  return (
      <>
        <StreamerListWrapper streamers={streamers} templateStreamers={templateStreamers} deleteStreamer={deleteStreamer} contextMenuStrings={{
          download: contextMenuT('download'),
          openWithPotPlayer: contextMenuT('openWith', {player: 'PotPlayer'}),
        }}/>
      </>
  )
}