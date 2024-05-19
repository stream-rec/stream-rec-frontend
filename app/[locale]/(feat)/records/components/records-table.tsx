'use client'
import {DataTable} from "@/app/components/table/data-table";
import * as React from "react";
import {useRecordTableColumns} from "@/app/[locale]/(feat)/records/components/records-table-columns";
import {fetchStreams} from "@/lib/data/streams/stream-apis";
import {useDataTable} from "@/app/hooks/use-data-table";
import {fetchStreamers} from "@/lib/data/streams/streamer-apis";

export function RecordsTable({dataPromise, streamersPromise}: {
  dataPromise: ReturnType<typeof fetchStreams>,
  streamersPromise: ReturnType<typeof fetchStreamers>
}) {

  const {data, pageCount} = React.use(dataPromise)
  const streamers = React.use(streamersPromise)


  const tableColumns = useRecordTableColumns(streamers)

  const columns = tableColumns.columns
  const searchableColumns = tableColumns.searchableColumns
  const filterableColumns = tableColumns.filterableColumns


  const {table} = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  })

  return (
      <>
        <DataTable table={table} columns={columns} searchableColumns={searchableColumns} filterableColumns={filterableColumns} idFn={tableColumns.idFn}/>
      </>
  )
}