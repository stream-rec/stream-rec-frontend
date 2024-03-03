import {placeholderStreamData} from "@/app/lib/data/placeholder-data";
import {recordColumns} from "@/app/dashboard/records/components/records-table-columns";
import {RecordsDataTableToolbar} from "@/app/dashboard/records/components/records-data-table-toolbar";
import {DataTable} from "@/app/components/table/data-table";

export default function RecordsPage() {
  return (<>
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Records table</h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your recorded data.
              </p>
            </div>
          </div>
          <DataTable columns={recordColumns} data={placeholderStreamData} toolbar={RecordsDataTableToolbar}/>
        </div>
      </>
  )
}