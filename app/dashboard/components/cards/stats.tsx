'use client'
import {useTheme} from "next-themes"
import {Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis} from "recharts"


import {Card, CardContent, CardHeader, CardTitle,} from "@/components/new-york/ui/card"
import {useConfig} from "@/app/hooks/use-config";
import {themes} from "@/components/theme/themes";
import React from "react";
import {Stats} from "@/app/lib/definitions";


type CardDataProps = {
  data: Stats[],
  firstCard: {
    title: string,
    total?: number,
    previousTotal?: number,
    previousString: string
  },
  secondCard: {
    title: string,
    total?: number,
    previousTotal?: number,
    previousString: string
  }
}


export function CardsStats(
    {
      data,
      firstCard: {title, total, previousString, previousTotal},
      secondCard: {title: title2, total: total2, previousString: previousString2, previousTotal: previousTotal2}
    }: CardDataProps
) {
  const {theme: mode} = useTheme()
  const [config] = useConfig()

  const theme = themes.find((theme) => theme.name === config.theme)

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
    const sign = percentage > 0 ? "+" : "";
    return `${sign}${percentage.toFixed(2)}%${previousString}`;
  }

  const firstCardPercentageInfo = () => getPercentageInfo(data[data.length - 1]?.streams, previousTotal ?? data[data.length - 2]?.streams, previousString);
  const secondCardPercentageInfo = () => getPercentageInfo(data[data.length - 1]?.uploads, previousTotal2 ?? data[data.length - 2]?.uploads, previousString2);

  const calculateTotal = (key: string) => {
    if (key === 'streams') {
      return data.reduce((acc, current) => acc + current.streams, 0)
    }
    return data.reduce((acc, current) => acc + current.uploads, 0)
  }

  const formatToMonth = (date: number) => {
    const month = new Date(date)
    return month.toLocaleString(navigator.language, {month: 'short'})
  }

  return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total ?? calculateTotal("streams")}</div>
            <p className="text-xs text-muted-foreground">
              {firstCardPercentageInfo()}
            </p>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
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
                              {formatToMonth(payload[0].payload.date)}
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
            <CardTitle className="text-sm font-normal">{title2}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total2 ?? calculateTotal("uploads")}</div>
            <p className="text-xs text-muted-foreground">
              {secondCardPercentageInfo()}
            </p>
            <div className="mt-4 h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
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