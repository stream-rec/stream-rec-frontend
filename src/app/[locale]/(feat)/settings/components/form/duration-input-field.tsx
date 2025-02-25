import React, { useCallback, useEffect, useState, memo } from "react"
import { useController } from "react-hook-form"
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/src/components/new-york/ui/form"
import { Input } from "@/src/components/new-york/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/new-york/ui/select"
import { DurationUnit, formatSeconds, convertToSeconds } from "@/src/app/utils/conversions"

type DurationInputFieldProps = {
	control: any
	name: string
	label: React.ReactNode
	description: React.ReactNode
	placeholder?: string
	timeFormatLabels: {
		seconds: string
		minutes: string
		hours: string
		days: string
	}
}

/**
 * A component that handles duration input with unit selection
 * Automatically converts between different time units
 */
const DurationInputField = memo(
	({ control, name, label, description, placeholder, timeFormatLabels }: DurationInputFieldProps) => {
		// Get the initial value in seconds from the form
		const { field } = useController({ name, control })
		const [format, setFormat] = useState(DurationUnit.SECONDS)
		const [displayValue, setDisplayValue] = useState<number | undefined>(undefined)

		// Convert from seconds to display format when the field value changes
		useEffect(() => {
			if (field.value !== undefined) {
				const { unit, value } = formatSeconds(field.value)
				setFormat(unit)
				setDisplayValue(value)
			}
		}, [field.value])

		// Handle input change and convert to seconds
		const handleValueChange = useCallback(
			(value: string) => {
				const numValue = Number(value)
				if (isNaN(numValue)) return

				setDisplayValue(numValue)
				if (numValue === 0) {
					field.onChange(undefined) // Special case for 0
				} else {
					const secondsValue = Math.round(convertToSeconds(format, numValue))
					field.onChange(secondsValue)
				}
			},
			[format, field]
		)

		// Handle format change
		const handleFormatChange = useCallback(
			(newFormat: string) => {
				if (!newFormat) return
				// Convert current value to seconds, then to the new format
				if (displayValue !== undefined) {
					const secondsValue = convertToSeconds(newFormat as DurationUnit, displayValue)
					field.onChange(Math.round(secondsValue)) // Update the form value in seconds
				}

				setFormat(newFormat as DurationUnit)
			},
			[displayValue, field]
		)

		return (
			<FormField
				control={control}
				name={name}
				render={() => (
					<FormItem>
						<FormLabel>{label}</FormLabel>
						<Select onValueChange={handleFormatChange} value={format}>
							<div className='flex items-center space-x-2'>
								<FormControl>
									<Input
										type='number'
										placeholder={placeholder}
										value={displayValue ?? ""}
										onChange={e => handleValueChange(e.target.value)}
									/>
								</FormControl>
								<SelectTrigger>
									<SelectValue placeholder={placeholder} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={DurationUnit.SECONDS}>{timeFormatLabels.seconds}</SelectItem>
									<SelectItem value={DurationUnit.MINUTES}>{timeFormatLabels.minutes}</SelectItem>
									<SelectItem value={DurationUnit.HOURS}>{timeFormatLabels.hours}</SelectItem>
									<SelectItem value={DurationUnit.DAYS}>{timeFormatLabels.days}</SelectItem>
								</SelectContent>
							</div>
							<FormDescription>{description}</FormDescription>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
		)
	}
)

DurationInputField.displayName = "DurationInputField"

export default DurationInputField
