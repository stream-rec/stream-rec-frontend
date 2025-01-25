import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/src/components/new-york/ui/dropdown-menu";
import { Button } from "@/src/components/new-york/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Link, useRouter } from "@/src/i18n/routing";
import { toast } from "sonner";
import { StreamData } from "@/src/lib/data/streams/definitions";
import { useTranslations } from "next-intl";
import { usePlayerStore } from "@/src/lib/stores/player-store";
import { BASE_PATH } from "@/src/lib/routes";
import { encodeParams } from "@/src/lib/utils/proxy";
import { md5 } from "@/src/lib/utils";
import { checkFileExists } from "@/src/lib/data/files/files-api";


type RecordTableActionColumnProps = {
  data: StreamData
  deleteStream: (id: string) => Promise<void>
}

export function RecordTableActionColumn({ data, deleteStream }: RecordTableActionColumnProps) {

  const router = useRouter()
  const setSource = usePlayerStore(state => state.setSource)
  const setMediaInfo = usePlayerStore(state => state.setMediaInfo)


  const t = useTranslations("Actions")
  const u = useTranslations("RecordsPage")

  const handleWatch = async () => {

    const fileName = data.outputFilePath.split(/[/\\]/).pop() || `${data.id}.mp4`
    const format = fileName.split('.').pop()
    const hashedFileName = md5(data.outputFilePath) + '.' + format

    const exists = await checkFileExists(data.id.toString(), hashedFileName)
    if (!exists) {
      toast.error("File does not exist")
      return
    }


    setSource({
      type: 'server-file',
      recordId: data.id.toString(),
      url: `/files/${data.id}/`
    })


    const mediaInfo = {
      site: "local",
      title: data.title,
      artist: data.streamerName,
      live: false,
      streams: [{
        url: `/files/${data.id}/${hashedFileName}`,
        format: format || 'mp4',
        quality: '',
        bitrate: 0,
      }]
    }

    console.log("mediaInfo", mediaInfo)
    setMediaInfo(mediaInfo, {})
    router.push('/player')
  }

  const buildProxyUrl = (url: string) => {
    const encodedParams = encodeParams(url, {});
    return `${BASE_PATH}/api/proxy?data=${encodedParams}`;
  }

  const handleDownload = async () => {
    const fileName = data.outputFilePath.split(/[/\\]/).pop() || `${data.id}.mp4`
    const format = fileName.split('.').pop()
    const hashedFileName = md5(data.outputFilePath) + '.' + format

    // Check if video file exists before attempting download
    const exists = await checkFileExists(data.id.toString(), hashedFileName)
    if (!exists) {
      toast.error("File does not exist")
      return
    }

    // download the video file
    const videoProxyUrl = buildProxyUrl(`/files/${data.id}/${hashedFileName}`)

    // Create a temporary link element for video
    const videoLink = document.createElement('a')
    videoLink.href = videoProxyUrl
    videoLink.download = fileName  // Use original filename for download
    videoLink.target = '_blank'

    // Trigger the video download
    document.body.appendChild(videoLink)
    videoLink.click()
    document.body.removeChild(videoLink)

    // Check if danmu file exists
    const danmuFileName = hashedFileName.replace(/\.[^/.]+$/, "") + ".xml"
    const danmuExists = await checkFileExists(data.id.toString(), danmuFileName)

    if (danmuExists) {
      // download the danmu file
      const danmuProxyUrl = buildProxyUrl(`/files/${data.id}/${danmuFileName}`)

      // Create a temporary link element for danmu
      const danmuLink = document.createElement('a')
      danmuLink.href = danmuProxyUrl
      danmuLink.download = fileName.replace(/\.[^/.]+$/, "") + ".xml"  // Use original filename base with .xml extension
      danmuLink.target = '_blank'

      // Trigger the danmu download
      setTimeout(() => {
        document.body.appendChild(danmuLink)
        danmuLink.click()
        document.body.removeChild(danmuLink)
      }, 1000)  // Add a delay to prevent browser from blocking multiple downloads
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{t('openMenu')}</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
          <DropdownMenuItem onSelect={handleWatch}>
            {t('watch')}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleDownload}>
            {t('download')}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/streamers/" + data.streamerId + "/edit"}>
              {u('viewStreamerDetails')}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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