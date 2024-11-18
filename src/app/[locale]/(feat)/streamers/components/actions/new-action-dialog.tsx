import {Button} from "@/src/components/new-york/ui/button"
import {
  ActionSchema,
  ActionType,
  CommandActionSchema,
  CopyActionSchema,
  MoveActionSchema,
  RcloneActionSchema
} from "@/src/lib/data/actions/definitions";
import {FormMessage} from "@/src/components/new-york/ui/form";
import React, {useCallback, useRef} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/new-york/ui/select";
import {Switch} from "@/src/components/new-york/ui/switch";
import {cn} from "@/src/lib/utils";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/src/components/new-york/ui/alert-dialog";
import {Label} from "@/src/components/new-york/ui/label";
import {CommandActionForm} from "@/src/app/[locale]/(feat)/streamers/components/actions/form/command-form";
import {RcloneActionForm} from "@/src/app/[locale]/(feat)/streamers/components/actions/form/rclone-form";
import {MoveActionForm} from "@/src/app/[locale]/(feat)/streamers/components/actions/form/move-form";
import {DeleteActionForm} from "@/src/app/[locale]/(feat)/streamers/components/actions/form/delete-action-form";
import {CopyActionForm} from "@/src/app/[locale]/(feat)/streamers/components/actions/form/copy-form";

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
    remotePathDescription: string | React.ReactNode
    arguments: string,
    argumentsDescription: string
  }

  moveStrings: {
    title: string,
    destination: string,
    destinationDefault: string,
    destinationDescription: string
  },

  copyStrings: {
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

  const populateForm = (type: ActionType): React.ReactNode => {
    const formProps = {
      ref: formRef,
      onSubmit: onFormSubmit,
      defaultValues: {...defaultValues, type}
    };

    const forms = {
      [ActionType.Command]: <CommandActionForm {...formProps}
                                               defaultValues={formProps.defaultValues as CommandActionSchema}
                                               strings={strings.commandStrings}/>,
      [ActionType.Rclone]: <RcloneActionForm {...formProps}
                                             defaultValues={formProps.defaultValues as RcloneActionSchema} strings={{
        ...strings.rcloneStrings,
        addArgument: strings.commandStrings.addArgument
      }}/>,
      [ActionType.Remove]: <DeleteActionForm {...formProps} />,
      [ActionType.Move]: <MoveActionForm {...formProps} defaultValues={formProps.defaultValues as MoveActionSchema}
                                         strings={strings.moveStrings}/>,
      [ActionType.Copy]: <CopyActionForm {...formProps} defaultValues={formProps.defaultValues as CopyActionSchema}
                                         strings={strings.copyStrings}/>
    };

    return forms[type] || null;
  }


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
        <AlertDialogContent className="sm:max-w-[425px] max-h-[90%] 3xl:max-h-[850px] overflow-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>{strings.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {strings.description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Label>{strings.actionType}</Label>
          <Select onValueChange={e => {
            handleTypeChange(e as ActionType)
          }} defaultValue={defaultValues?.type}>
            <SelectTrigger>
              <SelectValue placeholder={strings.actionSelectPlaceholder}/>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={ActionType.Command}>{strings.commandStrings.title}</SelectItem>
              <SelectItem value={ActionType.Rclone}>{strings.rcloneStrings.title}</SelectItem>
              <SelectItem value={ActionType.Copy}>{strings.copyStrings.title}</SelectItem>
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

          {
            populateForm(type)
          }
          <AlertDialogFooter>
            <AlertDialogCancel>{strings.cancel}</AlertDialogCancel>
            <Button type="button" onClick={submitForm}>{strings.save}</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}
