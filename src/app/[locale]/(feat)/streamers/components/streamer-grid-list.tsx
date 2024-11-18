import React, {Suspense} from "react";
import RecordListSkeleton from "@/src/app/[locale]/(feat)/streamers/components/record-list-skeleton";
import {ServerRecordList} from "@/src/app/[locale]/(feat)/streamers/components/server-record-list";

type StreamerWrapperProps = {
  recordingString: string;
  inactiveString: string;
  disabledString: string;
}

export function StreamerGridList({recordingString, inactiveString, disabledString}: StreamerWrapperProps) {

  return (
      <div className="grid gap-4 grid-cols-1 md:grids-col-3 lg:grid-cols-3 lg:space-x-8">
        <div className="space-y-4 col-span-1">
          <Suspense fallback={<RecordListSkeleton title={recordingString}/>}>
            <ServerRecordList filter={"live"} title={recordingString}/>
          </Suspense>
        </div>

        <div className="space-y-4 col-span-1 ">
          <Suspense fallback={<RecordListSkeleton title={inactiveString}/>}>
            <ServerRecordList filter={"offline"} title={inactiveString}/>
          </Suspense>

        </div>

        <div className="space-y-4 col-span-1">
          <Suspense fallback={<RecordListSkeleton title={disabledString}/>}>
            <ServerRecordList filter={"inactive"} title={disabledString}/>
          </Suspense>
        </div>
      </div>
  )
}