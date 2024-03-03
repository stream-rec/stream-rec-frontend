import {uploadsTableColumns} from "@/app/dashboard/uploads/components/uploads-table-columns";
import {placeholderData} from "@/app/lib/data/placeholder-data";
import {DataTable} from "@/app/components/table/data-table";
import {UploadTableToolbar} from "@/app/dashboard/uploads/components/upload-table-toolbar";

export default function UploadsPage() {
  return (<>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Uploads table</h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your uploaded data.
              </p>
            </div>
          </div>
          <DataTable columns={uploadsTableColumns} data={placeholderData} toolbar={UploadTableToolbar}/>
        </div>
      </>
  )
}