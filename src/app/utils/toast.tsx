import { toast } from "sonner"
import React from "react"

const toastTypes = ["success", "error", "warning", "info", "code"] as const
type ToastType = (typeof toastTypes)[number]

export function toastData(title: string | React.ReactNode, data: any, toastType: ToastType = "success") {
	if (toastType === "code") {
		const description = (
			<pre className='mt-2 max-h-[screen-[80%]] w-[340px] overflow-auto rounded-md bg-slate-950 p-4'>
				<code className='text-xs text-white'>{JSON.stringify(data, null, 2)}</code>
			</pre>
		)

		toast(
			<div>
				<p>{title}</p>
				{description}
			</div>
		)
		return
	}

	// For standard toast types, use the built-in methods
	const message = typeof data === "string" ? data : JSON.stringify(data)
	toast[toastType]?.(message) || toast(message)
}
