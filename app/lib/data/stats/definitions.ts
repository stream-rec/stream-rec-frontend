
export type SummaryStats = {
  totalRecords: number;
  previousTotalRecords: number;
  totalUploads: number;
  previousTotalUploads: number;
  stats: Stats[];
}


export type Stats = {
  date: number;
  streams: number;
  uploads: number;
}