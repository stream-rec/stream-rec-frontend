import { FlagFormField } from "@/src/app/[locale]/(feat)/settings/components/form/flag-form-field"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/new-york/ui/accordion"
import React from "react"

export type FfmpegBasedEngineFieldsProps = {
	form: any
	controlPrefix: string | undefined
	strings: {
		useBuiltinSegmenterTitle: string
		useBuiltInSegmenterDescription: string | React.ReactNode
		useBuiltInSegmenterNote: string
		useBuiltInSegmenterNoteDescription: string | React.ReactNode
		exitOnErrorTitle: string
		exitOnErrorDescription: string | React.ReactNode
	}
}

export function FfmpegBasedEngineFields({ form, controlPrefix, strings }: FfmpegBasedEngineFieldsProps) {
	return (
		<>
			<FlagFormField
				control={form.control}
				controlPrefix={controlPrefix}
				fieldName={"useBuiltInSegmenter"}
				title={strings.useBuiltinSegmenterTitle}
				description={strings.useBuiltInSegmenterDescription}
				ariaLabel={"FFMPEG use segmenter switch"}
			>
				<Accordion type='single' collapsible asChild={true}>
					<AccordionItem value='item-1' className={"border-none"}>
						<AccordionTrigger className={"text-[0.8rem] text-muted-foreground"}>
							{strings.useBuiltInSegmenterNote}
						</AccordionTrigger>
						<AccordionContent className={"whitespace-pre-wrap text-[0.8rem] text-muted-foreground"}>
							{strings.useBuiltInSegmenterNoteDescription}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</FlagFormField>

			<FlagFormField
				control={form.control}
				controlPrefix={controlPrefix}
				fieldName={"exitDownloadOnError"}
				title={strings.exitOnErrorTitle}
				description={strings.exitOnErrorDescription}
				showExperimentalBadge
				ariaLabel={"FFMPEG Exit on download error switch"}
			/>
		</>
	)
}
