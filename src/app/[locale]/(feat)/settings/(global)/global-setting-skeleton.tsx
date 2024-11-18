import {Skeleton} from "@/src/components/new-york/ui/skeleton";

export const GlobalSettingSkeleton = () => {

  return <>
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-4 max-w-sm"/>
        <Skeleton className="h-4  "/>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 max-w-sm"/>
        <Skeleton className="h-4 "/>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4"/>
        <Skeleton className="h-4"/>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4"/>
        <Skeleton className="h-4"/>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4"/>
        <Skeleton className="h-4"/>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4"/>
        <Skeleton className="h-4"/>
      </div>
      <div>
        <Skeleton
            className="w-20 h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90"/>
      </div>
    </div>
  </>
}