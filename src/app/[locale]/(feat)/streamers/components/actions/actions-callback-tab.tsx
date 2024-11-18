import {Alert, AlertDescription, AlertTitle} from "@/src/components/new-york/ui/alert";
import {MessageSquareWarningIcon} from "lucide-react";
import {ActionSchema} from "@/src/lib/data/actions/definitions";
import {NewActionDialog, NewActionDialogStrings} from "@/src/app/[locale]/(feat)/streamers/components/actions/new-action-dialog";
import {ActionCard} from "@/src/app/[locale]/(feat)/streamers/components/actions/action-card";
import React from "react";


type ActionsCallbackTabProps = {
  strings: ActionsCallbackTabStrings
  list: ActionSchema[]
  endedList: ActionSchema[]
  addItem: (data: ActionSchema) => void
  addItemEnded: (data: ActionSchema) => void
  deleteItem: (index: number) => void
  deleteItemEnded: (index: number) => void
  updateItem: (index: number, data: ActionSchema) => void
  updateItemEnded: (index: number, data: ActionSchema) => void
}

export type ActionsCallbackTabStrings = {
  alert: string,
  alertDescription: string,
  onPartedDownload: string
  onPartedDownloadDescription: string | React.ReactNode
  onStreamEnded: string
  onStreamEndedDescription: string | React.ReactNode
  newAction: string,
  actionStrings: NewActionDialogStrings
}

export function ActionsCallbackTab(
    {
      strings,
      list,
      endedList,
      addItem,
      addItemEnded,
      deleteItem,
      deleteItemEnded,
      updateItem,
      updateItemEnded,
    }: ActionsCallbackTabProps
) {


  return <div className="mt-6 space-y-6">

    <Alert>
      <MessageSquareWarningIcon className="h-4 w-4"/>
      <AlertTitle>{strings.alert}</AlertTitle>
      <AlertDescription>
        {strings.alertDescription}
      </AlertDescription>
    </Alert>

    <div className={"space-y-6"}>
      <div className={"space-y-6"}>
        <div className={"flex flex-col md:flex-row space-y-2 md:space-x-0 items-center justify-between space-x-2"}>
          <div>
            <p className="text-lg font-semibold">{strings.onPartedDownload}</p>
            <p className="text-sm text-slate-500">{strings.onPartedDownloadDescription}</p>
          </div>
          <NewActionDialog strings={strings.actionStrings} onSave={
            (data) => {
              // toast({
              //   title: "You submitted the following values:",
              //   description: (
              //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              //   <code className="text-white">{JSON.stringify(data, null, 2)}</code>
              // </pre>
              //   ),
              // })
              addItem(data);
            }
          }/>
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-3 gap-2.5"}>
          {
            list.map((field, index) => (
                <div key={"c-" + index}>
                  <ActionCard key={index} data={field} onDelete={() => deleteItem(index)} onCheckedChange={
                    (value) => {
                      const updated = {...field, enabled: value}
                      updateItem(index, updated)
                    }
                  } onEdit={e => updateItem(index, e)} actionStrings={strings.actionStrings}/>
                </div>
            ))
          }
        </div>

      </div>
      <div className={"space-y-6"}>
        <div className={"flex flex-col md:flex-row space-y-2 md:space-x-0 items-center justify-between space-x-2"}>
          <div>
            <p className="text-lg font-semibold">{strings.onStreamEnded}</p>
            <p className="text-sm text-slate-500">{strings.onStreamEndedDescription}</p>
          </div>
          <NewActionDialog strings={strings.actionStrings} onSave={
            (data) => {
              // toast({
              //   title: "You submitted the following values:",
              //   description: (
              //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              //   <code className="text-white">{JSON.stringify(data, null, 2)}</code>
              // </pre>
              //   ),
              // })
              addItemEnded(data);
            }
          }/>
        </div>
        <div className={"grid grid-cols-1 md:grid-cols-3 gap-2.5"}>
          {
            endedList.map((field, index) => (
                <div key={"cx-" + index}>
                  <ActionCard key={index} data={field} onDelete={() => deleteItemEnded(index)} onCheckedChange={
                    (value) => {
                      const updated = {...field, enabled: value}
                      updateItemEnded(index, updated)
                    }
                  } onEdit={e => updateItemEnded(index, e)} actionStrings={strings.actionStrings}/>
                </div>
            ))
          }
        </div>

      </div>

    </div>

  </div>
}