import {summarySchema, SummaryStats} from "@/app/lib/data/stats/definitions";
import {fetchApi} from "@/app/lib/data/api";

export const fetchStats = async (data: { dateStart: number, dateEnd: number }): Promise<SummaryStats> => {
  const response = await fetchApi('/stats?dateStart=' + data.dateStart + '&dateEnd=' + data.dateEnd)
  if (!response.ok) {
    throw new Error("Failed to fetch stats")
  }
  let json = await response.json()
  let status = summarySchema.safeParse(json)
  if (status.success) {
    return status.data
  }
  console.log("errors", status.error)
  throw new Error(status.error.errors[0].message)
};