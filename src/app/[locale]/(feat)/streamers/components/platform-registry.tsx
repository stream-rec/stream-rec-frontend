import React, { lazy, Suspense } from "react"
import { PlatformType } from "@/src/lib/data/platform/definitions"
import { StreamerConfigProps } from "./streamer-form"
import { LoadingSkeleton } from "@/src/components/new-york/ui/loading-skeleton"

// Lazy load platform components
const DouyinPlatform = lazy(() =>
	import("@/src/app/[locale]/(feat)/streamers/components/platforms/douyin-platform").then(mod => ({
		default: mod.DouyinPlatform,
	}))
)

const HuyaPlatform = lazy(() =>
	import("@/src/app/[locale]/(feat)/streamers/components/platforms/huya-platform").then(mod => ({
		default: mod.HuyaPlatform,
	}))
)

const DouyuPlatformForm = lazy(() =>
	import("@/src/app/[locale]/(feat)/streamers/components/platforms/douyu-platform").then(mod => ({
		default: mod.DouyuPlatformForm,
	}))
)

const TwitchPlatformForm = lazy(() =>
	import("@/src/app/[locale]/(feat)/streamers/components/platforms/twitch-platform").then(mod => ({
		default: mod.TwitchPlatformForm,
	}))
)

const PandaTvPlatformForm = lazy(() =>
	import("@/src/app/[locale]/(feat)/streamers/components/platforms/pandalive-platform").then(mod => ({
		default: mod.PandaTvPlatformForm,
	}))
)

const WeiboPlatformForm = lazy(() =>
	import("@/src/app/[locale]/(feat)/streamers/components/platforms/weibo-platform").then(mod => ({
		default: mod.WeiboPlatformForm,
	}))
)

// Loading fallback
const PlatformLoading = () => <LoadingSkeleton />

// Define our platform registry
type PlatformComponentProps = {
	strings: StreamerConfigProps["strings"]
	allowNone?: boolean
}

export type PlatformRegistryItem = {
	component: React.ComponentType<any>
	getProps: (props: PlatformComponentProps) => any
}

// Registry of all available platforms
export const platformRegistry: Record<string, PlatformRegistryItem> = {
	[PlatformType.HUYA]: {
		component: HuyaPlatform,
		getProps: props => ({
			allowNone: props.allowNone,
			strings: props.strings.huyaStrings,
		}),
	},
	[PlatformType.DOUYIN]: {
		component: DouyinPlatform,
		getProps: props => ({
			douyinQualityOptions: props.strings.douyinQualityOptions,
			allowNone: props.allowNone,
			strings: props.strings.douyinStrings,
		}),
	},
	[PlatformType.DOUYU]: {
		component: DouyuPlatformForm,
		getProps: props => ({
			strings: props.strings.douyuStrings,
			allowNone: props.allowNone,
			douyuQualityOptions: props.strings.douyuQualityOptions,
		}),
	},
	[PlatformType.TWITCH]: {
		component: TwitchPlatformForm,
		getProps: props => ({
			strings: props.strings.twitchStrings,
			allowNone: props.allowNone,
			qualities: props.strings.twitchQualityOptions,
		}),
	},
	[PlatformType.PANDATV]: {
		component: PandaTvPlatformForm,
		getProps: props => ({
			strings: props.strings.pandaStrings,
			allowNone: props.allowNone,
			qualities: props.strings.pandaQualityOptions,
		}),
	},
	[PlatformType.WEIBO]: {
		component: WeiboPlatformForm,
		getProps: props => ({
			strings: props.strings.weiboStrings,
			allowNone: props.allowNone,
		}),
	},
}

// Component to render the selected platform's form with lazy loading
export const PlatformForm = React.memo(
	({
		platform,
		strings,
		allowNone = true,
	}: {
		platform: PlatformType | string
		strings: StreamerConfigProps["strings"]
		allowNone?: boolean
	}) => {
		const platformKey = platform as PlatformType
		const platformConfig = platformRegistry[platformKey]

		if (!platformConfig) return null

		const { component: Component, getProps } = platformConfig
		const componentProps = getProps({ strings, allowNone })

		return (
			<Suspense fallback={<PlatformLoading />}>
				<Component {...componentProps} />
			</Suspense>
		)
	}
)

PlatformForm.displayName = "PlatformForm"
