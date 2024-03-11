import {fetchUploads} from "@/lib/data/uploads/upload-apis";
import {pick} from "next/dist/lib/pick";
import {NextIntlClientProvider, useMessages} from "next-intl";
import * as React from "react";
import {UploadTable} from "@/app/[locale]/dashboard/uploads/components/upload-table";

export default async function UploadsTableWrapper() {

  const messages = useMessages();
  const data = await fetchUploads()


  return (
      <>
        <NextIntlClientProvider messages={
          // … and provide the relevant messages
          pick(messages, ['Pagination', 'UploadColumns', 'TableToolbar', 'Upload', 'Actions'])
        }
        >
          <UploadTable data={data}/>
        </NextIntlClientProvider>
      </>
  )
}
