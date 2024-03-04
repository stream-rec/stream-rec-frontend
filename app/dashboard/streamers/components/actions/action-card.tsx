import {Card, CardContent, CardHeader, CardTitle} from "@/components/new-york/ui/card";
import {Button} from "@/components/new-york/ui/button";
import {Switch} from "@/components/new-york/ui/switch";
import {Separator} from "@/components/new-york/ui/separator";
import {DeleteIcon, EditIcon} from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/new-york/ui/alert-dialog";
import {NewActionDialog} from "@/app/dashboard/streamers/components/actions/new-action-dialog";
import {ActionSchema, ActionType, CommandActionSchema, RcloneActionSchema} from "@/app/lib/data/actions/definitions";

type ActionCardProps = {
  data: ActionSchema
  onCheckedChange?: (value: boolean) => void
  onEdit?: (data: ActionSchema) => void
  onDelete?: () => void,
}

export function ActionCard({data, onCheckedChange, onEdit, onDelete}: ActionCardProps) {
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
                {data.type === ActionType.Command ? (data as CommandActionSchema).program : data.type === ActionType.Rclone ? (data as RcloneActionSchema).rcloneOperation : ""}
              </p>
              <p className="text-sm text-slate-500">
                {data.type === ActionType.Rclone ? (data as RcloneActionSchema).remotePath : ""}
              </p>
              <p className="text-sm text-slate-500 max-w-35 break-words">
                {(data as ActionSchema).args?.join(" ")}
              </p>

              <div className="flex flex-row items-center text-sm space-x-2">

                <NewActionDialog openIcon={<EditIcon className="h-4 w-4"/>} onSave={e => {
                  if (onEdit) {
                    onEdit(e)
                  }
                }} defaultValues={data}
                />

                <Separator orientation={"vertical"} className={"h-5"}/>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type={"button"} variant="outline" size={"icon"}><DeleteIcon className="h-4 w-4"/></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}