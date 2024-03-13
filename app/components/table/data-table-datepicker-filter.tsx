import * as React from "react"
import {useEffect} from "react"
import {Column} from "@tanstack/react-table"

import {Button} from "@/components/new-york/ui/button"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/new-york/ui/popover"
import {DateRange} from "react-day-picker";
import {Calendar} from "@/components/new-york/ui/calendar";
import {CalendarIcon} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator,} from "@/components/new-york/ui/command"
import {useFormatter, useTranslations} from "next-intl";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
}

export function DataTableDatePickerFilter<TData, TValue>({
                                                           column,
                                                           title,
                                                         }: DataTableFacetedFilterProps<TData, TValue>) {

  const selectedValues = new Set(column?.getFilterValue() as string[])

  const [date, setDate] = React.useState<DateRange | undefined>(undefined)


  const t = useTranslations("TableToolbar")
  const format = useFormatter()

  useEffect(() => {
    if (date?.from && date?.to) {
      column?.setFilterValue([date.from.getTime(), date.to.getTime()])
    }
  }, [column, date, setDate])

  useEffect(() => {
    if (selectedValues.size == 0) {
      setDate(undefined)
    }
  }, [column?.setFilterValue, selectedValues.size]);

  return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
              id="date"
              variant="outline" size="sm" className="h-8 border-dashed">
            <CalendarIcon className="mr-2 h-4 w-4"/>
            {date?.from ? (
                date.to ? (
                    <>
                      {format.dateTime(date.from, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                      )} - {" "}
                      {format.dateTime(date.to, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                      )}
                    </>
                ) : (
                    format.dateTime(date.from, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                    )
                )
            ) : (
                <span>{title}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">

          <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
          />

          <Command>
            <CommandList>
              <CommandEmpty>{t("noResults")}</CommandEmpty>
              {selectedValues.size > 0 && (
                  <>
                    <CommandSeparator/>
                    <CommandGroup>
                      <CommandItem
                          onSelect={() => column?.setFilterValue(undefined)}
                          className="justify-center text-center"
                      >
                        {t("clearFilters")}
                      </CommandItem>
                    </CommandGroup>
                  </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
  )
}