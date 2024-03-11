'use client'
import {UploadTableToolbar} from "@/app/[locale]/dashboard/uploads/components/upload-table-toolbar";
import {DataTable} from "@/app/components/table/data-table";
import * as React from "react";
import {UploadData} from "@/lib/data/uploads/definitions";
import {useUploadsTableColumns} from "@/app/[locale]/dashboard/uploads/components/upload-table-columns";


export function UploadTable({data}: { data: UploadData[] }) {

  const columns = useUploadsTableColumns()

  return (
      <>
        <DataTable columns={columns} data={data} toolbar={UploadTableToolbar}/>
      </>
  )
}