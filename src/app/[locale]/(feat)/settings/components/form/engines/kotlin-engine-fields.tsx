import { FlagFormField } from "@/src/app/[locale]/(feat)/settings/components/form/flag-form-field"
import React from "react"

export type KotlinEngineFieldsProps = {
	form: any
	controlPrefix?: string
	strings: {
		enableFix: string
		enableFixDescription: string | React.ReactNode
		enableFlvDuplicateTagFilteringTitle: string
		enableFlvDuplicateTagFilteringDescription: string | React.ReactNode
		combineHlsFiles: string
		combineHlsFilesDescription: string | React.ReactNode
	}
}

export function KotlinEngineFields({ form, controlPrefix, strings }: KotlinEngineFieldsProps) {
	return (
		<>
			<FlagFormField
				control={form.control}
				controlPrefix={controlPrefix}
				fieldName={"enableFlvFix"}
				title={strings.enableFix}
				description={strings.enableFixDescription}
				ariaLabel={"Flag to enable kotlin engine fix feature"}
			/>

			<FlagFormField
				control={form.control}
				controlPrefix={controlPrefix}
				fieldName={"enableFlvDuplicateTagFiltering"}
				title={strings.enableFlvDuplicateTagFilteringTitle}
				description={strings.enableFlvDuplicateTagFilteringDescription}
				ariaLabel={"Flag to enable kotlin engine duplicate tag filtering feature"}
			/>

			<FlagFormField
				control={form.control}
				controlPrefix={controlPrefix}
				fieldName={"combineTsFiles"}
				title={strings.combineHlsFiles}
				description={strings.combineHlsFilesDescription}
				ariaLabel={"Flag to enable kotlin engine combine Hls files feature"}
			/>
		</>
	)
}
