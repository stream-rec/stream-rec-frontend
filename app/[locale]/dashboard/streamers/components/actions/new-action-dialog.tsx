import {Button} from "@/components/new-york/ui/button"
import {
  ActionSchema,
  ActionType,
  CommandActionSchema,
  MoveActionSchema,
  RcloneActionSchema
} from "@/lib/data/actions/definitions";
import {FormMessage} from "@/components/new-york/ui/form";
import React, {useCallback, useRef} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/new-york/ui/select";
import {Switch} from "@/components/new-york/ui/switch";
import {cn} from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/new-york/ui/alert-dialog";
import {Label} from "@/components/new-york/ui/label";
import {CommandActionForm} from "@/app/[locale]/dashboard/streamers/components/actions/form/command-form";
import {RcloneActionForm} from "@/app/[locale]/dashboard/streamers/components/actions/form/rclone-form";
import {MoveActionForm} from "@/app/[locale]/dashboard/streamers/components/actions/form/move-form";
import {DeleteActionForm} from "@/app/[locale]/dashboard/streamers/components/actions/form/delete-action-form";

type NewActionDialogProps = {
  strings: NewActionDialogStrings
  openIcon?: React.ReactNode
  onSave: (data: ActionSchema) => void
  defaultValues?: ActionSchema
}

export type NewActionDialogStrings = {
  title: string,
  description: string
  actionType: string,
  actionSelectPlaceholder: string,
  actionTypeDescription: string,
  state: string,
  stateDescription: string,
  cancel: string,
  save: string,

  commandStrings: {
    title: string,
    program: string,
    programDescription: string
    arguments: string,
    argumentsDescription: string
    addArgument: string
    removeArgument: string
  },

  rcloneStrings: {
    title: string,
    operation: string,
    operationDescription: string,
    remotePath: string,
    remotePathDescription: string
    arguments: string,
    argumentsDescription: string
  }

  moveStrings: {
    title: string,
    destination: string,
    destinationDefault: string,
    destinationDescription: string
  },
  removeStrings: {
    title: string
  }
}

const defaultAction: ActionSchema = {
  type: ActionType.Command,
  enabled: true,
  args: [],
  program: ""
}

const useActionResolver = (initial: ActionType) => {
  const [type, setType] = React.useState(initial)

  const handleTypeChange = useCallback((e: ActionType) => {
    console.log("setting type", e)
    setType(e)
  }, [])

  return {
    type,
    handleTypeChange
  }
};


export function NewActionDialog({strings, openIcon, defaultValues = defaultAction, onSave}: NewActionDialogProps) {

  const [open, setOpen] = React.useState(false)

  const {type, handleTypeChange} = useActionResolver(ActionType.Command)

  const [active, setActive] = React.useState(defaultValues?.enabled ?? true)

  const formRef = useRef<HTMLFormElement>(null)

  const submitForm = () => {
    formRef.current?.dispatchEvent(new Event("submit", {bubbles: true}))
  };

  const onFormSubmit = (data: ActionSchema) => {
    data.enabled = active
    onSave(data)
    setOpen(false)
  };

  return (
      <AlertDialog open={open} onOpenChange={
        (e) => {
          if (!e) {
            console.log("resetting form")
          } else {
            console.log("setting default values")
            handleTypeChange(defaultValues?.type as (ActionType | null | undefined) ?? ActionType.Command)
          }
          setOpen(e)
        }
      }>
        <AlertDialogTrigger asChild>
          <Button onClick={() => open ? setOpen(false) : setOpen(true)}
                  variant="outline">{openIcon ?? strings.title}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>{strings.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {strings.description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Label>{strings.actionType}</Label>
          <Select onValueChange={e => {
            handleTypeChange(e as ActionType.Command | ActionType.Rclone)
          }} defaultValue={defaultValues?.type}>
            <SelectTrigger>
              <SelectValue placeholder={strings.actionSelectPlaceholder}/>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={ActionType.Command}>{strings.commandStrings.title}</SelectItem>
              <SelectItem value={ActionType.Rclone}>{strings.rcloneStrings.title}</SelectItem>
              <SelectItem value={ActionType.Move}>{strings.moveStrings.title}</SelectItem>
              <SelectItem value={ActionType.Remove}>{strings.removeStrings.title}</SelectItem>
            </SelectContent>
          </Select>
          <p className={cn("text-[0.8rem] text-muted-foreground")}>
            {strings.actionTypeDescription}
          </p>
          <FormMessage/>

          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label>{strings.state}</Label>
              <p className={cn("text-[0.8rem] text-muted-foreground")}>
                {strings.stateDescription}
              </p>
            </div>
            <Switch
                checked={active}
                onCheckedChange={setActive}
                arial-label="State switch"
            />
          </div>

          <>
            {
                type === ActionType.Command && (
                    <CommandActionForm ref={formRef}
                                       defaultValues={{...defaultValues, type: ActionType.Command} as CommandActionSchema}
                                       strings={
                                         {
                                           program: strings.commandStrings.program,
                                           programDescription: strings.commandStrings.programDescription,
                                           arguments: strings.commandStrings.arguments,
                                           argumentsDescription: strings.commandStrings.argumentsDescription,
                                           addArgument: strings.commandStrings.addArgument,
                                           removeArgument: strings.commandStrings.removeArgument
                                         }
                                       } onSubmit={onFormSubmit}/>
                )
            }
            {
                type === ActionType.Rclone && (
                    <RcloneActionForm ref={formRef}
                                      defaultValues={{...defaultValues, type: ActionType.Rclone} as RcloneActionSchema}
                                      strings={
                                        {
                                          operation: strings.rcloneStrings.operation,
                                          operationDescription: strings.rcloneStrings.operationDescription,
                                          remotePath: strings.rcloneStrings.remotePath,
                                          remotePathDescription: strings.rcloneStrings.remotePathDescription,
                                          arguments: strings.rcloneStrings.arguments,
                                          argumentsDescription: strings.rcloneStrings.argumentsDescription,
                                          addArgument: strings.commandStrings.addArgument,
                                        }
                                      } onSubmit={onFormSubmit}/>
                )
            }

            {
                type === ActionType.Remove && (<DeleteActionForm ref={formRef} onSubmit={onFormSubmit} defaultValues={{
                  ...defaultValues,
                  type: ActionType.Remove
                }}/>)
            }
            {
                type === ActionType.Move && (<MoveActionForm ref={formRef} onSubmit={onFormSubmit} defaultValues={{
                  ...defaultValues,
                  type: ActionType.Move
                } as MoveActionSchema} strings={{...strings.moveStrings}}/>)
            }
          </>
          <AlertDialogFooter>
            <AlertDialogCancel>{strings.cancel}</AlertDialogCancel>
            <Button type="button" onClick={submitForm}>{strings.save}</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}
