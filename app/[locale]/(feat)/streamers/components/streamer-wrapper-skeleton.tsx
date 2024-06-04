import RecordListSkeleton from "@/app/[locale]/(feat)/streamers/components/record-list-skeleton";


export function StreamerWrapperSkeleton({recording, inactive, disabled}: {
  recording: string;
  inactive: string;
  disabled: string;
}) {
  return (
      <>
        <RecordListSkeleton title={recording}/>
        <RecordListSkeleton title={inactive}/>
        <RecordListSkeleton title={disabled}/>
      </>
  );
}