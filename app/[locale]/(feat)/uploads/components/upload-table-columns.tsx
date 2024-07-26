"use client"

import {ColumnDef} from "@tanstack/react-table"

import {Badge} from "@/components/new-york/ui/badge";
import {UploadData} from "@/lib/data/uploads/definitions";
import {deleteUpload, retryUpload} from "@/lib/data/uploads/upload-apis";
import {UploadActionColumn} from "@/app/[locale]/(feat)/uploads/components/upload-action-column";
import {DataTableColumnHeader} from "@/app/components/table/data-table-column-header";
import * as React from "react";
import {useTranslations} from "next-intl";
import {CircleIcon} from "lucide-react";
import {AvatarIcon, CheckIcon, CrossCircledIcon, QuestionMarkCircledIcon, StopwatchIcon} from "@radix-ui/react-icons";
import {StreamerSchema} from "@/lib/data/streams/definitions";
import {DataTableFilterField, Option} from "@/types/table";
import {Checkbox} from "@/components/new-york/ui/checkbox";


const uploadColumns = ["id", "streamer", "streamTitle", "filePath", "uploadPlatform", "status"] as const


export const useUploadsTableColumns = (streamers: StreamerSchema[]) => {

  const t = useTranslations("UploadColumns")

  const tableT = useTranslations("TableToolbar")


  const columns = React.useMemo(() => {
    return uploadColumns.map((column) => ({
      accessorKey: t(`${column}.key`),
      uiName: t(`${column}.value`)
    }))
  }, [t])

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
      ], [dataStatuesT])


  const tableColumns: ColumnDef<UploadData>[] = React.useMemo(() => [
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
            return <UploadActionColumn data={uploadData} retryUpload={retryUpload} deleteUpload={deleteUpload}/>
          },
        },
      ]
      , [columns])


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
      label: uiNameByIndex(5),
      value: accessorKeyByIndex(5),
      options: uploadStatuses,
    },
  ]

  return {
    columns: tableColumns,
    filterableColumns: filterFields,
    idFn: (id: string) => columns.find((props) => props.accessorKey == id)?.uiName ?? id
  }
};

