import {SummaryStats} from "@/app/lib/data/stats/definitions";
import {fetchApi} from "@/app/lib/data/api";

export const fetchStats = async (data: { dateStart: number, dateEnd: number }) => {
  const response = await fetchApi('/stats?dateStart=' + data.dateStart + '&dateEnd=' + data.dateEnd)
  if (!response.ok) {
    throw new Error("Failed to fetch stats")
  }
  let json = await response.json() as SummaryStats
  json.stats = json.stats?.map((stat) => {
    stat.timeStamp = stat.timeStamp * 1000
    return stat
  })
  return json
};