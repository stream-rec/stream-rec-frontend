import {fetchStreams} from "@/src/lib/data/streams/stream-apis";
import * as React from "react";
import {Suspense} from "react";
import {RecordsTable} from "@/src/app/[locale]/(feat)/records/components/records-table";
import {StreamsSearchParams} from "@/src/lib/data/streams/definitions";
import {fetchStreamers} from "@/src/lib/data/streams/streamer-apis";
import {DataTableSkeleton} from "@/src/app/components/table/data-table-skeleton";

export default function RecordTableWrapper({search}: { search: StreamsSearchParams }) {

  const dataPromise = fetchStreams(search)
  const streamersPromise = fetchStreamers('non-template')

  return (
      <>
        <Suspense fallback={<DataTableSkeleton columnCount={8} filterableColumnCount={2} searchableColumnCount={1} shrinkZero/>}>
          <RecordsTable dataPromise={dataPromise} streamersPromise={streamersPromise}/>
        </Suspense>
      </>
  )
}