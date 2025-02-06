"use client"
import React, { useEffect, useCallback, useMemo, useRef } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/src/components/new-york/ui/collapsible"
import { Button } from "@/src/components/new-york/ui/button"

import { StreamerCardProps } from "@/src/app/[locale]/(feat)/streamers/components/streamer-card"
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons"
import { OpenVideoContextMenuStrings } from "@/src/app/[locale]/(feat)/streamers/components/open-video-context-menu"
import { deleteStreamer, updateState } from "@/src/lib/data/streams/streamer-apis"
import { toastData } from "@/src/app/utils/toast"
import { useRouter } from "@/src/i18n/routing"
import { secondsToHHmmss } from "@/src/app/utils/conversions"
import { wsHeartbeatArray, wsHeartbeatInterval } from "@/src/lib/data/websocket/definitions"
import { toStreamerCard } from "@/src/app/[locale]/(feat)/streamers/utils/streamer-utils"
import { StreamerState } from "@/src/lib/data/streams/definitions"
import { useLiveStreamStore } from "@/src/lib/stores/live-stream-store"

type RecordListProps = {
	title: string
	cards: StreamerCardProps[]
	contextMenuStrings: OpenVideoContextMenuStrings
	wsUrl: string | undefined
	updateStatus: (id: string, status: StreamerState) => ReturnType<typeof updateState>
	deleteStreamerAction: (id: string) => ReturnType<typeof deleteStreamer>
}

export function RecordList({
	cards,
	title,
	contextMenuStrings,
	wsUrl,
	updateStatus,
	deleteStreamerAction,
}: RecordListProps) {
	const [isOpen, setIsOpen] = React.useState(true)

	const router = useRouter()

	const { updates, setUpdate, clearUpdates } = useLiveStreamStore()

	const handleWebSocketMessage = useCallback(
		(event: MessageEvent) => {
			if (event.data instanceof Blob) return

			const data = JSON.parse(event.data)
			const type = data.type as string
			if ("streamerId" in data && "bitrate" in data) {
				setUpdate(data.streamerId, data)
			} else if (type.includes("StreamerOffline") || type.includes("StreamerOnline")) {
				router.refresh()
			}
		},
		[router, setUpdate]
	)

	// Clear bitrates when component unmounts or wsUrl changes
	useEffect(() => {
		return () => {
			clearUpdates()
		}
	}, [wsUrl, clearUpdates])

	useEffect(() => {
		if (!wsUrl) return

		// Move interval reference outside for cleanup
		let heartbeatInterval: NodeJS.Timeout
		let ws: WebSocket

		const connect = () => {
			try {
				ws = new WebSocket(wsUrl)

				ws.onopen = () => {
					console.log("WebSocket connection established")
					heartbeatInterval = setInterval(() => {
						if (ws.readyState === ws.OPEN) {
							ws.send(wsHeartbeatArray)
						}
					}, wsHeartbeatInterval)
				}

				ws.onmessage = handleWebSocketMessage

				ws.onerror = error => {
					console.error("WebSocket error:", error)
				}

				ws.onclose = event => {
					if (event.wasClean) {
						console.log(`WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`)
					} else {
						console.log("WebSocket connection died")
					}
				}
			} catch (e) {
				console.error("WebSocket error:", e)
				toastData("error", "WebSocket connection failed", "info")
			}
		}

		connect()

		return () => {
			clearInterval(heartbeatInterval)
			ws?.close()
		}
	}, [wsUrl, handleWebSocketMessage])

	// Memoize the updated cards with bitrate information
	const updatedCards = useMemo(() => {
		if (!wsUrl || Object.keys(updates).length === 0) return cards

		// Create a Map for O(1) lookup
		const updatesMap = new Map(Object.entries(updates))

		return cards.map(card => {
			const updateData = updatesMap.get(card.streamerId.toString())
			if (!updateData) return card

			return {
				...card,
				bitrate: updateData.bitrate === 0 ? null : updateData.bitrate.toString(),
				duration: secondsToHHmmss(updateData.duration),
				downloadUrl: updateData.url,
			}
		})
	}, [cards, updates, wsUrl])

	const parentRef = useRef<HTMLDivElement>(null)

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen} className='flex h-full flex-col space-y-2'>
			<div className='flex items-center justify-between space-x-4'>
				<h3 className='text-xm font-semibold'> {title}</h3>
				<h3 className='rounded-md bg-muted px-2 py-0.5 text-xs'>{cards.length}</h3>

				<div className={"flex-1"}>
					<CollapsibleTrigger className={"float-end"} asChild>
						<Button variant='ghost' size='sm'>
							{isOpen ? <CaretDownIcon /> : <CaretUpIcon />}
							<span className='sr-only'>Toggle</span>
						</Button>
					</CollapsibleTrigger>
				</div>
			</div>

			<CollapsibleContent className='min-h-0 flex-1'>
				<div ref={parentRef} className='h-full overflow-auto'>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2'>
						{updatedCards.map(card => (
							<React.Fragment key={card.streamerId}>
								{toStreamerCard(card, contextMenuStrings, updateStatus, deleteStreamerAction)}
							</React.Fragment>
						))}
					</div>
				</div>
			</CollapsibleContent>
		</Collapsible>
	)
}
