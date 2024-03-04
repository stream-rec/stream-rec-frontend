import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/new-york/ui/alert-dialog"
import {Button} from "@/components/new-york/ui/button"
import {Trash2Icon} from "lucide-react";
import React from "react";

type StreamerDeleteDialogProps = {
  onConfirm: () => void;
}

export function StreamerDeleteDialog({onConfirm}: StreamerDeleteDialogProps) {
  return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"} className={"rounded-full p-2"}><Trash2Icon
              className={"w-4 h-4"}/></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this streamer information and all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}
