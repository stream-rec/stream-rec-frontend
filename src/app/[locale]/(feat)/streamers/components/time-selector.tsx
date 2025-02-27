import { FormLabel } from "@/src/components/new-york/ui/form"
import React from "react"
import { TimePickerDemo } from "./timer-picker"

type TimeSelectorProps = {
	label: string
	date: Date
	onTimeChange: (date: Date | undefined) => void
}

// Time selector component with memoization
export const TimeSelector = React.memo(({ label, date, onTimeChange }: TimeSelectorProps) => {
	return (
		<div className='flex flex-col gap-y-2'>
			<FormLabel>{label}</FormLabel>
			<TimePickerDemo date={date} setDate={onTimeChange} />
		</div>
	)
})

TimeSelector.displayName = "TimeSelector"
