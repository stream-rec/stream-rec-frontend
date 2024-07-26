import {Table} from "@tanstack/react-table";
import {DeleteItemsDialog} from "@/app/components/dialog/delete-items-dialog";
import {useRouter} from "@/i18n";
import {deleteUploads} from "@/lib/data/uploads/upload-apis";
import {UploadData} from "@/lib/data/uploads/definitions";

interface UploadsTableToolbarActionsProps {
  table: Table<UploadData>
}

export function UploadsTableToolbarActions({
                                             table,
                                           }: UploadsTableToolbarActionsProps) {

  const router = useRouter()

  return (
      <div className="flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
            <DeleteItemsDialog
                data={table
                    .getFilteredSelectedRowModel()
                    .rows.map((row) => row.original)}

                deleteAction={streams => deleteUploads(streams.map((stream) => stream.id))}
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
