import * as React from "react"
import {useEffect, useMemo} from "react"
import {Column} from "@tanstack/react-table"

import {Button} from "@/components/new-york/ui/button"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/new-york/ui/popover"
import {DateRange} from "react-day-picker";
import {Calendar} from "@/components/new-york/ui/calendar";
import {CalendarIcon} from "lucide-react";
import {Command, CommandGroup, CommandItem, CommandList, CommandSeparator,} from "@/components/new-york/ui/command"
import {useFormatter, useLocale, useTranslations} from "next-intl";
import {enUS, zhCN} from "date-fns/locale";

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
  const locale = useLocale()

  const localeObj = useMemo(() => {
    if (locale === "zh") return zhCN
    else if (locale === "en") return enUS
    else return enUS
  }, [locale])

  useEffect(() => {
    if (date?.from && date?.to) {
      // set date.from to the beginning
      date.from.setHours(0, 0, 0, 0)
      // set date.to to the end of the day
      date.to.setHours(23, 59, 59, 999)
      column?.setFilterValue([date.from.getTime(), date.to.getTime()])
    } else if (date?.from) {
      // set date.from to the beginning
      date.from.setHours(0, 0, 0, 0)
      column?.setFilterValue([date.from.getTime()])
    } else {
      column?.setFilterValue(undefined)
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
              locale={localeObj}
          />

          <Command>
            <CommandList>
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