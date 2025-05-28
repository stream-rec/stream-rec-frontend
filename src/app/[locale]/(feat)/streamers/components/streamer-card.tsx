"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/new-york/ui/card"
import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/new-york/ui/avatar"
import { cn } from "@/src/lib/utils"
import { clsx } from "clsx"
import { Badge } from "@/src/components/new-york/ui/badge"
import { Button } from "@/src/components/new-york/ui/button"
import { PauseIcon, PlayIcon, SettingsIcon, Trash2Icon, UserRoundCog } from "lucide-react"
import { Separator } from "@/src/components/new-york/ui/separator"
import { Link, useRouter } from "@/src/i18n/routing"
import { toast } from "sonner"
import { DeleteIconDialog } from "@/src/app/components/dialog/delete-icon-dialog"
import {
	OpenVideoContextMenu,
	OpenVideoContextMenuStrings,
} from "@/src/app/[locale]/(feat)/streamers/components/open-video-context-menu"
import Marquee from "react-fast-marquee"
import { updateState } from "@/src/lib/data/streams/streamer-apis"
import { StreamerState } from "@/src/lib/data/streams/definitions"

export type StreamerCardProps = {
	streamer: string
	description?: string | null
	streamerId: number
	streamerAvatar?: string | null
	state: StreamerState
	lastStream?: string | null
	platform: string
	template?: string | null
	bitrate?: string | null
	duration?: string | null
	liveUrl: string
	downloadUrl?: string
	contextMenuStrings: OpenVideoContextMenuStrings
	updateStatus: (id: string, status: StreamerState) => ReturnType<typeof updateState>
	deleteStreamer: (id: string) => Promise<void>
}

export function StreamerCard({
	streamer,
	description,
	streamerId,
	streamerAvatar,
	state,
	lastStream,
	platform,
	template,
	bitrate,
	duration,
	downloadUrl,
	liveUrl,
	contextMenuStrings,
	updateStatus,
	deleteStreamer,
}: StreamerCardProps) {
	const router = useRouter()

	// description marquee hover state
	const [isHovered, setIsHovered] = useState(false)

	function openUrl(liveUrl: string) {
		// open a new tab with the liveUrl
		return () => {
			window.open(liveUrl, "_blank")
		}
	}

	return (
		<>
			<Card>
				<div className={"mr-2 flex flex-row items-center justify-end space-x-0.5 md:space-x-1"}>
					{duration && (
						<>
							{" "}
							<p className={"text-[0.70rem] text-muted-foreground"}>{duration}</p>
						</>
					)}
					<Button variant='ghost' size='icon' className='rounded-full p-2'>
						{state !== StreamerState.CANCELLED ? (
							<PauseIcon
								className='h-4 w-4'
								onClick={async () => {
									toast.promise(updateStatus(streamerId.toString(), StreamerState.CANCELLED), {
										loading: `Updating ${streamer}...`,
										success: () => {
											router.refresh()
											return "Ok"
										},
										error: error => `An error occurred while updating streamer: ${error}`,
									})
								}}
							/>
						) : (
							<PlayIcon
								className='h-4 w-4'
								onClick={async () => {
									toast.promise(updateStatus(streamerId.toString(), StreamerState.NOT_LIVE), {
										loading: `Updating ${streamer}...`,
										success: () => {
											router.refresh()
											return "Ok"
										},
										error: error => `An error occurred while updating streamer: ${error}`,
									})
								}}
							/>
						)}
					</Button>
					<Separator orientation={"vertical"} className={"h-4"} />

					<Link href={`/streamers/${streamerId}/edit`}>
						<Button variant={"ghost"} size={"icon"} className={"rounded-full p-2"}>
							<SettingsIcon className={"h-4 w-4"} />
						</Button>
					</Link>
					<Separator orientation={"vertical"} className={"h-4"} />
					<DeleteIconDialog
						icon={
							<Button variant={"ghost"} size={"icon"} className={"rounded-full p-2"}>
								<Trash2Icon className={"h-4 w-4"} />
							</Button>
						}
						onDelete={async () => {
							toast.promise(deleteStreamer(streamerId.toString()), {
								loading: `Deleting ${streamer}...`,
								success: () => {
									router.refresh()
									return "Streamer deleted"
								},
								error: error => `An error occurred while deleting streamer : ${error}`,
							})
						}}
					/>
				</div>
				<CardHeader className={"pb-3 pt-0 lg:pb-6"}>
					<div className={"items-center space-y-4 md:flex md:flex-row md:space-x-2.5 md:space-y-0"}>
						{downloadUrl && (
							<OpenVideoContextMenu url={downloadUrl} streamerUrl={liveUrl} string={contextMenuStrings}>
								<Avatar onClick={openUrl(liveUrl)} className={"cursor-pointer"}>
									<AvatarImage src={streamerAvatar ?? ""} alt={streamer}></AvatarImage>
									<AvatarFallback>
										<UserRoundCog />
									</AvatarFallback>
								</Avatar>
							</OpenVideoContextMenu>
						)}{" "}
						{!downloadUrl && (
							<Avatar>
								<AvatarImage src={streamerAvatar ?? ""} alt={streamer}></AvatarImage>
								<AvatarFallback>
									<UserRoundCog />
								</AvatarFallback>
							</Avatar>
						)}
						<div className={"flex flex-col space-y-1 overflow-hidden text-nowrap"}>
							<div className={"relative flex flex-row items-center gap-x-1 space-x-2.5"}>
								<CardTitle
									className={clsx(cn("line-clamp-1 2xl:text-sm"), {
										"md:self-center": description,
									})}
								>
									{streamer}
								</CardTitle>
							</div>
							{description && (
								<div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
									<Marquee className={"text-[0.75rem] text-muted-foreground md:text-sm"} speed={55} play={isHovered}>
										<p className={"pr-2"}>{description}</p>
									</Marquee>
								</div>
							)}
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className='mr-2 flex flex-row items-center gap-x-1.5'>
						{!template && (
							<>
								<Badge variant={"default"}>{platform}</Badge>
								<Badge
									variant={state === StreamerState.NOT_FOUND || state === StreamerState.NO_SPACE ? "destructive" : "secondary"}
									className={"line-clamp-1"}
								>
									{bitrate ? `${bitrate} kbps` : lastStream}
								</Badge>
							</>
						)}
						{template && <Badge variant={"default"}>{template}</Badge>}
					</div>
				</CardContent>
			</Card>
		</>
	)
}
