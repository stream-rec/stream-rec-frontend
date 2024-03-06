"use client"

import {ColumnDef} from "@tanstack/react-table"
import {format} from 'date-fns';

import {DataTableColumnHeader} from "@/app/components/table/data-table-column-header";
import {Badge} from "@/components/new-york/ui/badge";
import {dataStatues, UploadData} from "@/app/lib/data/uploads/definitions";
import {UploadActionColumn} from "@/app/dashboard/uploads/components/upload-action-column";

export const uploadsTableColumnProps = [
  {
    accessorKey: "id",
    uiName: "Id",
  },
  {
    accessorKey: "streamer",
    uiName: "Streamer",
  },
  {
    accessorKey: "streamTitle",
    uiName: "Stream title",
  },
  {
    accessorKey: "filePath",
    uiName: "File Path",
  },
  {
    accessorKey: "streamStartTime",
    uiName: "Stream Time",
  },
  {
    accessorKey: "status",
    uiName: "Status",
  },
]


function uiNameByIndex(index: number) {
  return uploadsTableColumnProps[index].uiName
}

function accessorKeyByIndex(index: number) {
  return uploadsTableColumnProps[index].accessorKey
}

export const uploadsTableColumns: ColumnDef<UploadData>[] = [
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
    cell: (cell) => {
      const date = new Date(cell.getValue() as number);
      const now = new Date();
      if (date.getFullYear() == now.getFullYear())
        return format(date, 'MM/dd hh:mm:ss');
      else
        return format(date, 'MM/dd/yyyy hh:mm:ss');
    },
  },
  {
    accessorKey: accessorKeyByIndex(5),
    header: ({column}) => (
        <DataTableColumnHeader column={column} title={uiNameByIndex(5)}/>
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
      return <UploadActionColumn data={uploadData}/>
    },
  },
]