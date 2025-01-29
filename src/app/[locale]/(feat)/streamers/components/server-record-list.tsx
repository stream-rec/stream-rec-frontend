import { deleteStreamer, fetchStreamers, updateState } from "@/src/lib/data/streams/streamer-apis";
import React, { useMemo } from "react";
import { RecordList } from "@/src/app/[locale]/(feat)/streamers/components/record-list";
import { useFormatter, useTranslations } from "next-intl";
import { toStreamerCards } from "@/src/app/[locale]/(feat)/streamers/utils/streamer-utils";
import { WS_API_URL } from "@/src/lib/data/events/events-api";

export type ServerRecordListProps = {
  title: string,
  filter: string,
}


export function ServerRecordList({ title, filter }: ServerRecordListProps) {
  const t = useTranslations('StreamerData');
  const contextMenuT = useTranslations('OpenVideoContextMenu');
  const format = useFormatter();

  const contextMenuStrings = useMemo(() => ({
    download: contextMenuT('download'),
    openWithPotPlayer: contextMenuT('openWith', { player: 'PotPlayer' })
  }), [contextMenuT]);

  const data = React.use(fetchStreamers(filter));

  const cards = useMemo(() =>
    toStreamerCards(data, t, format),
    [data, t, format]
  );

  return <RecordList
    title={title}
    cards={cards}
    contextMenuStrings={contextMenuStrings}
    updateStatus={updateState}
    deleteStreamerAction={deleteStreamer}
    wsUrl={filter === "live" ? WS_API_URL : undefined}
  />;
}