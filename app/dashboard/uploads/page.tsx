import {DataTable} from "@/app/dashboard/uploads/data-table";
import {columns} from "@/app/dashboard/uploads/components/columns";
import {placeholderData} from "@/app/lib/placeholder-data";

export default function UploadsPage() {
  return (<>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Uploads table</h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your upload data.
              </p>
            </div>
          </div>
          <DataTable columns={columns} data={placeholderData}/>
        </div>
      </>
  )
}