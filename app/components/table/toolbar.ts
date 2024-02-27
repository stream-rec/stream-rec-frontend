import {Table} from "@tanstack/react-table";

export interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export type DataTableToolbarColumnProps = {
  accessorKey: string
  uiName: string
}