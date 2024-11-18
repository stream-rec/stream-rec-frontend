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
import {Link, useRouter} from "@/src/i18n/routing";
import {toast} from "sonner";
import {StreamData} from "@/src/lib/data/streams/definitions";
import {useTranslations} from "next-intl";


type RecordTableActionColumnProps = {
  data: StreamData
  deleteStream: (id: string) => Promise<void>
}

export function RecordTableActionColumn({data, deleteStream}: RecordTableActionColumnProps) {

  const router = useRouter()

  const t = useTranslations("Actions")
  const u = useTranslations("RecordsPage")

  return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">{t('openMenu')}</span>
              <MoreHorizontal className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={"/streamers/" + data.streamerId + "/edit"}>
                {u('viewStreamerDetails')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={
              async () => {
                toast.promise(deleteStream(data.id.toString()), {
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
      </>
  )
}