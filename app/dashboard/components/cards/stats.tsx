'use client'
import {useTheme} from "next-themes"
import {Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis} from "recharts"


import {Card, CardContent, CardHeader, CardTitle,} from "@/components/new-york/ui/card"
import {useConfig} from "@/app/hooks/use-config";
import {themes} from "@/components/theme/themes";
import React from "react";
import {SummaryStats} from "@/app/lib/definitions";
import {differenceInDays, isSameWeek, isSameYear} from "date-fns";


type CardDataProps = {
  data: SummaryStats,
  firstCardTitle: string,
  secondCardTitle: string
}


enum CardDataDateRange {
  YEARLY,
  MONTHLY,
  WEEKLY
}


export function CardsStats(
    {
      data,
      firstCardTitle, secondCardTitle
    }: CardDataProps
) {
  const {theme: mode} = useTheme()
  const [config] = useConfig()

  const theme = themes.find((theme) => theme.name === config.theme)

  let firstCardRangeType = CardDataDateRange.YEARLY

  function getPercentageChange(current: number, previous: number) {
    if (previous === 0) {
      return 0
    }
    return ((current - previous) / previous) * 100
  }

  const getPercentageInfo = (currentData: number, previousData: number, previousString: string) => {
    const current = currentData || 0;
    const previous = previousData || 0;
    const percentage = getPercentageChange(current, previous);
    console.log("calculating percentage change", current, previous, previousString)
    const sign = percentage > 0 ? "+" : "";
    return `${sign}${percentage.toFixed(2)}%${previousString}`;
  }

  const getTotalOrLast = (total: number | undefined, key: string) => {
    if (total) {
      return total
    }
    // get the last value from the data
    const last = data.stats[data.stats.length - 1]
    if (last === undefined) {
      return 0
    }
    if (key === 'streams') {
      return last.streams
    }
    return last.uploads
  }


  const getPercentageString = () => {
    let previousTimeStamps = data.stats[0].date ?? 0
    let currentTimeStamps = data.stats[data.stats.length - 1].date ?? previousTimeStamps ?? 0
    let previousDate = new Date(previousTimeStamps)
    let currentDate = new Date(currentTimeStamps)

    if (differenceInDays(currentDate, previousDate) < 7) {
      firstCardRangeType = CardDataDateRange.WEEKLY
      return " from last week"
    }

    if (isSameYear(previousDate, currentDate)) {
      firstCardRangeType = CardDataDateRange.MONTHLY
      return " from last month"
    }
    return " from last year"
  }


  const firstCardPercentageInfo = () => getPercentageInfo(getTotalOrLast(data.totalRecords, "records"), getTotalOrLast(data.previousTotalRecords, "records"), getPercentageString());
  const secondCardPercentageInfo = () => getPercentageInfo(getTotalOrLast(data.totalUploads, "uploads"), getTotalOrLast(data.previousTotalUploads, "uploads"), getPercentageString());


  const format = (date: number) => {
    const month = new Date(date)
    if (firstCardRangeType === CardDataDateRange.YEARLY) {
      return month.toLocaleString(navigator.language, {year: 'numeric'})
    }
    if (firstCardRangeType === CardDataDateRange.WEEKLY) {
      return month.toLocaleString(navigator.language, {weekday: 'short'})
    }
    return month.toLocaleString(navigator.language, {month: 'short'})
  }

  return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal">{firstCardTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalOrLast(data.totalRecords, "records")}</div>
            <p className="text-xs text-muted-foreground">
              {firstCardPercentageInfo()}
            </p>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data.stats}
                    dataKey="date"
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 0,
                    }}
                >
                  <Tooltip

                      content={({active, payload}) => {
                        if (active && payload && payload.length) {
                          return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {format(payload[0].payload.date)}
                            </span>
                                    <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                                  </div>
                                </div>
                              </div>
                          )
                        }

                        return null
                      }}
                  />
                  <XAxis dataKey="date" hide/>
                  <Line
                      type="monotone"
                      strokeWidth={2}
                      dataKey="streams"
                      activeDot={{
                        r: 6,
                        style: {fill: "var(--theme-primary)", opacity: 0.25},
                      }}
                      style={
                        {
                          stroke: "var(--theme-primary)",
                          "--theme-primary": `hsl(${
                              theme?.cssVars[mode === "dark" ? "dark" : "light"]
                                  .primary
                          })`,
                        } as React.CSSProperties
                      }
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal">{secondCardTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalOrLast(data.totalRecords, "uploads")}</div>
            <p className="text-xs text-muted-foreground">
              {secondCardPercentageInfo()}
            </p>
            <div className="mt-4 h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.stats}>
                  <Tooltip

                      content={({active, payload}) => {
                        if (active && payload && payload.length) {
                          return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {format(payload[0].payload.date)}
                            </span>
                                    <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                                  </div>
                                </div>
                              </div>
                          )
                        }

                        return null
                      }}
                  />
                  <Bar
                      dataKey="uploads"
                      style={
                        {
                          fill: "var(--theme-primary)",
                          opacity: 1,
                          "--theme-primary": `hsl(${
                              theme?.cssVars[mode === "dark" ? "dark" : "light"]
                                  .primary
                          })`,
                        } as React.CSSProperties
                      }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}