"use client"

import {ColumnDef} from "@tanstack/react-table"
import {dataStatues, UploadData} from "@/app/lib/definitions";
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

export const columns: ColumnDef<UploadData>[] = [
  {
    accessorKey: "id",
    header: ({column}) => (
        <DataTableColumnHeader column={column} title="id"/>
    ),
    cell: ({row}) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "streamer",
    header: ({column}) => (
        <DataTableColumnHeader column={column} title="Streamer"/>
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
    accessorKey: "streamTitle",
    header: ({column}) => (
        <DataTableColumnHeader column={column} title="Stream title"/>
    ),
    cell: ({row}) => {
      return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
            {row.getValue("streamTitle")}
          </span>
          </div>
      )
    },
  },
  {
    accessorKey: "filePath",
    header: ({column}) => (
        <DataTableColumnHeader column={column} title="File Path"/>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "streamStartTime",
    header: ({column}) => (
        <DataTableColumnHeader column={column} title="Stream Start Time"/>
    ),
    cell: (cell) => {
      const date = new Date(cell.getValue() as number);
      return format(date, 'MM/dd/yyyy hh:mm:ss');
    }
  },
  {
    accessorKey: "status",
    header: ({column}) => (
        <DataTableColumnHeader column={column} title="Status"/>
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
      const uploadData = row.original

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
                View stream details
              </DropdownMenuItem>
              <DropdownMenuItem>View streamer details</DropdownMenuItem>
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