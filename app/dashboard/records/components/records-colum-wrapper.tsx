import {recordColumns} from "@/app/dashboard/records/components/records-table-columns";
import {RecordsDataTableToolbar} from "@/app/dashboard/records/components/records-data-table-toolbar";
import {DataTable} from "@/app/components/table/data-table";
import {fetchStreams} from "@/app/lib/data/streams/stream-apis";

export default async function RecordTableWrapper(){

  const data = await fetchStreams()

  return (
      <>
        <DataTable columns={recordColumns} data={data} toolbar={RecordsDataTableToolbar}/>
      </>
  )
}