import { StreamerForm } from "@/src/app/[locale]/(feat)/streamers/components/streamer-form"
import React from "react"
import { StreamerSchema } from "@/src/lib/data/streams/definitions"

type StreamerFormWrapperProps = {
	templateData: StreamerSchema[]
	defaultStreamerValues: StreamerSchema
	onSubmit: (data: StreamerSchema) => Promise<StreamerSchema>
}

export function StreamerFormWrapper({ templateData, defaultStreamerValues, onSubmit }: StreamerFormWrapperProps) {
	return (
		<>
			<StreamerForm
				defaultValues={defaultStreamerValues}
				templateUsers={templateData}
				onSubmit={onSubmit}
			/>
		</>
	)
}
