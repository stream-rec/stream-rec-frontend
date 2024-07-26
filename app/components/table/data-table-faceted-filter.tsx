'use client'
import * as React from "react"
import {CheckIcon, PlusCircledIcon} from "@radix-ui/react-icons"
import {Column} from "@tanstack/react-table"

import {cn} from "@/lib/utils"
import {Badge} from "@/components/new-york/ui/badge"
import {Button} from "@/components/new-york/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,} from "@/components/new-york/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/new-york/ui/popover"
import {Separator} from "@/components/new-york/ui/separator"
import {useTranslations} from "next-intl";
import {Option} from "@/types/table";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: Option[]
}

export function DataTableFacetedFilter<TData, TValue>({
                                                        column,
                                                        title,
                                                        options,
                                                      }: DataTableFacetedFilterProps<TData, TValue>) {

  const t = useTranslations("TableToolbar")
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <PlusCircledIcon className="mr-2 size-4"/>
            {title}
            {selectedValues?.size > 0 && (
                <>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal lg:hidden"
                  >
                    {selectedValues.size}
                  </Badge>
                  <div className="hidden space-x-1 lg:flex">
                    {selectedValues.size > 2 ? (
                        <Badge
                            variant="secondary"
                            className="rounded-sm px-1 font-normal"
                        >
                          {t("selectedItems", {count: selectedValues.size})}
                        </Badge>
                    ) : (
                        options
                            .filter((option) => selectedValues.has(option.value))
                            .map((option) => (
                                <Badge
                                    variant="secondary"
                                    key={option.value}
                                    className="rounded-sm px-1 font-normal"
                                >
                                  {option.label}
                                </Badge>
                            ))
                    )}
                  </div>
                </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[12.5rem] p-0" align="start">
          <Command>
            <CommandInput placeholder={title} />
            <CommandList>
              <CommandEmpty>{t("noResults")}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.has(option.value)
                  return (
                      <CommandItem
                          key={option.value}
                          onSelect={() => {
                            if (isSelected) {
                              selectedValues.delete(option.value)
                            } else {
                              selectedValues.add(option.value)
                            }
                            const filterValues = Array.from(selectedValues)
                            column?.setFilterValue(
                                filterValues.length ? filterValues : undefined
                            )
                          }}
                      >
                        <div
                            className={cn(
                                "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                                isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : "opacity-50 [&_svg]:invisible"
                            )}
                        >
                          <CheckIcon className="size-4" aria-hidden="true"/>
                        </div>
                        {option.icon && (
                            <option.icon
                                className="mr-2 size-4 text-muted-foreground"
                                aria-hidden="true"
                            />
                        )}
                        <span>{option.label}</span>
                        {option.withCount &&
                            column?.getFacetedUniqueValues()?.get(option.value) && (
                                <span className="ml-auto flex size-4 items-center justify-center font-mono text-xs">
                          {column?.getFacetedUniqueValues().get(option.value)}
                        </span>
                            )}
                      </CommandItem>
                  )
                })}
              </CommandGroup>
              {selectedValues.size > 0 && (
                  <>
                    <CommandSeparator />
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