"use client"

import * as React from "react"
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { Button } from "@/src/components/new-york/ui/button"
import { Checkbox } from "@/src/components/new-york/ui/checkbox"
import { Label } from "@/src/components/new-york/ui/label"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/src/components/new-york/ui/dialog"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/src/components/new-york/ui/drawer"
import { useMediaQuery } from "@/src/app/hooks/use-media-query"
import { useTranslations } from "next-intl"

interface DeleteStreamsDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
	data: any[]
	deleteAction?: (streams: any[], deleteLocal: boolean) => Promise<void>
	onSuccess?: () => void
	showTrigger?: boolean
}

export function DeleteItemsDialog({
	data,
	showTrigger = true,
	deleteAction,
	onSuccess,
	...props
}: DeleteStreamsDialogProps) {
	const [isDeletePending, startDeleteTransition] = React.useTransition()
	const [deleteLocal, setDeleteLocal] = React.useState(false)
	const isDesktop = useMediaQuery("(min-width: 640px)")

	const t = useTranslations("Actions")

	function onDelete() {
		startDeleteTransition(async () => {
			try {
				await deleteAction?.(data, deleteLocal)
			} catch (error) {
				console.error(error)
				toast.error(error instanceof Error ? error.message : String(error))
				return
			}
			props.onOpenChange?.(false)
			toast.success(t("deleted"))
			onSuccess?.()
		})
	}

	if (isDesktop) {
		return (
			<Dialog {...props}>
				{showTrigger ? (
					<DialogTrigger asChild>
						<Button variant='outline' size='sm'>
							<TrashIcon className='mr-2 size-4' aria-hidden='true' />
							{t("delete")} ({data.length})
						</Button>
					</DialogTrigger>
				) : null}
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t("deleteConfirmation")}</DialogTitle>
						<DialogDescription>{t("deleteConfirmationDescription", { count: data.length })}</DialogDescription>
					</DialogHeader>
					<div className="flex items-center space-x-2 py-4">
						<Checkbox 
							id="delete-local" 
							checked={deleteLocal} 
							onCheckedChange={(checked) => setDeleteLocal(!!checked)}
						/>
						<Label htmlFor="delete-local" className="text-sm">
							{t("deleteLocalFiles")}
						</Label>
					</div>
					<DialogFooter className='gap-2 sm:space-x-0'>
						<DialogClose asChild>
							<Button variant='outline'>{t("cancel")}</Button>
						</DialogClose>
						<Button
							aria-label='Delete selected rows'
							variant='destructive'
							onClick={onDelete}
							disabled={isDeletePending}
						>
							{isDeletePending && <ReloadIcon className='mr-2 size-4 animate-spin' aria-hidden='true' />}
							{t("delete")}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer {...props}>
			{showTrigger ? (
				<DrawerTrigger asChild>
					<Button variant='outline' size='sm'>
						<TrashIcon className='mr-2 size-4' aria-hidden='true' />
						{t("delete")} ({data.length})
					</Button>
				</DrawerTrigger>
			) : null}
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{t("deleteConfirmation")}</DrawerTitle>
					<DrawerDescription>{t("deleteConfirmationDescription", { count: data.length })}</DrawerDescription>
				</DrawerHeader>
				<div className="flex items-center space-x-2 px-4 py-2">
					<Checkbox 
						id="delete-local-drawer" 
						checked={deleteLocal} 
						onCheckedChange={(checked) => setDeleteLocal(!!checked)}
					/>
					<Label htmlFor="delete-local-drawer" className="text-sm">
						{t("deleteLocalFiles")}
					</Label>
				</div>
				<DrawerFooter className='gap-2 sm:space-x-0'>
					<DrawerClose asChild>
						<Button variant='outline'>{t("cancel")}</Button>
					</DrawerClose>
					<Button aria-label='Delete selected rows' variant='destructive' onClick={onDelete} disabled={isDeletePending}>
						{isDeletePending && <ReloadIcon className='mr-2 size-4 animate-spin' aria-hidden='true' />}
						{t("delete")}
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
