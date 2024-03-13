'use client'
import * as React from "react";
import {ColumnDef, flexRender, type Table as TanstackTable,} from "@tanstack/react-table";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/new-york/ui/table";
import {DataTablePagination} from "@/app/components/table/data-table-pagination";
import {useTranslations} from "next-intl";
import {DataTableToolbar} from "@/app/components/table/data-table-toolbar";
import {DataTableAdvancedToolbar} from "@/app/components/table/advanced/data-table-advanced-toolbar";
import {DataTableFloatingBar} from "@/app/components/table/data-table-floating-bar";


export interface SearchParams {
  [key: string]: string | string[] | undefined
}

export type Option = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface DataTableFilterOption<TData> {
  id?: string
  label: string
  value: keyof TData | string
  items: Option[]
  isMulti?: boolean
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData
  title: string,
}


export interface DataTableFilterableColumn<TData> extends DataTableSearchableColumn<TData> {
  options: Option[],
  date?: boolean
}


// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   toolbar: ComponentType<{ table: ReturnType<any> }>;
// }

interface DataTableProps<TData, TValue> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type TanstackTable<TData>
   */
  table: TanstackTable<TData>

  /**
   * The columns of the table
   * @default []
   * @type ColumnDef<TData, TValue>[]
   */
  columns: ColumnDef<TData, TValue>[]

  /**
   * The searchable columns of the table
   * @default []
   * @type {id: keyof TData, title: string}[]
   * @example searchableColumns={[{ id: "title", title: "titles" }]}
   */
  searchableColumns?: DataTableSearchableColumn<TData>[]

  /**
   * The filterable columns of the table. When provided, renders dynamic faceted filters, and the advancedFilter prop is ignored.
   * @default []
   * @type {id: keyof TData, title: string, options: { label: string, value: string, icon?: React.ComponentType<{ className?: string }> }[]}[]
   * @example filterableColumns={[{ id: "status", title: "Status", options: ["todo", "in-progress", "done", "canceled"]}]}
   */
  filterableColumns?: DataTableFilterableColumn<TData>[]

  /**
   * Show notion like filters when enabled
   * @default false
   * @type boolean
   */
  advancedFilter?: boolean

  /**
   * The content to render in the floating bar on row selection, at the bottom of the table. When null, the floating bar is not rendered.
   * The dataTable instance is passed as a prop to the floating bar content.
   * @default null
   * @type React.ReactNode | null
   * @example floatingBarContent={TasksTableFloatingBarContent(dataTable)}
   */
  floatingBarContent?: React.ReactNode | null

  /**
   * The link to create a new row, will be rendered as a button
   * @default undefined
   * @type string
   * @example newRowLink="/tasks/new"
   */
  newRowLink?: string

  /**
   * The action to delete rows, will be rendered as a button
   * @default undefined
   * @type React.MouseEventHandler<HTMLButtonElement> | undefined
   * @example deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
   */
  deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>

  /**
   * The function to transform the column id to a string
   * @default undefined
   * @type (id: string) => string
   * @example idFn={(id) => id.toUpperCase()}
   */
  idFn?: (id: string) => string
}


export function DataTable<TData, TValue>({
                                           table,
                                           columns,
                                           searchableColumns = [],
                                           filterableColumns = [],
                                           advancedFilter = false,
                                           floatingBarContent,
                                           newRowLink,
                                           deleteRowsAction,
                                           idFn,
                                         }: DataTableProps<TData, TValue>) {

  const t = useTranslations("TableToolbar")

  return (
      <div className="w-full space-y-2.5 overflow-auto">
        {advancedFilter ? (
            <DataTableAdvancedToolbar
                table={table}
                filterableColumns={filterableColumns}
                searchableColumns={searchableColumns}
                idFn={idFn}
            />
        ) : (
            <DataTableToolbar
                table={table}
                filterableColumns={filterableColumns}
                searchableColumns={searchableColumns}
                newRowLink={newRowLink}
                deleteRowsAction={deleteRowsAction}
                idFn={idFn}
            />
        )}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                          </TableHead>
                      )
                    })}
                  </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                      <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                              )}
                            </TableCell>
                        ))}
                      </TableRow>
                  ))
              ) : (
                  <TableRow>
                    <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                    >
                      {t("noResults")}
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="space-y-2.5">
          <DataTablePagination table={table} showSelectedRowCount={false}/>
          {floatingBarContent ? (
              <DataTableFloatingBar table={table}>
                {floatingBarContent}
              </DataTableFloatingBar>
          ) : null}
        </div>
      </div>
  )
}
