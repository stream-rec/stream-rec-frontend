"use client"

import {Cross2Icon} from "@radix-ui/react-icons"

import {Button} from "@/components/new-york/ui/button"
import {Input} from "@/components/new-york/ui/input"
import {DataTableFacetedFilter} from "@/app/components/table/data-table-faceted-filter";
import {DataTableViewOptions} from "@/app/components/table/data-table-view-options";
import {UserIcon} from "lucide-react";
import {recordColumnProps} from "@/app/dashboard/records/components/records-table-columns";
import {DataTableToolbarProps} from "@/app/components/table/toolbar";
import {dataStatues} from "@/app/lib/data/uploads/definitions";


export function RecordsDataTableToolbar<TData>({
                                                 table,
                                               }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const getTableStreamerFacets = () => {
    return Array.from(table.getColumn("streamerName")?.getFacetedUniqueValues() || []).map((value) => ({
      label: value[0],
      value: value[0],
      icon: UserIcon,
    }))
  }

  return (
      <div className="flex items-center justify-between">
        <div className="flex flex-1 flex-col items-start space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
          <Input
              placeholder="Filter by stream title..."
              value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                  table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="h-8 w-[150px] lg:w-[250px]"
          />
          {table.getColumn("streamerName") && (
              <DataTableFacetedFilter
                  column={table.getColumn("streamerName")}
                  title="Streamer"
                  options={getTableStreamerFacets() ?? []}
              />
          )}
          {isFiltered && (
              <Button
                  variant="ghost"
                  onClick={() => table.resetColumnFilters()}
                  className="h-8 px-2 lg:px-3"
              >
                Reset
                <Cross2Icon className="ml-2 h-4 w-4"/>
              </Button>
          )}
        </div>
        <DataTableViewOptions table={table} idFn={(id) => recordColumnProps.find((column) => column.accessorKey === id)?.uiName ?? id
        }/>
      </div>
  )
}