import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon,} from "@radix-ui/react-icons"
import {Table} from "@tanstack/react-table"

import {Button} from "@/components/new-york/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/new-york/ui/select"
import {clsx} from "clsx";
import {useTranslations} from "next-intl";

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  showSelectedCount?: boolean
}


export function DataTablePagination<TData>({
                                             table,
                                             showSelectedCount = false
                                           }: DataTablePaginationProps<TData>) {

  const t = useTranslations("Pagination")

  return (
      <div className="flex flex-col md:flex-row items-center justify-between px-2">
        <div>
          <div className={clsx
          (
              "flex-1 text-sm text-muted-foreground",
              showSelectedCount ? "md:flex" : "hidden"
          )}>
            {t("selectedMessage", {
              selectedCount: table.getFilteredSelectedRowModel().rows.length,
              totalCount: table.getFilteredRowModel().rows.length
            })}
          </div>
        </div>
        <div className="flex md:flex-row md:items-center md:space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">{t("rowsPerPage")}</p>
            <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize}/>
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[120px] items-center justify-center text-sm font-medium">
            {t("pageMessage", {page: table.getState().pagination.pageIndex + 1, totalPages: table.getPageCount()})}
          </div>
          <div className="flex flex-col md:flex-row items-center space-x-2">
            <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">{t("goToFirst")}</span>
              <DoubleArrowLeftIcon className="h-4 w-4"/>
            </Button>
            <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">{t("goToPrev")}</span>
              <ChevronLeftIcon className="h-4 w-4"/>
            </Button>
            <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">{t("goToNext")}</span>
              <ChevronRightIcon className="h-4 w-4"/>
            </Button>
            <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">{t("goToLast")}</span>
              <DoubleArrowRightIcon className="h-4 w-4"/>
            </Button>
          </div>
        </div>
      </div>
  )
}