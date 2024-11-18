import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/src/components/new-york/ui/dropdown-menu";
import {Button} from "@/src/components/new-york/ui/button";
import {MoreHorizontal} from "lucide-react";
import {UploadData, UploadStatus} from "@/src/lib/data/uploads/definitions";
import {toast} from "sonner";
import {useTranslations} from "next-intl";
import {Link, useRouter} from "@/src/i18n/routing";

type UploadActionColumnProps = {
  data: UploadData
  retryUpload: (id: string) => Promise<void>
  deleteUpload: (id: string) => Promise<void>
}

export function UploadActionColumn({data, retryUpload, deleteUpload}: UploadActionColumnProps) {

  const router = useRouter()

  const t = useTranslations("Actions")
  const u = useTranslations("UploadsPage")

  function retry(id: string) {
    toast.promise(retryUpload(id), {
      loading: t('retrying'),
      success: () => {
        router.refresh()
        return t('retried')
      },
      error: (e) => `${t('retryError')}: ${(e as Error).message}`
    })
  }


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

          {
              Number(UploadStatus[data.status]) === UploadStatus.FAILED &&
              <>
                  <DropdownMenuItem onClick={() => retry(data.id.toString())}>
                    {t('retry')}
                      <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator/>
              </>
          }


          <DropdownMenuItem><Link href={"/uploads/" + data.id}>{u('viewUploadDetails')}</Link></DropdownMenuItem>
          <DropdownMenuItem><Link
              href={"/records/" + data.streamDataId}>{u('viewStreamDetails')}</Link></DropdownMenuItem>
          <DropdownMenuItem><Link
              href={"/streamers/" + data.streamerId + "/edit"}>{u('viewStreamerDetails')}</Link></DropdownMenuItem>

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
