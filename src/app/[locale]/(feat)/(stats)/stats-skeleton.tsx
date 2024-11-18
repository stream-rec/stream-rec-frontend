import {Skeleton} from "@/src/components/new-york/ui/skeleton";

export default function StatsSkeleton() {
  return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2 xl:gap-x-16 pb-2">
        <Skeleton className={"rounded-xl"}/>
        <Skeleton className={"rounded-xl h-[200px]"}/>
      </div>
  )
}