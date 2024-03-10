'use client'
import {DataTable} from "@/app/components/table/data-table";
import * as React from "react";
import {StreamData} from "@/lib/data/streams/definitions";
import {useRecordTableColumns} from "@/app/[locale]/dashboard/records/components/records-table-columns";
import {RecordsTableToolbar} from "@/app/[locale]/dashboard/records/components/records-table-toolbar";

export function RecordsTable({data}: { data: StreamData[] }) {

  const columns = useRecordTableColumns()

  return (
      <>
        <DataTable columns={columns} data={data} toolbar={RecordsTableToolbar}/>
      </>
  )
}