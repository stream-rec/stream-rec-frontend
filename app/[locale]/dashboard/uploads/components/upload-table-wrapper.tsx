import {fetchUploads} from "@/lib/data/uploads/upload-apis";
import {pick} from "next/dist/lib/pick";
import {NextIntlClientProvider, useMessages} from "next-intl";
import * as React from "react";
import {Suspense} from "react";
import {UploadTable} from "@/app/[locale]/dashboard/uploads/components/upload-table";
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
          pick(messages, ['Pagination', 'UploadColumns', 'UploadStates', 'TableToolbar', 'Upload', 'Actions'])
        }
        >
          <Suspense fallback={<DataTableSkeleton columnCount={4} filterableColumnCount={2}/>}>
            <UploadTable dataPromise={dataPromise} streamersPromise={streamersPromise}/>
          </Suspense>
        </NextIntlClientProvider>
      </>
  )
}
