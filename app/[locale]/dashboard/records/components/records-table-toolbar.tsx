"use client"

import {Cross2Icon} from "@radix-ui/react-icons"

import {Button} from "@/components/new-york/ui/button"
import {Input} from "@/components/new-york/ui/input"
import {DataTableToolbarProps} from "@/app/components/table/toolbar";
import {DataTableFacetedFilter} from "@/app/components/table/data-table-faceted-filter";
import {DataTableDatePickerFilter} from "@/app/components/table/data-table-datepicker-filter";
import {DataTableViewOptions} from "@/app/components/table/data-table-view-options";
import {UserIcon} from "lucide-react";
import {useRecordColumns} from "@/app/[locale]/dashboard/records/components/records-table-columns";
import {useTranslations} from "next-intl";


export function RecordsTableToolbar<TData>({
                                                 table,
                                               }: DataTableToolbarProps<TData>) {

  const columns = useRecordColumns();
  const t = useTranslations("TableToolbar")

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
              placeholder={t("searchPlaceholder", {search: columns.find((props) => props.accessorKey == "title")?.uiName ?? "Stream title"})}
              value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                  table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="h-8 w-[150px] lg:w-[250px]"
          />
          {table.getColumn("streamerName") && (
              <DataTableFacetedFilter
                  column={table.getColumn("streamerName")}
                  title={columns.find((props) => props.accessorKey == "streamerName")?.uiName ?? "streamerName"}
                  options={getTableStreamerFacets() ?? []}
              />
          )}

          {table.getColumn("dateStart") && (
              <DataTableDatePickerFilter
                  column={table.getColumn("dateStart")}
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
        <DataTableViewOptions table={table} idFn={(id) => columns.find((props) => props.accessorKey == id)?.uiName ?? id
        }/>
      </div>
  )
}