'use client'
import {DataTable} from "@/src/app/components/table/data-table";
import * as React from "react";
import {useRecordTableColumns} from "@/src/app/[locale]/(feat)/records/components/records-table-columns";
import {fetchStreams} from "@/src/lib/data/streams/stream-apis";
import {useDataTable} from "@/src/app/hooks/use-data-table";
import {fetchStreamers} from "@/src/lib/data/streams/streamer-apis";
import {DataTableToolbar} from "@/src/app/components/table/data-table-toolbar";
import {RecordsTableToolbarActions} from "@/src/app/[locale]/(feat)/records/components/records-table-toolbar-actions";

export function RecordsTable({dataPromise, streamersPromise}: {
  dataPromise: ReturnType<typeof fetchStreams>,
  streamersPromise: ReturnType<typeof fetchStreamers>
}) {

  const {data, pageCount} = React.use(dataPromise)
  const streamers = React.use(streamersPromise)


  const tableColumns = useRecordTableColumns(streamers)

  const columns = tableColumns.columns
  const filterFields = tableColumns.filterableColumns

  const {table} = useDataTable({
    data,
    columns,
    pageCount,
    filterFields: filterFields,
  })

  return (
      <>
        <DataTable table={table}>
          <DataTableToolbar table={table} filterFields={filterFields} idFn={tableColumns.idFn}>
            <RecordsTableToolbarActions table={table}/>
          </DataTableToolbar>
        </DataTable>
      </>
  )
}