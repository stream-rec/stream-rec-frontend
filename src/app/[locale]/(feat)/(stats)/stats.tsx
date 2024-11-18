'use client'
import {useTheme} from "next-themes"
import {Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis} from "recharts"


import {Card, CardContent, CardHeader, CardTitle,} from "@/src/components/new-york/ui/card"

import {themes} from "@/src/components/theme/themes";
import React from "react";
import {useConfig} from "@/src/app/hooks/use-config";
import {Stats} from "@/src/lib/data/stats/definitions";


type CardDataProps = {
  data: Stats[],
  firstCard: {
    title: string,
    total: number,
    percentage: string
  }
  secondCard: {
    title: string,
    total: number,
    percentage: string
  }
}

export function CardsStats(
    {
      data,
      firstCard,
      secondCard
    }: CardDataProps
) {
  const {theme: mode} = useTheme()
  const [config] = useConfig()

  const theme = themes.find((theme) => theme.name === config.theme)

  const formatDate = (date: number) => {
    const month = new Date(date)
    return month.toLocaleString(navigator.language, {month: 'short', day: 'numeric'})
  }

  return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2 xl:gap-x-16">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal">{firstCard.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{firstCard.total}</div>
            <p className="text-xs text-muted-foreground">
              {firstCard.percentage}
            </p>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    dataKey="timeStamp"
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
                              {formatDate(payload[0].payload.timeStamp)}
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
                  <XAxis dataKey="timeStamp" hide/>
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
            <CardTitle className="text-sm font-normal">{secondCard.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{secondCard.total}</div>
            <p className="text-xs text-muted-foreground">
              {secondCard.percentage}
            </p>
            <div className="mt-4 h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Tooltip

                      content={({active, payload}) => {
                        if (active && payload && payload.length) {
                          return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {formatDate(payload[0].payload.timeStamp)}
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