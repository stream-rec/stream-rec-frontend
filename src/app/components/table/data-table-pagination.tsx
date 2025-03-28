import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"

import { Button } from "@/src/components/new-york/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/new-york/ui/select"
import { useTranslations } from "next-intl"

interface DataTablePaginationProps<TData> {
	table: Table<TData>
	pageSizeOptions?: number[]
}

export function DataTablePagination<TData>({
	table,
	pageSizeOptions = [10, 20, 30, 40, 50, 100, 500],
}: DataTablePaginationProps<TData>) {
	const t = useTranslations("Pagination")

	return (
		<div className='flex w-full flex-col items-center justify-between gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8'>
			<div>
				<div className={"flex-1 whitespace-nowrap text-sm text-muted-foreground"}>
					{t("selectedMessage", {
						selectedCount: table.getFilteredSelectedRowModel().rows.length,
						totalCount: table.getFilteredRowModel().rows.length,
					})}
				</div>
			</div>
			<div className='flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
				<div className='flex items-center space-x-2'>
					<p className='whitespace-nowrap text-sm font-medium'>{t("rowsPerPage")}</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={value => {
							table.setPageSize(Number(value))
						}}
					>
						<SelectTrigger className='h-8 w-[70px]'>
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side='top'>
							{pageSizeOptions.map(pageSize => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex w-[120px] items-center justify-center text-sm font-medium'>
					{t("pageMessage", {
						page: table.getState().pagination.pageIndex + 1,
						totalPages: table.getPageCount(),
					})}
				</div>
				<div className='flex items-center space-x-2'>
					<Button
						aria-label='Go to first page'
						variant='outline'
						className='hidden size-8 p-0 lg:flex'
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>{t("goToFirst")}</span>
						<DoubleArrowLeftIcon className='size-4' aria-hidden='true' />
					</Button>
					<Button
						aria-label='Go to previous page'
						variant='outline'
						className='size-8 p-0'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>{t("goToPrev")}</span>
						<ChevronLeftIcon className='size-4' aria-hidden='true' />
					</Button>
					<Button
						aria-label='Go to next page'
						variant='outline'
						className='size-8 p-0'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>{t("goToNext")}</span>
						<ChevronRightIcon className='size-4' aria-hidden='true' />
					</Button>
					<Button
						aria-label='Go to last page'
						variant='outline'
						className='hidden size-8 p-0 lg:flex'
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>{t("goToLast")}</span>
						<DoubleArrowRightIcon className='size-4' aria-hidden='true' />
					</Button>
				</div>
			</div>
		</div>
	)
}
