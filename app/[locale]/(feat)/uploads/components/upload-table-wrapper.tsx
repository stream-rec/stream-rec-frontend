import {fetchUploads} from "@/lib/data/uploads/upload-apis";
import {pick} from "next/dist/lib/pick";
import {NextIntlClientProvider, useMessages} from "next-intl";
import * as React from "react";
import {Suspense} from "react";
import {UploadTable} from "@/app/[locale]/(feat)/uploads/components/upload-table";
import {DataTableSkeleton} from "@/app/components/table/data-table-skeleton";
import {UploadSearchParams} from "@/lib/data/uploads/definitions";
import {fetchStreamers} from "@/lib/data/streams/streamer-apis";

export default function UploadsTableWrapper({search}: { search: UploadSearchParams }) {

  const messages = useMessages();
  const dataPromise = fetchUploads(search)
  const streamersPromise = fetchStreamers("non-template")

  return (
      <>
        <NextIntlClientProvider messages={
          // … and provide the relevant messages
          pick(messages, ['Pagination', 'UploadColumns', 'UploadStates', 'TableToolbar', 'UploadsPage', 'Actions'])
        }
        >
          <Suspense fallback={<DataTableSkeleton columnCount={6} filterableColumnCount={2} searchableColumnCount={1}/>}>
            <UploadTable dataPromise={dataPromise} streamersPromise={streamersPromise}/>
          </Suspense>
        </NextIntlClientProvider>
      </>
  )
}
