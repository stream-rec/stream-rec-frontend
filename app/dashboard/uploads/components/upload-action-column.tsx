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
import {UploadData} from "@/app/lib/data/uploads/definitions";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {deleteUpload} from "@/app/lib/data/uploads/upload-apis";

type UploadActionColumnProps = {
  data: UploadData
}

export function UploadActionColumn({data}: UploadActionColumnProps) {

  const router = useRouter()

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>View upload details</DropdownMenuItem>
          <DropdownMenuItem><Link href={"/dashboard/records/" + data.streamDataId}> View stream details</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href={"/dashboard/streamers/" + data.streamerId + "/edit"}> View streamer
            details</Link></DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>Re-upload</DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={
            async () => {
              toast.promise(deleteUpload(data.id.toString()), {
                loading: "Deleting upload...",
                success: () => {
                  router.refresh()
                  return "Upload deleted";
                },
                error: (e) => "Error deleting upload: " + (e as Error).message
              })
            }
          }>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
