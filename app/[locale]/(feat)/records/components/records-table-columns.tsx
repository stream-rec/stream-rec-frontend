"use client"

import {DataTableColumnHeader} from "@/app/components/table/data-table-column-header";
import {RecordTableActionColumn} from "@/app/[locale]/(feat)/records/components/records-action-colum";
import {deleteStream} from "@/lib/data/streams/stream-apis";
import {useFormatter, useTranslations} from "next-intl";
import React from "react";
import {StreamData, StreamerSchema} from "@/lib/data/streams/definitions";
import {ColumnDef} from "@tanstack/react-table";
import {AvatarIcon} from "@radix-ui/react-icons";
import {formatBytes} from "@/app/utils/conversions";
import {Checkbox} from "@/components/new-york/ui/checkbox";
import {DataTableFilterField, Option} from "@/types/table";

const keys = ["id", "streamer", "title", "filePath", "danmuFilePath", "fileSize", "dateStart", "dateEnd"] as const

export const useRecordTableColumns = (streamers: StreamerSchema[]) => {

  const format = useFormatter()

  const tableT = useTranslations("TableToolbar")

  const t = useTranslations("RecordColumns")

  const columns = React.useMemo(() => {
    return keys.map((column) => ({
      accessorKey: t(`${column}.key`),
      uiName: t(`${column}.value`)
    }))
  }, [t])

  const uiNameByIndex = (index: number) => columns[index].uiName;

  const accessorKeyByIndex = (index: number) => columns[index].accessorKey;

  const formatDate = (date: Date) => {
    const now = new Date();
    if (date.getFullYear() == now.getFullYear())
      return format.dateTime(date, {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })
    else
      return format.dateTime(date, {
        year: '2-digit',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })
  }

  const tableColumns: ColumnDef<StreamData>[] = React.useMemo(() => {
    return [
      {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-0.5"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-0.5"
            />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: accessorKeyByIndex(0),
        header: ({column}) => (
            <DataTableColumnHeader column={column} title={uiNameByIndex(0)}/>
        ),
        cell: ({row}) => <div className="w-[80px]">{row.getValue(accessorKeyByIndex(0))}</div>,
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: accessorKeyByIndex(1),
        header: ({column}) => (
            <DataTableColumnHeader column={column} title={uiNameByIndex(1)}/>
        ),
        cell: ({row}) => <div className="w-[80px]">{row.getValue(accessorKeyByIndex(1))}</div>,
        enableSorting: false,
      },
      {
        accessorKey: accessorKeyByIndex(2),
        header: ({column}) => (
            <DataTableColumnHeader column={column} title={uiNameByIndex(2)}/>
        ),
      },
      {
        accessorKey: accessorKeyByIndex(3),
        header: ({column}) => (
            <DataTableColumnHeader column={column} title={uiNameByIndex(3)}/>
        ),
        enableSorting: false,
        enableHiding: false,
      },

      {
        accessorKey: accessorKeyByIndex(4),
        header: ({column}) => (
            <DataTableColumnHeader column={column} title={uiNameByIndex(4)}/>
        ),
        enableSorting: false,
        enableHiding: false,
      },

      {
        accessorKey: accessorKeyByIndex(5),
        header: ({column}) => (
            <DataTableColumnHeader column={column} title={uiNameByIndex(5)}/>
        ),
        cell: (cell) => {
          const bytes = cell.getValue() as number;
          const {unit, size} = formatBytes(bytes)
          return `${size} ${unit}`
        }
      },

      {
        accessorKey: accessorKeyByIndex(6),
        header: ({column}) => (
            <DataTableColumnHeader column={column} title={uiNameByIndex(6)}/>
        ),
        cell: (cell) => {
          const date = new Date(cell.getValue() as number);
          return formatDate(date)
        },
      },

      {
        accessorKey: accessorKeyByIndex(7),
        header: ({column}) => (
            <DataTableColumnHeader column={column} title={uiNameByIndex(7)}/>
        ),
        cell: (cell) => {
          const date = new Date(cell.getValue() as number);
          return formatDate(date)
        }
      },
      {
        id: "actions",
        cell: ({row}) => {
          const data = row.original
          return <RecordTableActionColumn data={data} deleteStream={deleteStream}/>
        },
      },
    ]
  }, [])


  const filterFields: DataTableFilterField<any>[] = [
    {
      label: uiNameByIndex(2),
      value: accessorKeyByIndex(2),
      placeholder: tableT("searchPlaceholder", {search: uiNameByIndex(2)}),
    },
    {
      label: uiNameByIndex(1),
      value: accessorKeyByIndex(1),
      options: streamers.map((streamer) => ({
        label: streamer.name,
        value: streamer.id?.toString() ?? "",
        icon: AvatarIcon,
      } as Option)),
    },
    {
      label: tableT("dateRange"),
      value: accessorKeyByIndex(6),
      options: [],
      dateRange: true,
    }
  ]

  return {
    columns: tableColumns,
    filterableColumns: filterFields,
    idFn: (id: string) => columns.find((props) => props.accessorKey == id)?.uiName ?? id
  }
}
