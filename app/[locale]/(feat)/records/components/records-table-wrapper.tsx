import {fetchStreams} from "@/lib/data/streams/stream-apis";
import {NextIntlClientProvider, useMessages} from "next-intl";
import {pick} from "next/dist/lib/pick";
import * as React from "react";
import {Suspense} from "react";
import {RecordsTable} from "@/app/[locale]/(feat)/records/components/records-table";
import {StreamsSearchParams} from "@/lib/data/streams/definitions";
import {fetchStreamers} from "@/lib/data/streams/streamer-apis";
import {DataTableSkeleton} from "@/app/components/table/data-table-skeleton";

export default function RecordTableWrapper({search}: { search: StreamsSearchParams }) {

  const messages = useMessages()

  const dataPromise = fetchStreams(search)
  const streamersPromise = fetchStreamers('non-template')

  return (
      <>
        <>
          <NextIntlClientProvider messages={
            // … and provide the relevant messages
            pick(messages, ['Pagination', 'TableToolbar', 'Actions', 'RecordsPage', 'RecordColumns'])
          }
          >
            <Suspense fallback={<DataTableSkeleton columnCount={8} filterableColumnCount={2} searchableColumnCount={1} shrinkZero/>}>
              <RecordsTable dataPromise={dataPromise} streamersPromise={streamersPromise}/>
            </Suspense>
          </NextIntlClientProvider>
        </>
      </>
  )
}