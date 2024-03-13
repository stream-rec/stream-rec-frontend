"use client"

import {ColumnDef} from "@tanstack/react-table"

import {Badge} from "@/components/new-york/ui/badge";
import {UploadData} from "@/lib/data/uploads/definitions";
import {deleteUpload} from "@/lib/data/uploads/upload-apis";
import {UploadActionColumn} from "@/app/[locale]/dashboard/uploads/components/upload-action-column";
import {DataTableColumnHeader} from "@/app/components/table/data-table-column-header";
import * as React from "react";
import {useTranslations} from "next-intl";
import {DataTableFilterableColumn, DataTableSearchableColumn, Option} from "@/app/components/table/data-table";
import {CircleIcon} from "lucide-react";
import {AvatarIcon, CheckIcon, CrossCircledIcon, QuestionMarkCircledIcon, StopwatchIcon} from "@radix-ui/react-icons";
import {StreamerSchema} from "@/lib/data/streams/definitions";

export function useUploadColumns() {
  const uploadColumns = ["id", "streamer", "streamTitle", "filePath", "uploadPlatform", "status"] as const
  const t = useTranslations("UploadColumns")
  return React.useMemo(() => {
    return uploadColumns.map((column) => ({
      accessorKey: t(`${column}.key`),
      uiName: t(`${column}.value`)
    }))
  }, [])
}


function getUploadFilterableColumns(streamers: StreamerSchema[], uploadStatuses: Option[], strings: {
  streamer: string,
  status: string
}): DataTableFilterableColumn<UploadData>[] {
  const streamersOptions = streamers.map((streamer) => ({
    label: streamer.name,
    value: streamer.id?.toString() ?? "",
    icon: AvatarIcon
  } as Option))

  return [
    {
      id: "streamer",
      title: strings.streamer,
      options: streamersOptions,
    },
    {
      id: "status",
      title: strings.status,
      options: uploadStatuses,
    },
  ]
}


export function searchableColumns(strings: { streamTitle: string }): DataTableSearchableColumn<UploadData>[] {
  return [
    {
      id: "streamTitle",
      title: strings.streamTitle,
    },
  ]
}


export const useUploadsTableColumns = (streamers: StreamerSchema[]) => {

  const columns = useUploadColumns()
  const dataStatuesT = useTranslations("UploadStates")

  const uiNameByIndex = (index: number) => columns[index].uiName;

  const accessorKeyByIndex = (index: number) => columns[index].accessorKey;

  const uploadStatuses = React.useMemo(() =>
      [
        {

          label: dataStatuesT("notStarted"),
          value: "NOT_STARTED",
          icon: CircleIcon
        },
        {
          label: dataStatuesT("uploading"),
          value: "UPLOADING",
          icon: StopwatchIcon
        },

        {
          label: dataStatuesT("uploaded"),
          value: "UPLOADED",
          icon: CheckIcon
        },
        {
          label: dataStatuesT("failed"),
          value: "FAILED",
          icon: CrossCircledIcon
        },
        {
          label: dataStatuesT("retrying"),
          value: "REUPLOADING",
          icon: QuestionMarkCircledIcon
        }
      ], [])


  const tableColumns: ColumnDef<UploadData>[] = React.useMemo(() => [
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
          enableSorting: false,
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
          enableSorting: true,
          enableHiding: true,
        },
        {
          accessorKey: accessorKeyByIndex(4),
          header: ({column}) => (
              <DataTableColumnHeader column={column} title={uiNameByIndex(4)}/>
          ),
          cell: (cell) => {
            let platform = (cell.getValue() as string).toLocaleLowerCase()
            platform = platform.charAt(0).toUpperCase() + platform.slice(1)
            return (
                <div className="flex items-center">
                  <Badge> {platform} </Badge>
                </div>
            )
          },
          enableSorting: false,
        },
        {
          accessorKey: accessorKeyByIndex(5),
          header: ({column}) => (
              <DataTableColumnHeader column={column} title={uiNameByIndex(5)}/>
          ),
          cell: (cell) => {
            const status = uploadStatuses.find(
                (status) => status.value === cell.getValue()
            )

            if (!status) {
              return null
            }

            return (
                <div className="flex w-[100px] items-center">
                  {status.icon && (
                      <status.icon className="mr-2 h-4 w-4 text-muted-foreground"/>
                  )}
                  <span>{status.label}</span>
                </div>
            )
          },
          enableHiding: false,
          enableSorting: false,
        },
        {
          id: "actions",
          cell: ({row}) => {
            const uploadData = row.original
            return <UploadActionColumn data={uploadData} deleteUpload={deleteUpload}/>
          },
        },
      ]
      , [columns])
  return {
    columns: tableColumns,
    filterableColumns: getUploadFilterableColumns(streamers, uploadStatuses, {streamer: uiNameByIndex(1), status: uiNameByIndex(5)}),
    searchableColumns: searchableColumns({streamTitle: uiNameByIndex(2)}),
    idFn: (id : string) => columns.find((props) => props.accessorKey == id)?.uiName ?? id
  }
};

