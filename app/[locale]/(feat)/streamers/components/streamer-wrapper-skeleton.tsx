import RecordListSkeleton from "@/app/[locale]/(feat)/streamers/components/record-list-skeleton";


export function StreamerWrapperSkeleton() {
  return (
      <>
        <RecordListSkeleton title={"Recording"}/>
        <RecordListSkeleton title={"Inactive"}/>
        <RecordListSkeleton title={"Disabled"}/>
      </>
  );
}