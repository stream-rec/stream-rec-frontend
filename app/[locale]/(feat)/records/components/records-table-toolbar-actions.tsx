import {Table} from "@tanstack/react-table";
import {StreamData} from "@/lib/data/streams/definitions";
import {DeleteItemsDialog} from "@/app/components/dialog/delete-items-dialog";
import {useRouter} from "@/i18n";
import {deleteStreams} from "@/lib/data/streams/stream-apis";

interface RecordsTableToolbarActionsProps {
  table: Table<StreamData>
}

export function RecordsTableToolbarActions({
                                             table,
                                           }: RecordsTableToolbarActionsProps) {

  const router = useRouter()

  return (
      <div className="flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
            <DeleteItemsDialog
                data={table
                    .getFilteredSelectedRowModel()
                    .rows.map((row) => row.original)}

                deleteAction={streams => deleteStreams(streams.map((stream) => stream.id))}
                onSuccess={
                  () => {
                    table.toggleAllRowsSelected(false)
                    // update the data
                    router.refresh()
                  }
                }
            />
        ) : null}
      </div>
  )
}
