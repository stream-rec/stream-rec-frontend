import {Card, CardContent, CardHeader, CardTitle} from "@/src/components/new-york/ui/card";
import {Switch} from "@/src/components/new-york/ui/switch";
import {Separator} from "@/src/components/new-york/ui/separator";
import {DeleteIcon, EditIcon} from "lucide-react";
import React from "react";
import {
  ActionSchema,
  ActionType,
  CommandActionSchema,
  CopyActionSchema,
  MoveActionSchema,
  RcloneActionSchema
} from "@/src/lib/data/actions/definitions";
import {NewActionDialog, NewActionDialogStrings} from "@/src/app/[locale]/(feat)/streamers/components/actions/new-action-dialog";
import {DeleteIconDialog} from "@/src/app/components/dialog/delete-icon-dialog";
import {Button} from "@/src/components/new-york/ui/button";

type ActionCardProps = {
  data: ActionSchema
  onCheckedChange?: (value: boolean) => void
  onEdit?: (data: ActionSchema) => void
  onDelete?: () => void,
  actionStrings: NewActionDialogStrings
}

export function ActionCard({data, onCheckedChange, onEdit, onDelete, actionStrings}: ActionCardProps) {

  const renderArgs = (data: CommandActionSchema | RcloneActionSchema) => (
      <p className="text-sm text-slate-500 max-w-35 break-words">{data.args?.join(" ")}</p>
  );

  const renderArgsIfType = (type: ActionType) => {
    if (type === ActionType.Command || type === ActionType.Rclone) {
      return renderArgs(data as CommandActionSchema | RcloneActionSchema);
    }
  }


  return (
      <div>
        <Card className="w-52">
          <CardHeader>
            <CardTitle className={"flex justify-between"}>{data.type}
              <Switch
                  checked={data.enabled}
                  onCheckedChange={onCheckedChange}
                  arial-label="Command state switch"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={"flex flex-col justify-between space-y-1 w-full"}>
              <p className="text-sm text-slate-500">
                {data.type === ActionType.Command ? (data as CommandActionSchema).program :
                    data.type === ActionType.Rclone ? (data as RcloneActionSchema).rcloneOperation : ""}
              </p>
              <p className="text-sm text-slate-500 max-w-35 break-words">
                {data.type === ActionType.Rclone && (data as RcloneActionSchema).remotePath}
              </p>
              <p className="text-sm text-slate-500 max-w-35 break-words">
                {data.type === ActionType.Move && (data as MoveActionSchema).destination}
              </p>
              <p className="text-sm text-slate-500 max-w-35 break-words">
                {data.type === ActionType.Copy && (data as CopyActionSchema).destination}
              </p>

              {
                renderArgsIfType(data.type)
              }

              <div className="flex flex-row items-center text-sm space-x-2">

                <NewActionDialog openIcon={<EditIcon className="h-4 w-4"/>} onSave={e => {
                  if (onEdit) {
                    onEdit(e)
                  }
                }} defaultValues={data} strings={actionStrings}/>

                <Separator orientation={"vertical"} className={"h-5"}/>

                <DeleteIconDialog icon={<Button type={"button"} variant="outline" size={"icon"}><DeleteIcon
                    className="h-4 w-4"/></Button>} onDelete={
                  async () => {
                    if (onDelete) {
                      onDelete()
                    }
                  }
                }/>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}