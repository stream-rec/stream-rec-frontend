import React, { Suspense, useMemo } from "react"
import { GlobalSettingSkeleton } from "@/src/app/[locale]/(feat)/settings/(global)/global-setting-skeleton"
import { fetchConfig, updateConfig } from "@/src/lib/data/config/apis"
import { useGlobalSettingsTranslations } from "@/src/app/hooks/translations/global-settings-translations"
import { GlobalForm } from "@/src/app/[locale]/(feat)/settings/(global)/global-form"
import { fetchEngineConfig, updateEngineConfig } from "@/src/lib/data/engines/engines-apis"
import { GlobalConfig } from "@/src/lib/data/config/definitions"
import { GlobalSettingsTranslations } from "@/src/app/hooks/translations/global-settings-translations"

// Define proper types for the props
interface GlobalFormContentProps {
	appConfig: GlobalConfig
	translations: GlobalSettingsTranslations
}

const GlobalFormContent = React.memo(({ appConfig, translations }: GlobalFormContentProps) => {
	// We don't need to memoize these imported functions as they're already stable references
	// Just pass them directly to avoid unnecessary memoization
	return (
		<GlobalForm
			appConfig={appConfig}
			update={updateConfig}
			updateEngineConfig={updateEngineConfig}
			getEngineConfig={fetchEngineConfig}
			strings={translations}
		/>
	)
})

GlobalFormContent.displayName = "GlobalFormContent"

export const GlobalFormSuspense = () => {
	// These data fetching operations will only run once during initial render
	// due to how React.use works with Suspense
	const configPromise = fetchConfig()
	const appConfig = React.use(configPromise)
	const engineConfigPromise = fetchEngineConfig(appConfig.id, appConfig.engine)
	const engineConfig = React.use(engineConfigPromise)

	// Create the complete config object
	const completeAppConfig = useMemo(() => {
		return { ...appConfig, engineConfig }
	}, [appConfig, engineConfig])

	const translations = useGlobalSettingsTranslations()

	return (
		<Suspense fallback={<GlobalSettingSkeleton />}>
			<GlobalFormContent appConfig={completeAppConfig} translations={translations} />
		</Suspense>
	)
}
