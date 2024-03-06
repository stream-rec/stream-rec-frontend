import * as React from "react"
import {useEffect} from "react"
import {Column} from "@tanstack/react-table"

import {Button} from "@/components/new-york/ui/button"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/new-york/ui/popover"
import {DateRange} from "react-day-picker";
import {format} from "date-fns";
import {Calendar} from "@/components/new-york/ui/calendar";
import {CalendarIcon} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator,} from "@/components/new-york/ui/command"

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export function DataTableDatePickerFilter<TData, TValue>({
                                                           column,
                                                           title,
                                                           options,
                                                         }: DataTableFacetedFilterProps<TData, TValue>) {

  const selectedValues = new Set(column?.getFilterValue() as string[])

  const [date, setDate] = React.useState<DateRange | undefined>(undefined)


  useEffect(() => {
    if (date?.from && date?.to) {
      column?.setFilterValue([date.from, date.to])
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
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                ) : (
                    format(date.from, "LLL dd, y")
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
              <CommandEmpty>No results found.</CommandEmpty>
              {selectedValues.size > 0 && (
                  <>
                    <CommandSeparator/>
                    <CommandGroup>
                      <CommandItem
                          onSelect={() => column?.setFilterValue(undefined)}
                          className="justify-center text-center"
                      >
                        Clear filter
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