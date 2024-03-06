"use client"

import {ColumnDef} from "@tanstack/react-table"
import {format} from 'date-fns';
import {DataTableColumnHeader} from "@/app/components/table/data-table-column-header";
import {DataTableToolbarColumnProps} from "@/app/components/table/toolbar";
import {StreamData} from "@/app/lib/data/streams/definitions";
import {RecordTableActionColumn} from "@/app/dashboard/records/components/records-action-colum";


export const recordColumnProps: DataTableToolbarColumnProps[] = [
  {
    accessorKey: "id",
    uiName: "Id",
  },
  {
    accessorKey: "streamerName",
    uiName: "Streamer",
  },
  {
    accessorKey: "title",
    uiName: "Title",
  },
  {
    accessorKey: "outputFilePath",
    uiName: "File Path",
  },
  {
    accessorKey: "danmuFilePath",
    uiName: "Danmu File Path",
  },
  {
    accessorKey: "dateStart",
    uiName: "Stream Start Time",
  },
  {
    accessorKey: "dateEnd",
    uiName: "Stream End Time",
  },
]

function accessorKeyByIndex(index: number) {
  return recordColumnProps[index].accessorKey
}

function uiNameByIndex(index: number) {
  return recordColumnProps[index].uiName
}


export const recordColumns: ColumnDef<StreamData>[] = [
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
      // if date is this year, only show month and day
      const now = new Date()
      if (date.getFullYear() == now.getFullYear())
        return format(date, 'MM/dd hh:mm:ss');
      else
        return format(date, 'MM/dd/yyyy hh:mm:ss');
    }
  },

  {
    accessorKey: accessorKeyByIndex(6),
    header: ({column}) => (
        <DataTableColumnHeader column={column} title={uiNameByIndex(6)}/>
    ),
    cell: (cell) => {
      const date = new Date(cell.getValue() as number);
      // if date is this year, only show month and day
      const now = new Date()
      if (date.getFullYear() == now.getFullYear())
        return format(date, 'MM/dd hh:mm:ss');
      else
        return format(date, 'MM/dd/yyyy hh:mm:ss');
    }
  },
  {
    id: "actions",
    cell: ({row}) => {
      const data = row.original
      return <RecordTableActionColumn data={data}/>
    },
  },
]