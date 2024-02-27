"use client"

import {ColumnDef} from "@tanstack/react-table"
import {dataStatues, StreamData} from "@/app/lib/definitions";
import {format} from 'date-fns';
import {MoreHorizontal} from "lucide-react"

import {Button} from "@/components/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/new-york/ui/dropdown-menu"
import {DataTableColumnHeader} from "@/app/components/table/data-table-column-header";
import {Badge} from "@/components/new-york/ui/badge";
import {DataTableToolbarColumnProps} from "@/app/components/table/toolbar";


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
  {
    accessorKey: "status",
    uiName: "Upload status",
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
      return format(date, 'MM/dd/yyyy hh:mm:ss');
    }
  },

  {
    accessorKey: accessorKeyByIndex(7),
    header: ({column}) => (
        <DataTableColumnHeader column={column} title={uiNameByIndex(7)}/>
    ),
    cell: (cell) => {
      const statusBool = cell.getValue()
      let status;
      if (statusBool) {
        status = dataStatues[0]
      } else {
        status = dataStatues[1]
      }

      const variant = statusBool ? "default" : "secondary"
      return (
          <div className="flex items-center">
            <Badge variant={variant} className="">
              {status.label}
            </Badge>
          </div>
      )
    },
    enableHiding: false,
    enableSorting: false,
    filterFn: (rows, id, filterValue) => {
      if (filterValue === undefined) {
        return rows;
      }
      const rowValue = rows.getValue(id)
      let rowValueString;
      if (rowValue === true) {
        rowValueString = "success"
      } else {
        rowValueString = "failed"
      }
      return filterValue.includes(rowValueString);
    }
  },
  {
    id: "actions",
    cell: ({row}) => {
      const data = row.original

      return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                View streamer details
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>Re-upload</DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      )
    },
  },
]