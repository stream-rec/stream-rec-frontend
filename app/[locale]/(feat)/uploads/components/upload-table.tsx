'use client'
import {DataTable} from "@/app/components/table/data-table";
import * as React from "react";
import {useUploadsTableColumns} from "@/app/[locale]/(feat)/uploads/components/upload-table-columns";
import {useDataTable} from "@/app/hooks/use-data-table";
import {fetchUploads} from "@/lib/data/uploads/upload-apis";
import {fetchStreamers} from "@/lib/data/streams/streamer-apis";


export function UploadTable({dataPromise, streamersPromise}: {
  dataPromise: ReturnType<typeof fetchUploads>,
  streamersPromise: ReturnType<typeof fetchStreamers>
}) {

  const {data, pageCount} = React.use(dataPromise)

  const streamers = React.use(streamersPromise)

  const toolbarData = useUploadsTableColumns(streamers)

  const filterableColumns = toolbarData.filterableColumns
  const searchableColumns = toolbarData.searchableColumns
  const columns = toolbarData.columns


  const {table} = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  })

  return (
      <>
        <DataTable table={table} columns={columns} searchableColumns={searchableColumns} filterableColumns={filterableColumns}
                   idFn={toolbarData.idFn}/>
      </>
  )
}