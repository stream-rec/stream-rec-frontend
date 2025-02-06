import { Skeleton } from "@/src/components/new-york/ui/skeleton"

export default function StatsSkeleton() {
	return (
		<div className='grid gap-4 pb-2 sm:grid-cols-2 xl:grid-cols-2 xl:gap-x-16'>
			<Skeleton className={"rounded-xl"} />
			<Skeleton className={"h-[200px] rounded-xl"} />
		</div>
	)
}
