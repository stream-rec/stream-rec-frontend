import { FormLabel } from "@/src/components/new-york/ui/form"
import React from "react"
import { TimePickerDemo } from "./timer-picker"

type TimeSelectorProps = {
	label: string
	date: Date
	onTimeChange: (date: Date | undefined) => void
	placeholder?: string
}

// Time selector component with memoization
export const TimeSelector = React.memo(({ label, date, onTimeChange, placeholder }: TimeSelectorProps) => {
	return (
		<div className='flex flex-col gap-y-2'>
			<FormLabel>{label}</FormLabel>
			<TimePickerDemo date={date} setDate={onTimeChange} placeholder={placeholder} />
		</div>
	)
})

TimeSelector.displayName = "TimeSelector"
