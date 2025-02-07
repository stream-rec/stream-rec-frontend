"use client"

import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/src/components/new-york/ui/form"
import { Input } from "@/src/components/new-york/ui/input"
import { LoadingButton } from "@/src/components/new-york/ui/loading-button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormState } from "react-hook-form"
import { useRouter } from "@/src/i18n/routing"
import { usePlayerStore } from "@/src/lib/stores/player-store"
import { useSearchParams } from "next/navigation"
import { handleStreamPlay } from "@/src/lib/utils/stream-player"

type PlaygroundFormProps = {
	submitText?: string
	urlPlaceholder?: string
}

export default function PlaygroundForm({ submitText, urlPlaceholder }: PlaygroundFormProps) {
	const defaultUrl = useSearchParams().get("url") ?? undefined

	const extractorSchema = z.object({
		url: z.string().url(),
	})

	const form = useForm<z.infer<typeof extractorSchema>>({
		resolver: zodResolver(extractorSchema),
		defaultValues: {
			url: defaultUrl,
		},
	})

	const { isSubmitting, isValid } = useFormState({ control: form.control })

	const router = useRouter()
	const setMediaInfo = usePlayerStore(state => state.setMediaInfo)

	const setSource = usePlayerStore(state => state.setSource)

	const onSubmit = async (values: z.infer<typeof extractorSchema>) => {
		await handleStreamPlay(values.url, router, { setMediaInfo, setSource })
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='url'
					render={({ field }) => (
						<FormItem>
							<FormLabel>URL</FormLabel>
							<FormControl>
								<Input placeholder={urlPlaceholder} {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<LoadingButton
					type='submit'
					loading={isSubmitting}
					disabled={!isValid || isSubmitting}
					className='flex h-12 w-full items-center justify-center rounded-lg p-3 text-sm font-medium'
				>
					{submitText}
				</LoadingButton>
			</form>
		</Form>
	)
}
