import { Skeleton } from "@/src/components/new-york/ui/skeleton"

export const GlobalSettingSkeleton = () => {
	return (
		<>
			<div className='space-y-8'>
				<div className='space-y-2'>
					<Skeleton className='h-4 max-w-sm' />
					<Skeleton className='h-4' />
				</div>

				<div className='space-y-2'>
					<Skeleton className='h-4 max-w-sm' />
					<Skeleton className='h-4' />
				</div>
				<div className='space-y-2'>
					<Skeleton className='h-4' />
					<Skeleton className='h-4' />
				</div>
				<div className='space-y-2'>
					<Skeleton className='h-4' />
					<Skeleton className='h-4' />
				</div>
				<div className='space-y-2'>
					<Skeleton className='h-4' />
					<Skeleton className='h-4' />
				</div>
				<div className='space-y-2'>
					<Skeleton className='h-4' />
					<Skeleton className='h-4' />
				</div>
				<div>
					<Skeleton className='inline-flex h-9 w-20 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50' />
				</div>
			</div>
		</>
	)
}
