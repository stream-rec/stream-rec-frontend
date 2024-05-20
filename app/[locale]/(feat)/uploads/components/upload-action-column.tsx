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
import {UploadData} from "@/lib/data/uploads/definitions";
import {toast} from "sonner";
import {useTranslations} from "next-intl";
import {Link, useRouter} from "@/i18n";

type UploadActionColumnProps = {
  data: UploadData
  deleteUpload: (id: string) => Promise<void>
}

export function UploadActionColumn({data, deleteUpload}: UploadActionColumnProps) {

  const router = useRouter()

  const t = useTranslations("Actions")
  const u = useTranslations("UploadsPage")

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{t('openMenu')}</span>
            <MoreHorizontal className="h-4 w-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
          <DropdownMenuItem><Link href={"/uploads/" + data.id}>{u('viewUploadDetails')}</Link></DropdownMenuItem>
          <DropdownMenuItem><Link
              href={"/records/" + data.streamDataId}>{u('viewStreamDetails')}</Link></DropdownMenuItem>
          <DropdownMenuItem><Link
              href={"/streamers/" + data.streamerId + "/edit"}>{u('viewStreamerDetails')}</Link></DropdownMenuItem>

          {/* TODO - add re-upload functionality
          {!data.status && <div>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>Re-upload</DropdownMenuItem>
          </div>
          }
*/}
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={
            async () => {
              toast.promise(deleteUpload(data.id.toString(),), {
                loading: t('deleting'),
                success: () => {
                  router.refresh()
                  return t('deleted')
                },
                error: (e) => `${t('deleteError')}: ${(e as Error).message}`
              })
            }
          }>
            {t('delete')}
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
