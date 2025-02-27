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
import { FileSizeUnit, formatBytes, convertToBytes } from "@/src/app/utils/conversions"

type SizeInputFieldProps = {
	control: any
	name: string
	label: React.ReactNode
	description: React.ReactNode
	placeholder?: string
}

/**
 * A component that handles file size input with unit selection
 * Automatically converts between different size units
 */
const SizeInputField = memo(({ control, name, label, description, placeholder }: SizeInputFieldProps) => {
	// Get the initial value in bytes from the form
	const { field } = useController({ name, control })
	const [format, setFormat] = useState(FileSizeUnit.B)
	const [displayValue, setDisplayValue] = useState<number | undefined>(undefined)

	// Convert from bytes to display format when the field value changes
	useEffect(() => {
		if (field.value !== undefined) {
			const { unit, size } = formatBytes(field.value)
			setFormat(unit)
			setDisplayValue(size)
		}
	}, [field.value])

	// Handle input change and convert to bytes
	const handleValueChange = useCallback(
		(value: string) => {
			const numValue = Number(value)
			if (isNaN(numValue)) return

			setDisplayValue(numValue)
			const bytesValue = Math.round(convertToBytes(format, numValue))
			field.onChange(bytesValue)
		},
		[format, field]
	)

	// Handle format change
	const handleFormatChange = useCallback(
		(newFormat: string) => {
			if (!newFormat) return

			// Convert current value to bytes, then to the new format
			if (displayValue !== undefined) {
				const bytesValue = convertToBytes(newFormat as FileSizeUnit, displayValue)
				field.onChange(Math.round(bytesValue)) // Update the form value in bytes
			}

			setFormat(newFormat as FileSizeUnit)
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
								<SelectItem value={FileSizeUnit.B}>{FileSizeUnit.B}</SelectItem>
								<SelectItem value={FileSizeUnit.KB}>{FileSizeUnit.KB}</SelectItem>
								<SelectItem value={FileSizeUnit.MB}>{FileSizeUnit.MB}</SelectItem>
								<SelectItem value={FileSizeUnit.GB}>{FileSizeUnit.GB}</SelectItem>
							</SelectContent>
						</div>
						<FormDescription>{description}</FormDescription>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
})

SizeInputField.displayName = "SizeInputField"

export default SizeInputField
