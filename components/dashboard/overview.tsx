"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

// Sample data for the chart
const data = [
  {
    name: "Jan",
    total: 1200,
    sales: 900,
  },
  {
    name: "Feb",
    total: 2100,
    sales: 1600,
  },
  {
    name: "Mar",
    total: 1800,
    sales: 1400,
  },
  {
    name: "Apr",
    total: 2400,
    sales: 1900,
  },
  {
    name: "May",
    total: 2800,
    sales: 2300,
  },
  {
    name: "Jun",
    total: 3200,
    sales: 2600,
  },
  {
    name: "Jul",
    total: 3800,
    sales: 3100,
  },
  {
    name: "Aug",
    total: 4000,
    sales: 3400,
  },
  {
    name: "Sep",
    total: 4500,
    sales: 3800,
  },
  {
    name: "Oct",
    total: 4300,
    sales: 3600,
  },
  {
    name: "Nov",
    total: 5000,
    sales: 4200,
  },
  {
    name: "Dec",
    total: 5500,
    sales: 4800,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" className="text-sm text-muted-foreground" tickLine={false} axisLine={false} />
        <YAxis
          className="text-sm text-muted-foreground"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Revenue</span>
                      <span className="font-bold text-muted-foreground">${payload[0].value}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Sales</span>
                      <span className="font-bold text-muted-foreground">${payload[1].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="total"
          strokeWidth={2}
          activeDot={{
            r: 6,
            className: "fill-primary stroke-background stroke-2",
          }}
          className="stroke-primary"
        />
        <Line
          type="monotone"
          dataKey="sales"
          strokeWidth={2}
          activeDot={{
            r: 6,
            className: "fill-muted-foreground stroke-background stroke-2",
          }}
          className="stroke-muted-foreground"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

