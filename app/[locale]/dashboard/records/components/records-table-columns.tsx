"use client"

import {ColumnDef} from "@tanstack/react-table"
import {startOfDay} from 'date-fns';
import {StreamData} from "@/lib/data/streams/definitions";
import {DataTableColumnHeader} from "@/app/components/table/data-table-column-header";
import {RecordTableActionColumn} from "@/app/[locale]/dashboard/records/components/records-action-colum";
import {deleteStream} from "@/lib/data/streams/stream-apis";
import {useFormatter, useTranslations} from "next-intl";


export function useRecordColumns() {
  const keys = ["id", "streamer", "title", "filePath", "danmufilePath", "dateStart", "dateEnd"] as const
  const t = useTranslations("RecordColumns")
  return keys.map((column) => ({
    accessorKey: t(`${column}.key`),
    uiName: t(`${column}.value`)
  }));
}


export const useRecordTableColumns = (): ColumnDef<StreamData>[] => {

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
      filterFn: (rows, id, filterValue) => {
        if (filterValue === undefined) {
          return rows;
        }
        const rowValue = rows.getValue(id)
        if (rowValue === undefined || rowValue === null) {
          return false;
        }
        return filterValue.includes(rowValue.toString())
      }
    },
    {
      accessorKey: accessorKeyByIndex(2),
      header: ({column}) => (
          <DataTableColumnHeader column={column} title={uiNameByIndex(2)}/>
      ),
      filterFn: (rows, id, filterValue) => {
        if (filterValue === undefined) {
          return rows;
        }
        const rowValue = rows.getValue(id)
        if (rowValue === undefined || rowValue === null) {
          return false;
        }
        return filterValue.includes(rowValue.toString())
      }
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
        const date = new Date(cell.getValue() as number);
        return formatDate(date)
      },
      filterFn: (rows, id, filterValue) => {
        const rowValue = rows.getValue(id);
        const date = startOfDay(new Date(rowValue as number));
        const filterFromDate = filterValue && new Date(filterValue[0]);
        const filterToDate = filterValue && filterValue[1] && new Date(filterValue[1]);

        return !filterValue || !rowValue
            ? true
            : filterToDate
                ? date >= filterFromDate && date <= filterToDate
                : date >= filterFromDate;
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
}
