import {Skeleton} from "@/src/components/new-york/ui/skeleton";
import {Button} from "@/src/components/new-york/ui/button";
import {CaretSortIcon} from "@radix-ui/react-icons";
import React from "react";

export type RecordListSkeletonProps = {
  title: string

}
export default function RecordListSkeleton({title}: RecordListSkeletonProps) {

  const generateSkeleton = (id: number) => {
    return <Skeleton key={id} className={"rounded-xl"}>
      <div className={"flex flex-col space-y-1.5 p-6"}>
        <div className="flex flex-row items-center py-6 gap-x-5">
          <Skeleton className="h-12 w-12 rounded-full"/>
          <div className="space-y-2">
            <Skeleton className="h-4 w-12 md:w-40 lg:w-20 xl:w-20"/>
            <Skeleton className="h-4 w-12 md:w-40 lg:w-20 xl:w-20"/>
          </div>
        </div>
      </div>

    </Skeleton>
  }
  return (
      <>
        <div className={"space-y-3"}>
          <div className="flex items-center space-x-4 justify-between">
            <h3 className="text-xm font-semibold"> {title}</h3>
            <h3 className="text-xs px-2 py-0.5 bg-muted rounded-md">0</h3>

            <div className={"flex-1"}>
              <div className={"float-end"}>
                <Button variant="ghost" size="sm">
                  <CaretSortIcon className="h-4 w-4"/>
                  <span className="sr-only">Toggle</span>
                </Button>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 xl:gap-6">
            {
              Array.from({length: 5}, (_, i) => generateSkeleton(i))
            }
          </div>
        </div>

      </>
  )
}