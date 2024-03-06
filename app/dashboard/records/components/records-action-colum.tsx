'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/new-york/ui/dropdown-menu";
import {Button} from "@/components/new-york/ui/button";
import {MoreHorizontal} from "lucide-react";
import Link from "next/link";
import {toast} from "sonner";
import {deleteStream} from "@/app/lib/data/streams/stream-apis";
import {useRouter} from "next/navigation";
import {StreamData} from "@/app/lib/data/streams/definitions";


type RecordTableActionColumnProps = {
  data: StreamData
}

export function RecordTableActionColumn( {data}: RecordTableActionColumnProps) {

  const router = useRouter()

  return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={"/dashboard/streamers/" + data.streamerId + "/edit"}>
                View streamer details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={
              async () => {
                toast.promise(deleteStream(data.id.toString()), {
                  loading: "Deleting stream...",
                  success: () => {
                    router.refresh()
                    return "Stream deleted";
                  },
                  error: (e) => "Error deleting stream: " + (e as Error).message
                })
              }
            }>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
  )
}