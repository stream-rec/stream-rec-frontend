import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuShortcut,
	ContextMenuTrigger,
} from "@/src/components/new-york/ui/context-menu"
import React from "react"
import Image from "next/image"
import { useMediaQuery } from "@/src/app/hooks/use-media-query"
import { useRouter } from "@/src/i18n/routing"
import { BASE_PATH } from "@/src/lib/routes"
import { usePlayerStore } from "@/src/lib/stores/player-store"
import { handleStreamPlay } from "@/src/lib/utils/stream-player"

type OpenVideoContextMenuProps = {
	children: React.ReactNode
	url: string
	streamerUrl: string
	string: OpenVideoContextMenuStrings
}

export type OpenVideoContextMenuStrings = {
	download: string
	openWithPotPlayer: string
}

type IntentSchema = {
	url: string
	title: string
	icon?: string | React.ReactNode
	alt?: string
	target?: string
	showOnMobile: boolean
	ShowOnDesktop: boolean
	action?: () => Promise<void>
}

export function OpenVideoContextMenu({ children, url, streamerUrl, string }: OpenVideoContextMenuProps) {
	const isMobile = useMediaQuery("(max-width: 640px)")

	const router = useRouter()
	const setMediaInfo = usePlayerStore(state => state.setMediaInfo)
	const setSource = usePlayerStore(state => state.setSource)

	const getIconPath = (path: string) => {
		return `${BASE_PATH}${path}`
	}

	const handleWatchInPlayer = async () => {
		await handleStreamPlay(streamerUrl, router, { setMediaInfo, setSource })
	}

	const intentSchemas = [
		{
			url: "",
			title: string.download,
			target: "_blank",
			alt: "download icon",
			ShowOnDesktop: true,
			showOnMobile: true,
		},
		{
			url: "",
			title: string.openWithPotPlayer.replace("PotPlayer", "Parser"),
			target: undefined,
			alt: "Open with Parser",
			action: handleWatchInPlayer,
			ShowOnDesktop: true,
			showOnMobile: true,
		},
		{
			url: "potplayer://$durl",
			title: string.openWithPotPlayer,
			icon: getIconPath("/icons/potplayer.svg"),
			alt: "potplayer icon",
			ShowOnDesktop: true,
			showOnMobile: false,
		},
		{
			url: "intent:$durl#Intent;package=com.mxtech.videoplayer.ad;S.title=$name;end",
			title: string.openWithPotPlayer.replace("PotPlayer", "MxPlayer"),
			icon: getIconPath("/icons/mxplayer.svg"),
			alt: "MX Player icon",
			ShowOnDesktop: false,
			showOnMobile: true,
		},
		{
			url: "intent:$durl#Intent;package=com.mxtech.videoplayer.pro;S.title=$name;end",
			title: string.openWithPotPlayer.replace("PotPlayer", "MxPlayer Pro"),
			icon: getIconPath("/icons/mxplayer.svg"),
			alt: "MX Player icon",
			ShowOnDesktop: false,
			showOnMobile: true,
		},
	] as IntentSchema[]

	function openUrl(prefixUrl: string, target: string | undefined, action?: () => Promise<void>) {
		if (action) {
			return action()
		}
		if (prefixUrl.includes("playground")) {
			return router.push(prefixUrl)
		}
		return window.open(prefixUrl.replace("$durl", url), target)
	}

	const filteredIntents = React.useMemo(() => {
		return intentSchemas.filter(intent => {
			return (isMobile && intent.showOnMobile) || (!isMobile && intent.ShowOnDesktop)
		})
	}, [isMobile])

	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent className='w-64'>
				{filteredIntents.map((intent, index) => (
					<ContextMenuItem key={index} inset onClick={() => openUrl(intent.url, intent.target, intent.action)}>
						{intent.title}
						{intent.icon && (
							<ContextMenuShortcut>
								{typeof intent.icon === "string" ? (
									<Image src={intent.icon} alt={intent.alt || ""} width={24} height={24} />
								) : (
									intent.icon
								)}
							</ContextMenuShortcut>
						)}
					</ContextMenuItem>
				))}
			</ContextMenuContent>
		</ContextMenu>
	)
}
