import { toast } from "sonner"
import { extractMediaInfo } from "@/src/lib/data/mediainfo/extractor-apis"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { MediaInfo } from "@/src/lib/data/mediainfo/definitions"
import { PlayerSource } from "@/src/lib/stores/player-store"

type PlayerStoreActions = {
	setMediaInfo: (mediaInfo: MediaInfo, headers: Record<string, string>) => void
	setSource: (source: PlayerSource) => void
}

export async function handleStreamPlay(
	url: string,
	router: AppRouterInstance,
	{ setMediaInfo, setSource }: PlayerStoreActions
) {
	const t = toast.promise(extractMediaInfo(url), {
		loading: "Extracting media info...",
		error: error => toast.error(error.message),
	})

	try {
		const response = await t.unwrap()
		const mediaInfo = response.data

		if (!mediaInfo.live) {
			toast.error("Stream is not live")
			return
		}

		const headers = response.headers ?? {}

		// Store the data in Zustand
		setMediaInfo(mediaInfo, headers)
		setSource({
			type: "stream",
			url: url,
		})

		// Navigate to player page
		router.push("/player")
	} catch (error) {
		// Error is already handled by toast.promise
	}
}
