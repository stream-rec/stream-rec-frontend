import {ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon,} from "@radix-ui/react-icons"
import {Column} from "@tanstack/react-table"

import {cn} from "@/lib/utils"
import {Button} from "@/components/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/new-york/ui/dropdown-menu"
import {useTranslations} from "next-intl";

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
                                                       column,
                                                       title,
                                                       className,
                                                     }: DataTableColumnHeaderProps<TData, TValue>) {

  const t = useTranslations("TableToolbar")

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  /// Sort the column in the specified direction.
  const sort = (asc: boolean) => {
    const currentSort = column.getIsSorted();
    if (!currentSort || currentSort === (asc ? "asc" : "desc")) {
      column.toggleSorting(asc);
    } else {
      column.clearSorting();
    }
  };

  return (
      <div className={cn("flex items-center space-x-2", className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
                aria-label={
                  column.getIsSorted() === "desc"
                      ? "Sorted descending. Click to sort ascending."
                      : column.getIsSorted() === "asc"
                          ? "Sorted ascending. Click to sort descending."
                          : "Not sorted. Click to sort ascending."
                }
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>{title}</span>
              {column.getCanSort() && column.getIsSorted() === "desc" ? (
                  <ArrowDownIcon className="ml-2 size-4" aria-hidden="true"/>
              ) : column.getIsSorted() === "asc" ? (
                  <ArrowUpIcon className="ml-2 size-4" aria-hidden="true"/>
              ) : (
                  <CaretSortIcon className="ml-2 size-4" aria-hidden="true"/>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {column.getCanSort() && (
                <>
                  <DropdownMenuItem
                      aria-label="Sort ascending"
                      onClick={() => sort(false)}
                  >
                    <ArrowUpIcon
                        className="mr-2 size-3.5 text-muted-foreground/70"
                        aria-hidden="true"
                    />
                    {t("asc")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                      aria-label="Sort descending"
                      onClick={() => sort(true)}
                  >
                    <ArrowDownIcon
                        className="mr-2 size-3.5 text-muted-foreground/70"
                        aria-hidden="true"
                    />
                    {t("desc")}
                  </DropdownMenuItem>
                </>
            )}
            {column.getCanSort() && column.getCanHide() && (
                <DropdownMenuSeparator/>
            )}
            {column.getCanHide() && (
                <DropdownMenuItem
                    aria-label="Hide column"
                    onClick={() => column.toggleVisibility(false)}
                >
                  <EyeNoneIcon
                      className="mr-2 size-3.5 text-muted-foreground/70"
                      aria-hidden="true"
                  />
                  {t("hide")}
                </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  )
}