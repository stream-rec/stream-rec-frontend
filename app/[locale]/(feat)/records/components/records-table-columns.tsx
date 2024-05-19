"use client"

import {DataTableColumnHeader} from "@/app/components/table/data-table-column-header";
import {RecordTableActionColumn} from "@/app/[locale]/(feat)/records/components/records-action-colum";
import {deleteStream} from "@/lib/data/streams/stream-apis";
import {useFormatter, useTranslations} from "next-intl";
import React from "react";
import {StreamData, StreamerSchema} from "@/lib/data/streams/definitions";
import {DataTableFilterableColumn, DataTableSearchableColumn, Option} from "@/app/components/table/data-table";
import {ColumnDef} from "@tanstack/react-table";
import {AvatarIcon} from "@radix-ui/react-icons";
import {formatBytes} from "@/app/utils/conversions";


export function useRecordColumns() {
  const keys = ["id", "streamer", "title", "filePath", "danmuFilePath", "fileSize", "dateStart", "dateEnd"] as const
  const t = useTranslations("RecordColumns")
  return React.useMemo(() => {
    return keys.map((column) => ({
      accessorKey: t(`${column}.key`),
      uiName: t(`${column}.value`)
    }))
  }, [])
}


export const useRecordTableColumns = (streamers: StreamerSchema[]) => {

  const format = useFormatter();

  const columns = useRecordColumns()

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
          const {unit, size } = formatBytes(bytes)
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


  function searchableColumns(strings: { streamTitle: string }): DataTableSearchableColumn<StreamData>[] {
    return [
      {
        id: "title",
        title: strings.streamTitle,
      },
    ]
  }

  function getStreamerFilterableColumns(streamers: StreamerSchema[], strings: {
    streamer: string,
    dateRange: string
  }): DataTableFilterableColumn<StreamData>[] {
    const streamersOptions = streamers.map((streamer) => ({
      label: streamer.name,
      value: streamer.id?.toString() ?? "",
      icon: AvatarIcon
    } as Option))

    return [
      {
        id: "streamerName",
        title: strings.streamer,
        options: streamersOptions,
      },
      {
        id: "dateStart",
        title: strings.dateRange,
        options: [],
        date: true
      }
    ]
  }


  return {
    columns: tableColumns,
    filterableColumns: getStreamerFilterableColumns(streamers, {streamer: uiNameByIndex(1), dateRange: uiNameByIndex(6)}),
    searchableColumns: searchableColumns({streamTitle: uiNameByIndex(2)}),
    idFn: (id: string) => columns.find((props) => props.accessorKey == id)?.uiName ?? id
  }
}
