"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { calculatePercentage, convertFileSize } from "@/lib/utils";

const chartConfig = {
  size: {
    label: "Size",
  },
  used: {
    label: "Used",
    color: "#6366F1",
  },
} satisfies ChartConfig;

export const Chart = ({ used = 0 }: { used: number }) => {
  const chartData = [{ storage: "used", value: used, fill: "#6366F1" }];

  return (
    <Card className="rounded-[32px] border border-slate-200 bg-white shadow-sm">
      <CardContent className="grid gap-6 p-6 lg:grid-cols-[260px_1fr] lg:items-center">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[220px]">
          <RadialBarChart data={chartData} startAngle={90} endAngle={Number(calculatePercentage(used)) + 90} innerRadius={78} outerRadius={108}>
            <PolarGrid gridType="circle" radialLines={false} stroke="#E2E8F0" className="opacity-70" polarRadius={[86, 74]} />
            <RadialBar dataKey="value" background={{ fill: "#E2E8F0" }} cornerRadius={999} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-slate-900 text-[28px] font-semibold">
                          {used && calculatePercentage(used) ? calculatePercentage(used) : "0"}%
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-slate-500 text-xs">
                          space used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>

        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Storage overview</p>
          <h3 className="text-2xl font-semibold text-slate-900">See how much room you have left</h3>
          <p className="text-sm text-slate-500">Track total usage across documents, images, media, and everything else in your workspace.</p>
          <div className="flex items-end gap-2 pt-2">
            <span className="text-3xl font-semibold text-slate-900">{used ? convertFileSize(used) : "0 Bytes"}</span>
            <span className="pb-1 text-sm text-slate-500">used of 2 GB</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
