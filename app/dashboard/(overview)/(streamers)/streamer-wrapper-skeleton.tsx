import RecordListSkeleton from "@/app/dashboard/(overview)/(streamers)/record-list-skeleton";

export function StreamerWrapperSkeleton() {
  return (
      <>
        <RecordListSkeleton title={"Recording"}/>
        <RecordListSkeleton title={"Inactive"}/>
        <RecordListSkeleton title={"Disabled"}/>
      </>
  );
}