import { Skeleton } from "@/src/components/new-york/ui/skeleton"

export function PlatformFormSkeleton() {
	return (
		<>
			<div className='space-y-8'>
				<div className='inline-flex h-9 items-center justify-center space-x-3 rounded-lg bg-muted p-1 text-muted-foreground'>
					<Skeleton className='inline-flex h-5 w-10 items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow' />
					<Skeleton className='inline-flex h-5 w-10 items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow' />
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
