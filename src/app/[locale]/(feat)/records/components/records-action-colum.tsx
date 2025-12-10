import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/src/components/new-york/ui/dropdown-menu"
import { Button } from "@/src/components/new-york/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Link, useRouter } from "@/src/i18n/routing"
import { toast } from "sonner"
import { StreamData } from "@/src/lib/data/streams/definitions"
import { useTranslations } from "next-intl"
import { usePlayerStore } from "@/src/lib/stores/player-store"
import { BASE_PATH } from "@/src/lib/routes"
import { encodeParams } from "@/src/lib/utils/proxy"
import { md5 } from "@/src/lib/utils"
import { checkFileExists } from "@/src/lib/data/files/files-api"

type RecordTableActionColumnProps = {
	data: StreamData
	deleteStream: (id: string, deleteLocal: boolean) => Promise<void>
}

const getFileInfo = (outputFilePath: string, id: string) => {
	const fileName = outputFilePath.split(/[/\\]/).pop() || `${id}.mp4`
	const format = fileName.split(".").pop()
	const hashedFileName = md5(outputFilePath) + "." + format
	return { fileName, format, hashedFileName }
}

const verifyFileExists = async (id: string, fileName: string) => {
	const exists = await checkFileExists(id, fileName)
	if (!exists) {
		toast.error("File does not exist")
		return false
	}
	return true
}

export function RecordTableActionColumn({ data, deleteStream }: RecordTableActionColumnProps) {
	const router = useRouter()
	const setSource = usePlayerStore(state => state.setSource)
	const setMediaInfo = usePlayerStore(state => state.setMediaInfo)

	const t = useTranslations("Actions")
	const u = useTranslations("RecordsPage")

	const handleDelete = async () => {
		// Ask user if they want to delete local files
		const deleteLocal = window.confirm(t("deleteLocalFilesConfirm"))
		
		toast.promise(deleteStream(data.id.toString(), deleteLocal), {
			loading: t("deleting"),
			success: () => {
				router.refresh()
				return t("deleted")
			},
			error: e => `${t("deleteError")}: ${(e as Error).message}`,
		})
	}

	const handleWatch = async () => {
		const { format, hashedFileName } = getFileInfo(data.outputFilePath, data.id.toString())
		if (!(await verifyFileExists(data.id.toString(), hashedFileName))) return

		setSource({
			type: "server-file",
			recordId: data.id.toString(),
			url: `/files/${data.id}/`,
		})

		setMediaInfo(
			{
				site: "local",
				title: data.title,
				artist: data.streamerName,
				live: false,
				streams: [
					{
						url: `/files/${data.id}/${hashedFileName}`,
						format: format || "mp4",
						quality: "",
						bitrate: 0,
					},
				],
			},
			{}
		)
		router.push("/player")
	}

	const buildProxyUrl = (url: string) => {
		const encodedParams = encodeParams(url, {})
		return `${BASE_PATH}/api/proxy?data=${encodedParams}`
	}

	const downloadFile = async (url: string, fileName: string): Promise<void> => {
		return new Promise(resolve => {
			const link = document.createElement("a")
			link.href = url
			link.download = fileName
			link.target = "_blank"

			// Use onload to ensure the download starts before resolving
			link.onload = () => {
				document.body.removeChild(link)
				resolve()
			}

			document.body.appendChild(link)
			link.click()
		})
	}

	const handleDownload = async () => {
		const fileName = data.outputFilePath.split(/[/\\]/).pop() || `${data.id}.mp4`
		const format = fileName.split(".").pop()
		const hashedFileName = md5(data.outputFilePath) + "." + format

		// Check if video file exists before attempting download
		const exists = await checkFileExists(data.id.toString(), hashedFileName)
		if (!exists) {
			toast.error(`Video file not found: ${fileName}`)
			return
		}

		try {
			// Download video file
			const videoProxyUrl = buildProxyUrl(`/files/${data.id}/${hashedFileName}`)
			await downloadFile(videoProxyUrl, fileName)

			// Check and download danmu file if it exists
			const danmuFileName = hashedFileName.replace(/\.[^/.]+$/, "") + ".xml"
			const danmuExists = await checkFileExists(data.id.toString(), danmuFileName)

			if (danmuExists) {
				const danmuProxyUrl = buildProxyUrl(`/files/${data.id}/${danmuFileName}`)
				const originalDanmuName = fileName.replace(/\.[^/.]+$/, "") + ".xml"
				await downloadFile(danmuProxyUrl, originalDanmuName)
			}
		} catch (error) {
			toast.error("Download failed: " + (error as Error).message)
		}
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='h-8 w-8 p-0'>
						<span className='sr-only'>{t("openMenu")}</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
					<DropdownMenuItem onSelect={handleWatch}>{t("watch")}</DropdownMenuItem>
					<DropdownMenuItem onSelect={handleDownload}>{t("download")}</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href={"/streamers/" + data.streamerId + "/edit"}>{u("viewStreamerDetails")}</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={handleDelete}
					>
						{t("delete")}
						<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
