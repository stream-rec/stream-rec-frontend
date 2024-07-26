"use client"

import * as React from "react"
import {Cross2Icon} from "@radix-ui/react-icons"
import type {Table} from "@tanstack/react-table"

import {cn} from "@/lib/utils"
import {Button} from "@/components/new-york/ui/button"
import {Input} from "@/components/new-york/ui/input"
import {DataTableFacetedFilter} from "@/app/components/table/data-table-faceted-filter";
import {DataTableViewOptions} from "@/app/components/table/data-table-view-options";
import {useTranslations} from "next-intl";
import {DataTableDatePickerFilter} from "@/app/components/table/data-table-datepicker-filter";
import {DataTableFilterField} from "@/types/table";


interface DataTableToolbarProps<TData>
    extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
  filterFields?: DataTableFilterField<TData>[]
  idFn?: (id: string) => string
}

export function DataTableToolbar<TData>({
                                          table,
                                          filterFields = [],
                                          children,
                                          className,
                                          idFn,
                                          ...props
                                        }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const t = useTranslations("TableToolbar")

  // Memoize computation of searchableColumns and filterableColumns
  const {searchableColumns, filterableColumns} = React.useMemo(() => {
    return {
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    }
  }, [filterFields])

  return (
      <div
          className={cn(
              "flex w-full items-center justify-between space-x-2 overflow-auto p-1",
              className
          )}
          {...props}
      >
        <div className="flex flex-1 items-center space-x-2">
          {searchableColumns.length > 0 &&
              searchableColumns.map(
                  (column) =>
                      table.getColumn(column.value ? String(column.value) : "") && (
                          <Input
                              key={String(column.value)}
                              placeholder={column.placeholder}
                              value={
                                  (table
                                      .getColumn(String(column.value))
                                      ?.getFilterValue() as string) ?? ""
                              }
                              onChange={(event) =>
                                  table
                                      .getColumn(String(column.value))
                                      ?.setFilterValue(event.target.value)
                              }
                              className="h-8 w-40 lg:w-64"
                          />
                      )
              )}
          {filterableColumns.length > 0 &&
              filterableColumns.map(
                  (column) =>
                      table.getColumn(column.value ? String(column.value) : "") && (
                          column.dateRange ? (
                              <DataTableDatePickerFilter
                                  key={String(column.value)}
                                  column={table.getColumn(
                                      column.value ? String(column.value) : ""
                                  )}
                                  title={column.label}
                              />
                          ) : (
                              <DataTableFacetedFilter
                                  key={String(column.value)}
                                  column={table.getColumn(
                                      column.value ? String(column.value) : ""
                                  )}
                                  title={column.label}
                                  options={column.options ?? []}
                              />
                          )
                      )
              )}
          {isFiltered && (
              <Button
                  aria-label="Reset filters"
                  variant="ghost"
                  className="h-8 px-2 lg:px-3"
                  onClick={() => table.resetColumnFilters()}
              >
                {t("clearFilters")}
                <Cross2Icon className="ml-2 size-4" aria-hidden="true"/>
              </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {children}
          <DataTableViewOptions table={table} idFn={idFn}/>
        </div>
      </div>
  )
}