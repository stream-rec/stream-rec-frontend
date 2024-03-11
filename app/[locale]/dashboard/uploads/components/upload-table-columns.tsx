"use client"

import {ColumnDef} from "@tanstack/react-table"
import {startOfDay} from 'date-fns';

import {Badge} from "@/components/new-york/ui/badge";
import {dataStatues, UploadData} from "@/lib/data/uploads/definitions";
import {deleteUpload} from "@/lib/data/uploads/upload-apis";
import {UploadActionColumn} from "@/app/[locale]/dashboard/uploads/components/upload-action-column";
import {DataTableColumnHeader} from "@/app/components/table/data-table-column-header";
import * as React from "react";
import {useFormatter, useTranslations} from "next-intl";

export function useUploadColumns() {
  const uploadColumns = ["id", "streamer", "streamTitle", "filePath", "uploadTime", "status"] as const
  const t = useTranslations("UploadColumns")
  return uploadColumns.map((column) => ({
    accessorKey: t(`${column}.key`),
    uiName: t(`${column}.value`)
  }));
}


export const useUploadsTableColumns = (): ColumnDef<UploadData> [] => {

  const format = useFormatter();

  const columns = useUploadColumns()

  const t = useTranslations("TableToolbar")

  const uiNameByIndex = (index: number) => columns[index].uiName;

  const accessorKeyByIndex = (index: number) => columns[index].accessorKey;

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
                {status.label == "success" ? t("success") : t("failed")}
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
        return <UploadActionColumn data={uploadData} deleteUpload={deleteUpload}/>
      },
    },
  ]
};
