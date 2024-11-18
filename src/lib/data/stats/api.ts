'use server'
import {SummaryStats} from "./definitions";
import {fetchApi} from "../api";

export const fetchStats = async (data: { dateStart: number, dateEnd: number }) => {
  const response = await fetchApi('/stats?dateStart=' + data.dateStart + '&dateEnd=' + data.dateEnd)
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("Failed to fetch stats data: " + errorText)
  }
  let json = await response.json() as SummaryStats
  // data is sorted by timestamp, the latest data is at the first
  json.stats = json.stats?.map((stat) => {
    stat.timeStamp = stat.timeStamp * 1000
    return stat
  })
  return json
};