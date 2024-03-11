"use client"

import {Cross2Icon} from "@radix-ui/react-icons"

import {Button} from "@/components/new-york/ui/button"
import {Input} from "@/components/new-york/ui/input"
import {UserIcon} from "lucide-react";
import {dataStatues} from "@/lib/data/uploads/definitions";
import {DataTableToolbarProps} from "@/app/components/table/toolbar";
import {DataTableFacetedFilter} from "@/app/components/table/data-table-faceted-filter";
import {DataTableViewOptions} from "@/app/components/table/data-table-view-options";
import {DataTableDatePickerFilter} from "@/app/components/table/data-table-datepicker-filter";
import {useUploadColumns} from "@/app/[locale]/dashboard/uploads/components/upload-table-columns";
import {Table} from "@tanstack/react-table";
import {useTranslations} from "next-intl";


const getTableStreamerFacets = (table: Table<any>) => {
  return Array.from(table.getColumn("streamer")?.getFacetedUniqueValues() || []).map((value) => ({
    label: value[0],
    value: value[0],
    icon: UserIcon,
  }))
}

export function UploadTableToolbar<TData>({
                                            table,
                                          }: DataTableToolbarProps<TData>) {

  const columns = useUploadColumns();

  const isFiltered = table.getState().columnFilters.length > 0

  const t = useTranslations("TableToolbar")

  const getStatusOptions = () => {
    return dataStatues.map((status) => ({
      label: t(status.label),
      value: status.value,
      icon: status.icon,
    }))
  }

  return (
      <div className="flex items-center justify-between">
        <div className="flex flex-1 flex-col items-start space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
          <Input
              placeholder={t("searchPlaceholder", {search: columns.find((props) => props.accessorKey == "streamTitle")?.uiName ?? "Stream title"})}
              value={(table.getColumn("streamTitle")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                  table.getColumn("streamTitle")?.setFilterValue(event.target.value)
              }
              className="h-8 w-[150px] lg:w-[250px]"
          />
          {table.getColumn("streamer") && (
              <DataTableFacetedFilter
                  column={table.getColumn("streamer")}
                  title={columns.find((props) => props.accessorKey == "streamer")?.uiName ?? "Streamer"}
                  options={getTableStreamerFacets(table) ?? []}
              />
          )}
          {table.getColumn("status") && (
              <DataTableFacetedFilter
                  column={table.getColumn("status")}
                  title={columns.find((props) => props.accessorKey == "status")?.uiName ?? "Status"}
                  options={getStatusOptions()}
              />
          )}
          {table.getColumn("streamStartTime") && (
              <DataTableDatePickerFilter
                  column={table.getColumn("streamStartTime")}
                  title={t("dateRange")}
                  options={[]}
              />
          )}
          {isFiltered && (
              <Button
                  variant="ghost"
                  onClick={() => table.resetColumnFilters()}
                  className="h-8 px-2 lg:px-3"
              >
                {t("clearFilters")}
                <Cross2Icon className="ml-2 h-4 w-4"/>
              </Button>
          )}
        </div>
        <DataTableViewOptions table={table} idFn={(id) => columns.find((props) => props.accessorKey == id)?.uiName ?? id}/>
      </div>
  )
}