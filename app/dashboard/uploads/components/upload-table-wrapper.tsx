import {uploadsTableColumns} from "@/app/dashboard/uploads/components/upload-table-columns";
import {UploadTableToolbar} from "@/app/dashboard/uploads/components/upload-table-toolbar";
import {DataTable} from "@/app/components/table/data-table";
import {fetchUploads} from "@/app/lib/data/uploads/upload-apis";

export default async function UploadsTableWrapper(){


  const data = await fetchUploads()

  return (
      <>
        <DataTable columns={uploadsTableColumns} data={data} toolbar={UploadTableToolbar}/>
      </>
  )
}