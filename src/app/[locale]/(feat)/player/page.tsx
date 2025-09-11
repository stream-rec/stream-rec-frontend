"use client"

import { usePlayerStore } from "@/src/lib/stores/player-store"
import { useEffect, useRef, useCallback } from "react"
import { useRouter } from "@/src/i18n/routing"
import type Artplayer from "artplayer"
import type Hls from "hls.js"
import { ContentLayout } from "@/src/components/dashboard/content-layout"
import { MediaInfo, StreamInfo } from "@/src/lib/data/mediainfo/definitions"
import { encodeParams } from "@/src/lib/utils/proxy"
import { getTrueUrl } from "@/src/lib/data/mediainfo/extractor-apis"
import { BASE_PATH } from "@/src/lib/routes"
import type { PlayerSource } from "@/src/lib/stores/player-store"

// Utility function to find stream by URL
const findStreamByUrl = (streams: StreamInfo[], url: string) => {
	return streams.find(stream => stream.url === url)
}

// Utility function to handle stream switching
const handleStreamSwitch = async (
	streamInfo: StreamInfo | null,
	url: string,
	mediaInfo: MediaInfo | null
): Promise<StreamInfo | null> => {
	if (!streamInfo) return null

	// fix cases when switching quality
	if (streamInfo.url !== url) {
		const stream = findStreamByUrl(mediaInfo?.streams || [], url)
		if (stream) {
			return stream
		}
	}
	return streamInfo
}

// Utility function to get proxy URL
const getProxyUrlForStream = async (
	streamInfo: StreamInfo,
	source: PlayerSource | null,
	buildProxyUrl: (url: string) => string,
	getUrlAndSwitch: (streamInfo: StreamInfo, art: Artplayer) => Promise<string | null>,
	art: Artplayer
): Promise<string | null> => {
	let proxyUrl: string | null = streamInfo.url

	if (source?.type === "server-file") {
		// check if the url is already a proxy url
		if (!streamInfo.url.startsWith("/api/proxy")) {
			proxyUrl = buildProxyUrl(streamInfo.url)
		}
	} else {
		proxyUrl = await getUrlAndSwitch(streamInfo, art)
		if (!proxyUrl) {
			art.notice.show = "Error getting true url"
			return null
		}
	}
	return proxyUrl
}

// Common player configuration
const getCommonPlayerConfig = (isLive: boolean) => ({
	autoCleanupSourceBuffer: true,
	autoCleanupMaxBackwardDuration: 2 * 60,
	lazyLoad: isLive,
	lazyLoadMaxDuration: 5 * 60, // 5 minutes
	enableStashBuffer: false,
	stashInitialSize: 128,
})

export default function PlayerPage() {
	const { source, mediaInfo, headers } = usePlayerStore()
	const router = useRouter()
	const artRef = useRef<HTMLDivElement>(null)
	const mpegts = useRef<any>(null)
	const playerRef = useRef<Artplayer | null>(null)

	// Consolidated player state
	const playerState = useRef({
		cdn: "",
		format: "",
		bitrate: 0,
		streamInfo: null as StreamInfo | null,
	})

	const buildProxyUrl = useCallback(
		(url: string) => {
			const encodedParams = encodeParams(url, headers)
			return `${BASE_PATH}/api/proxy?data=${encodedParams}`
		},
		[headers]
	)

	const getUrlAndSwitch = useCallback(
		async (streamInfo: StreamInfo, art: Artplayer) => {
			try {
				const newInfo = await getTrueUrl(source!.url!, streamInfo)
				return newInfo ? buildProxyUrl(newInfo.url) : null
			} catch (error) {
				art.notice.show = "Error getting true url"
				return null
			}
		},
		[source, buildProxyUrl]
	)

	const destroyFlvPlayer = (art: Artplayer) => {
		try {
			if (art.flv) {
				;(art.flv as any).destroy()
				art.flv = null
				console.log("flv player destroyed")
			}
		} catch (error) {
			console.error("Error destroying FLV player:", error)
		}
	}

	const destroyTsPlayer = (art: Artplayer) => {
		try {
			if (art.ts) {
				;(art.ts as any).destroy()
				art.ts = null
				console.log("ts player destroyed")
			}
		} catch (error) {
			console.error("Error destroying TS player:", error)
		}
	}

	const getQualities = useCallback(
		(format: string, cdn: string | undefined) => {
			if (!mediaInfo?.streams) return undefined

			if (mediaInfo.streams.length === 1) {
				return [
					{
						default: true,
						html: `${mediaInfo.streams[0].quality || "Default"}`,
						url: mediaInfo.streams[0].url,
					},
				]
			}

			return mediaInfo.streams
				.filter(stream => stream.format === format && (!cdn || cdn === "" || stream.extras?.cdn === cdn))
				.map((stream: StreamInfo) => ({
					default: stream.url === mediaInfo.streams![0].url,
					html: `${stream.quality || "Default"}`,
					url: stream.url,
				}))
		},
		[mediaInfo]
	)

	const playFlv = useCallback(
		async (video: HTMLVideoElement, streamInfo: StreamInfo | null, url: string, art: Artplayer) => {
			if (!mpegts.current.isSupported()) {
				art.notice.show = "Unsupported playback format : flv"
				return
			}

			destroyFlvPlayer(art)

			if (!streamInfo) {
				art.notice.show = "No stream info"
				return
			}

			const updatedStreamInfo = await handleStreamSwitch(streamInfo, url, mediaInfo)
			if (!updatedStreamInfo) return

			const proxyUrl = await getProxyUrlForStream(updatedStreamInfo, source, buildProxyUrl, getUrlAndSwitch, art)
			if (!proxyUrl) return

			const flv = mpegts.current.createPlayer(
				{
					type: "flv",
					url: proxyUrl,
					isLive: true,
					cors: true,
				},
				{
					...getCommonPlayerConfig(source?.type === "stream"),
				}
			)

			flv.attachMediaElement(video)
			flv.load()
			flv.play()
			art.flv = flv
			flv.on("error", () => {
				console.log("error", flv.error)
				art.notice.show = "Error playing flv"
			})
			art.on("destroy", () => destroyFlvPlayer(art))
		},
		[buildProxyUrl, getUrlAndSwitch, mediaInfo, source]
	)

	const playTs = useCallback(
		async (video: HTMLVideoElement, streamInfo: StreamInfo | null, url: string, art: Artplayer) => {
			if (!mpegts.current.isSupported()) {
				art.notice.show = "Unsupported playback format : ts"
				return
			}

			destroyTsPlayer(art)

			if (!streamInfo) {
				art.notice.show = "No stream info"
				return
			}

			const updatedStreamInfo = await handleStreamSwitch(streamInfo, url, mediaInfo)
			if (!updatedStreamInfo) return

			const proxyUrl = await getProxyUrlForStream(updatedStreamInfo, source, buildProxyUrl, getUrlAndSwitch, art)
			if (!proxyUrl) return

			const ts = mpegts.current.createPlayer(
				{
					type: "mpegts",
					url: proxyUrl,
					isLive: source?.type === "stream",
					cors: true,
				},
				{
					...getCommonPlayerConfig(source?.type === "stream"),
				}
			)

			ts.attachMediaElement(video)
			ts.load()
			ts.play()
			art.ts = ts
			art.on("destroy", () => destroyTsPlayer(art))
		},
		[buildProxyUrl, getUrlAndSwitch, mediaInfo, source]
	)

	const playM3U8 = useCallback(
		async (video: HTMLVideoElement, streamInfo: StreamInfo | null, url: string, art: Artplayer) => {
			destroyFlvPlayer(art)
			destroyTsPlayer(art)

			if (!streamInfo) {
				art.notice.show = "No stream info"
				return
			}

			const updatedStreamInfo = await handleStreamSwitch(streamInfo, url, mediaInfo)
			if (!updatedStreamInfo) return

			const proxyUrl = await getProxyUrlForStream(updatedStreamInfo, source, buildProxyUrl, getUrlAndSwitch, art)
			if (!proxyUrl) {
				return
			}

			const Hls = (await import("hls.js")).default
			if (Hls.isSupported()) {
				if (art.hls) {
					;(art.hls as Hls).destroy()
					art.hls = null
				}

				const hls = new Hls()
				hls.loadSource(proxyUrl)
				hls.attachMedia(video)
				art.hls = hls
				art.on("destroy", () => {
					;(hls as Hls).destroy()
					art.hls = null
					console.log("hls player destroyed")
				})
			} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
				video.src = proxyUrl
			} else {
				art.notice.show = "Unsupported playback format : m3u8"
			}
		},
		[buildProxyUrl, getUrlAndSwitch, mediaInfo, source]
	)

	const playMp4 = useCallback(
		async (video: HTMLVideoElement, streamInfo: StreamInfo | null, url: string, art: Artplayer) => {
			destroyFlvPlayer(art)
			destroyTsPlayer(art)

			if (!streamInfo) {
				art.notice.show = "No stream info"
				return
			}

			const updatedStreamInfo = await handleStreamSwitch(streamInfo, url, mediaInfo)
			if (!updatedStreamInfo) return

			const proxyUrl = await getProxyUrlForStream(updatedStreamInfo, source, buildProxyUrl, getUrlAndSwitch, art)
			if (!proxyUrl) {
				return
			}
			video.src = proxyUrl
		},
		[buildProxyUrl, getUrlAndSwitch, mediaInfo, source]
	)

	const initializePlayer = useCallback(async () => {
		if (!source || !artRef.current || !mediaInfo) return null

		const Artplayer = (await import("artplayer")).default

		if (typeof window !== "undefined") {
			mpegts.current = require("mpegts.js")
		}

		let initialStream
		const customTypeHandlers = {
			flv: (video: HTMLVideoElement, url: string, art: Artplayer) => {
				playFlv(video, playerState.current.streamInfo, url, art)
			},
			m3u8: (video: HTMLVideoElement, url: string, art: Artplayer) => {
				playM3U8(video, playerState.current.streamInfo, url, art)
			},
			mp4: (video: HTMLVideoElement, url: string, art: Artplayer) => {
				playMp4(video, playerState.current.streamInfo, url, art)
			},
			ts: (video: HTMLVideoElement, url: string, art: Artplayer) => {
				playTs(video, playerState.current.streamInfo, url, art)
			},
		}

		if (source.type === "stream" && mediaInfo?.streams) {
			initialStream = mediaInfo.streams.find(stream => stream.extras?.cdn) || mediaInfo.streams[0]
		} else if (source.type === "server-file") {
			initialStream = mediaInfo!.streams![0]
		}

		if (!initialStream) return null

		const state = playerState.current

		state.cdn = initialStream.extras?.cdn || ""
		state.format = initialStream.format
		state.bitrate = initialStream.bitrate || 0
		state.streamInfo = initialStream

		console.log("state", state)

		let controls: any[] = []
		let settings: any[] = []

		if (source.type === "server-file") {
			controls = []
		} else {
			settings = [
				{
					html: "Format",
					selector: [...new Set(mediaInfo!.streams!.map(stream => stream.format))].map((format: string) => ({
						html: format.toUpperCase(),
						value: format,
						default: format === state.format,
					})),
					onSelect: async (item: { html: string; value: string }) => {
						console.log("onSelect", item)
						let newStream = mediaInfo!.streams!.find(
							(stream: StreamInfo) =>
								stream.format === item.value &&
								(!state.cdn || state.cdn === "" || stream.extras?.cdn === state.cdn) &&
								(stream.bitrate === state.bitrate || !stream.bitrate)
						)

						// if the stream is not found, try to find the next stream with the same format and cdn
						if (!newStream) {
							newStream = mediaInfo!.streams!.find(
								(stream: StreamInfo) =>
									stream.format === item.value && (!state.cdn || state.cdn === "" || stream.extras?.cdn === state.cdn)
							)
						}

						console.log("newStream", newStream)

						if (newStream) {
							console.log("switching to", newStream)
							state.format = item.value
							state.bitrate = newStream.bitrate
							if (newStream.extras?.cdn) {
								state.cdn = newStream.extras?.cdn
							}
							state.streamInfo = newStream

							// clear qualities
							art.quality = []

							let finalFormat = newStream.format
							if (finalFormat === "hls") {
								finalFormat = "m3u8"
							}

							art.type = finalFormat

							art
								.switchQuality(newStream.url)
								.then(() => {
									const newQualities = getQualities(item.value, state.cdn)
									if (newQualities && art) {
										art.quality = newQualities
									}
								})
								.catch((error: any) => {
									console.error("Error switching to ", item.value, error)
								})
						}
						return item.html
					},
				},
			]

			// Only add CDN control if there are streams with CDNs
			if (mediaInfo!.streams!.some(stream => stream.extras?.cdn)) {
				controls.push({
					position: "right",
					html: state.cdn || "Default CDN",
					index: 1,
					style: {
						marginRight: "20px",
					},
					selector: [
						...new Set(
							mediaInfo!
								.streams!.filter(stream => stream.format === state.format)
								.map(stream => stream.extras?.cdn || "Default")
						),
					].map((cdn: string) => ({
						html: cdn,
						value: cdn === "Default" ? "" : cdn,
						default: (cdn === "Default" && !state.cdn) || cdn === state.cdn,
					})),
					onSelect: async (item: { html: string; value: string }) => {
						let newStream = mediaInfo!.streams!.find(
							(stream: StreamInfo) =>
								stream.format === state.format &&
								((!item.value && !stream.extras?.cdn) || stream.extras?.cdn === item.value) &&
								(stream.bitrate === state.bitrate || !stream.bitrate)
						)

						if (!newStream) {
							newStream = mediaInfo!.streams!.find(
								(stream: StreamInfo) =>
									stream.format === state.format &&
									((!item.value && !stream.extras?.cdn) || stream.extras?.cdn === item.value)
							)
						}

						if (newStream) {
							state.cdn = item.value
							state.bitrate = newStream.bitrate || 0
							state.streamInfo = newStream

							art.quality = []
							await art.switchQuality(newStream.url)
							const newQualities = getQualities(state.format, item.value)
							if (newQualities && art) {
								art.quality = newQualities
							}
						}
						return item.html
					},
				})
			}
		}

		let proxyUrl = initialStream.url
		if (source.type === "server-file") {
			console.log("building proxy url for server file", initialStream.url)
			proxyUrl = buildProxyUrl(initialStream.url)
			console.log("proxy url", proxyUrl)
		}

		let finalFormat: string = state.format

		if (finalFormat === "hls") {
			finalFormat = "m3u8"
		}

		const art = new Artplayer({
			container: artRef.current,
			url: proxyUrl,
			customType: customTypeHandlers,
			type: finalFormat,
			volume: 0.3,
			isLive: source.type === "stream",
			muted: false,
			autoplay: false,
			pip: true,
			autoSize: true,
			autoMini: true,
			screenshot: false,
			setting: true,
			settings: settings,
			loop: true,
			flip: true,
			playbackRate: true,
			aspectRatio: true,
			fullscreen: true,
			fullscreenWeb: true,
			subtitleOffset: true,
			miniProgressBar: true,
			mutex: true,
			backdrop: true,
			playsInline: true,
			autoPlayback: true,
			airplay: true,
			useSSR: false,
			quality: getQualities(state.format, state.cdn),
			lang: navigator.language.toLowerCase(),
			controls: controls,
		})

		playerRef.current = art
		return art
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buildProxyUrl, getQualities, getUrlAndSwitch, mediaInfo, playFlv, playM3U8, playMp4, playTs, source])

	useEffect(() => {
		if (!source) {
			router.back()
			return
		}

		// Only require mediaInfo for streaming sources
		if (source.type === "stream" && (!mediaInfo?.streams || !headers)) {
			router.back()
			return
		}

		initializePlayer()

		return () => {
			if (playerRef.current) {
				console.log("destroying player...")
				playerRef.current.destroy(false)
				playerRef.current = null
				console.log("player destroyed")
			}
		}
	}, [headers, initializePlayer, mediaInfo, router, source])

	if (!source || (source.type === "stream" && (!mediaInfo?.streams || !headers))) {
		return null
	}

	return (
		<ContentLayout title='Player'>
			<div ref={artRef} className='mx-auto aspect-video w-full max-w-[1280px] sm:w-[98%] md:w-[95%] lg:w-[90%]' />
		</ContentLayout>
	)
}
