import {NewActionDialog} from "@/app/dashboard/streamers/components/actions/new-action-dialog";
import React from "react";
import {toast} from "@/components/new-york/ui/use-toast";
import {ActionCard} from "@/app/dashboard/streamers/components/actions/action-card";
import {ActionSchema} from "@/app/lib/data/actions/definitions";
import {Alert, AlertDescription, AlertTitle} from "@/components/new-york/ui/alert";
import {MessageSquareWarningIcon} from "lucide-react";


type ActionsCallbackTabProps = {
  list: ActionSchema[]
  endedList: ActionSchema[]
  addItem: (data: ActionSchema) => void
  addItemEnded: (data: ActionSchema) => void
  deleteItem: (index: number) => void
  deleteItemEnded: (index: number) => void
  updateItem: (index: number, data: ActionSchema) => void
  updateItemEnded: (index: number, data: ActionSchema) => void
}

export function ActionsCallbackTab(
    {
      list,
      endedList,
      addItem,
      addItemEnded,
      deleteItem,
      deleteItemEnded,
      updateItem,
      updateItemEnded
    }: ActionsCallbackTabProps
) {


  return <div className="mt-6 space-y-6">

    <Alert>
      <MessageSquareWarningIcon className="h-4 w-4"/>
      <AlertTitle>Care !</AlertTitle>
      <AlertDescription>
        These actions are asynchronous and will be executed concurrently.
      </AlertDescription>
    </Alert>

    <div className={"space-y-6"}>
      <div className={"space-y-6"}>
        <div className={"flex flex-col md:flex-row space-y-2 md:space-x-0 items-center justify-between space-x-2"}>
          <div>
            <p className="text-lg font-semibold">On parted download callbacks</p>
            <p className="text-sm text-slate-500">Actions to be executed when a video part is downloaded</p>
          </div>
          <NewActionDialog onSave={
            (data) => {
              toast({
                title: "You submitted the following values:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
              </pre>
                ),
              })
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
                  } onEdit={e => updateItem(index, e)}/>
                </div>
            ))
          }
        </div>

      </div>
      <div className={"space-y-6"}>
        <div className={"flex flex-col md:flex-row space-y-2 md:space-x-0 items-center justify-between space-x-2"}>
          <div>
            <p className="text-lg font-semibold">On Stream ended callbacks</p>
            <p className="text-sm text-slate-500">Actions to be executed when a streamer has ended</p>
          </div>
          <NewActionDialog onSave={
            (data) => {
              toast({
                title: "You submitted the following values:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
              </pre>
                ),
              })
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
                  } onEdit={e => updateItemEnded(index, e)}/>
                </div>
            ))
          }
        </div>

      </div>

    </div>

  </div>
}