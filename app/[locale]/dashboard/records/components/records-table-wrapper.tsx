import {fetchStreams} from "@/lib/data/streams/stream-apis";
import {NextIntlClientProvider, useMessages} from "next-intl";
import {pick} from "next/dist/lib/pick";
import * as React from "react";
import {RecordsTable} from "@/app/[locale]/dashboard/records/components/records-table";

export default async function RecordTableWrapper() {

  const messages = useMessages();
  const data = await fetchStreams()
  return (
      <>
        <>
          <NextIntlClientProvider messages={
            // … and provide the relevant messages
            pick(messages, ['Pagination', 'TableToolbar', 'Actions', 'RecordsPage', 'RecordColumns'])
          }
          >
            <RecordsTable data={data}/>
          </NextIntlClientProvider>
        </>
      </>
  )
}