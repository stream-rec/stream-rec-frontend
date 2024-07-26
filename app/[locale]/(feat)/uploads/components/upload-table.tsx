'use client'
import {DataTable} from "@/app/components/table/data-table";
import * as React from "react";
import {useUploadsTableColumns} from "@/app/[locale]/(feat)/uploads/components/upload-table-columns";
import {useDataTable} from "@/app/hooks/use-data-table";
import {fetchUploads} from "@/lib/data/uploads/upload-apis";
import {fetchStreamers} from "@/lib/data/streams/streamer-apis";
import {DataTableToolbar} from "@/app/components/table/data-table-toolbar";
import {UploadsTableToolbarActions} from "@/app/[locale]/(feat)/uploads/components/upload-table-toolbar-actions";


export function UploadTable({dataPromise, streamersPromise}: {
  dataPromise: ReturnType<typeof fetchUploads>,
  streamersPromise: ReturnType<typeof fetchStreamers>
}) {

  const {data, pageCount} = React.use(dataPromise)

  const streamers = React.use(streamersPromise)

  const {columns, filterableColumns, idFn} = useUploadsTableColumns(streamers)

  const {table} = useDataTable({
    data,
    columns,
    pageCount,
    filterFields: filterableColumns,
  })

  return (
      <>
        <DataTable table={table}>
          <DataTableToolbar table={table} filterFields={filterableColumns} idFn={idFn}>
            <UploadsTableToolbarActions table={table}/>
          </DataTableToolbar>
        </DataTable>
      </>
  )
}