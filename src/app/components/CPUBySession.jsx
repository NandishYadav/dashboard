import React, { useMemo, useState } from "react";
import { Activity, Clock, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart"
export const description = "A simple area chart"
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}


function formatTime(ts) {
  try {
    return new Date(ts).toUTCString().slice(17, 22); // HH:MM
  } catch (e) {
    return "";
  }
}

function formatCPUTime(seconds) {
  if (seconds == null) return "0s";
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

export function CPUBySession({ sessions, onSessionClick, mode = 'full' }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Process data for Chart
  const processed = useMemo(() => {
    if (!sessions || sessions.length === 0) return [];

    // Sort chronologically for the graph
    return [...sessions]
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .map(d => ({
        time: d.timestamp,
        cpuPct: d.cpuPercent,
        sid: d.sid,
        username: d.username
      }));
  }, [sessions]);

  // Process data for Table (Top Sessions)
  const topSessions = useMemo(() => {
    // Sort by CPU percent descending
    return [...sessions].sort((a, b) => b.cpuPercent - a.cpuPercent).slice(0, 10);
  }, [sessions]);

  // Chart Dimensions
  const width = 1500;
  const height = 750;
  const paddingX = 60; // Left/Right padding for Y-axis labels
  const paddingY = 40; // Top/Bottom padding

  const graphWidth = width - paddingX * 2;
  const graphHeight = height - paddingY * 2;

  const xStep = processed.length > 1 ? graphWidth / (processed.length - 1) : 0;

  // Calculate points
  const points = processed.map((d, i) => {
    const x = paddingX + i * xStep;
    const y = paddingY + graphHeight - (d.cpuPct / 100) * graphHeight;
    return { x, y, ...d };
  });

  const pathContent = points.map((p, i) =>
    `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`
  ).join(" ");

  const areaContent = `
      ${pathContent} 
      L ${points[points.length - 1]?.x || paddingX} ${height - paddingY} 
      L ${paddingX} ${height - paddingY} 
      Z
  `;

  // Render based on mode
  if (mode === 'graph-only') {
    // Graph only mode - used in overview
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div>
            <h3 className="text-base font-semibold text-gray-900">CPU Utilization by Session</h3>
            <p className="text-xs text-gray-500 mt-0.5"></p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-xs font-semibold text-gray-600">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
              <span className="text-xs font-semibold text-gray-600">Baseline</span>
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="w-full">
          {/* Tooltip */}
          {hoveredPoint && (
            <div
              className="absolute z-10 pointer-events-none bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-gray-700 transition-all duration-75 transform -translate-x-1/2 -translate-y-full"
              style={{
                left: `${(hoveredPoint.x / width) * 100}%`,
                top: `${((hoveredPoint.y / height) * 100)}%`,
                marginTop: '-16px'
              }}
            >
              <div className="font-bold mb-1 border-b border-gray-700 pb-1">{formatTime(hoveredPoint.time)}</div>
              <div className="text-blue-200 pt-1">CPU Load: <span className="font-mono text-white ml-1 font-bold">{hoveredPoint.cpuPct}%</span></div>
            </div>
          )}

          <div className="h-full w-full">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines with Y-Axis Labels */}
              {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((tick, i) => {
                const y = paddingY + graphHeight - (tick * graphHeight);
                const percentage = Math.round(tick * 100);
                return (
                  <g key={i}>
                    <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                    <text x={paddingX - 10} y={y + 4} textAnchor="end" className="text-[11px] font-bold fill-gray-400">
                      {percentage}%
                    </text>
                  </g>
                )
              })}

              {/* Area & Line */}
              <path d={areaContent} fill="url(#chartGradient)" />
              <path d={pathContent} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {/* Interactive Points */}
              {points.map((p, i) => (
                <g key={i} onMouseEnter={() => setHoveredPoint(p)} onMouseLeave={() => setHoveredPoint(null)} className="cursor-pointer">
                  <circle cx={p.x} cy={p.y} r="20" fill="transparent" />
                  <circle cx={p.x} cy={p.y} r={hoveredPoint === p ? 6 : 4} fill={hoveredPoint === p ? "#3b82f6" : "white"} stroke="#3b82f6" strokeWidth="2" className="transition-all duration-200" />
                </g>
              ))}

              {/* X Axis Labels */}
              {points.filter((_, i) => i % 2 === 0).map((p, i, arr) => (
                <text key={i} x={p.x} y={height - 10} textAnchor={i === 0 ? "start" : i === arr.length - 1 ? "end" : "middle"} className="text-[11px] font-bold fill-gray-400">
                  {formatTime(p.time)}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'table-only') {
    // Table only mode
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-100 rounded text-green-700">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Active High-Load Sessions</h3>
          </div>
        </div>
        <div className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="w-[80px] pl-6">Rank</TableHead>
                <TableHead>SID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Program</TableHead>
                <TableHead className="w-[200px]">CPU Utilization</TableHead>
                <TableHead className="text-right pr-6">Time Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSessions.map((session, index) => (
                <TableRow key={session.sid} className="group hover:bg-blue-50/30 cursor-pointer transition-colors" onClick={() => onSessionClick?.(session)}>
                  <TableCell className="pl-6 font-medium text-gray-500">
                    {index < 3 ? (
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${index === 0 ? "bg-yellow-100 text-yellow-700" : index === 1 ? "bg-gray-100 text-gray-700" : "bg-orange-100 text-orange-700"}`}>
                        {index + 1}
                      </span>
                    ) : (
                      <span className="ml-2 text-sm">#{index + 1}</span>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-sm font-bold text-blue-600 group-hover:underline">{session.sid}</TableCell>
                  <TableCell className="font-medium text-gray-900">{session.username}</TableCell>
                  <TableCell className="text-gray-500 text-xs max-w-[150px] truncate" title={session.program}>{session.program}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-2.5 flex-1 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div className={`h-full rounded-full shadow-sm transition-all duration-700 ${session.cpuPercent > 80 ? 'bg-gradient-to-r from-red-500 to-red-600' : session.cpuPercent > 50 ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'}`} style={{ width: `${session.cpuPercent}%` }} />
                      </div>
                      <span className="text-xs font-bold w-10 text-right font-mono text-gray-700">{session.cpuPercent}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6 font-mono text-xs text-gray-500">
                    <div className="flex items-center justify-end gap-1.5">
                      <Clock className="w-3 h-3 text-gray-400" />
                      {formatCPUTime(session.cpuTime)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  // Full mode - side-by-side layout
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-lg shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">CPU Utilization by Session</h2>
              <p className="text-sm text-gray-600 mt-1">Real-time monitoring and analysis of session-level CPU consumption</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="font-semibold text-gray-700">Current Load</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <div className="w-3 h-3 rounded-full border-2 border-gray-400"></div>
              <span className="font-semibold text-gray-700">Baseline</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Graph Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-base font-semibold text-gray-900">CPU Trend Analysis</h3>
          </div>

          <div className="relative w-full">
            {/* Tooltip */}
            {hoveredPoint && (
              <div
                className="absolute z-10 pointer-events-none bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-gray-700 transition-all duration-75 transform -translate-x-1/2 -translate-y-full"
                style={{
                  left: `${(hoveredPoint.x / width) * 100}%`,
                  top: `${((hoveredPoint.y / height) * 100)}%`,
                  marginTop: '-16px'
                }}
              >
                <div className="font-bold mb-1 border-b border-gray-700 pb-1">{formatTime(hoveredPoint.time)}</div>
                <div className="text-blue-200 pt-1">CPU: <span className="font-mono text-white ml-1 font-bold">{hoveredPoint.cpuPct}%</span></div>
              </div>
            )}

            <div className="h-[400px] w-full">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="chartGradientFull" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines with Y-Axis Labels */}
                {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((tick, i) => {
                  const y = paddingY + graphHeight - (tick * graphHeight);
                  const percentage = Math.round(tick * 100);
                  return (
                    <g key={i}>
                      <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                      <text x={paddingX - 10} y={y + 4} textAnchor="end" className="text-[11px] font-bold fill-gray-400">
                        {percentage}%
                      </text>
                    </g>
                  )
                })}

                {/* Area & Line */}
                <path d={areaContent} fill="url(#chartGradientFull)" />
                <path d={pathContent} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Interactive Points */}
                {points.map((p, i) => (
                  <g key={i} onMouseEnter={() => setHoveredPoint(p)} onMouseLeave={() => setHoveredPoint(null)} className="cursor-pointer">
                    <circle cx={p.x} cy={p.y} r="20" fill="transparent" />
                    <circle cx={p.x} cy={p.y} r={hoveredPoint === p ? 6 : 4} fill={hoveredPoint === p ? "#3b82f6" : "white"} stroke="#3b82f6" strokeWidth="2" className="transition-all duration-200" />
                  </g>
                ))}

                {/* X Axis Labels */}
                {points.filter((_, i) => i % 2 === 0).map((p, i, arr) => (
                  <text key={i} x={p.x} y={height - 10} textAnchor={i === 0 ? "start" : i === arr.length - 1 ? "end" : "middle"} className="text-[11px] font-bold fill-gray-400">
                    {formatTime(p.time)}
                  </text>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-base font-semibold text-gray-900">Top Sessions by CPU</h3>
            <p className="text-xs text-gray-500 mt-0.5">Active high-load sessions ranked by utilization</p>
          </div>

          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                  <TableHead className="w-[60px] pl-6">Rank</TableHead>
                  <TableHead>SID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>CPU %</TableHead>
                  <TableHead className="text-right pr-6">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSessions.map((session, index) => (
                  <TableRow key={session.sid} className="group hover:bg-blue-50/30 cursor-pointer transition-colors" onClick={() => onSessionClick?.(session)}>
                    <TableCell className="pl-6 font-medium text-gray-500">
                      {index < 3 ? (
                        <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${index === 0 ? "bg-yellow-100 text-yellow-700" : index === 1 ? "bg-gray-100 text-gray-700" : "bg-orange-100 text-orange-700"}`}>
                          {index + 1}
                        </span>
                      ) : (
                        <span className="ml-2 text-sm">#{index + 1}</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-sm font-bold text-blue-600 group-hover:underline">{session.sid}</TableCell>
                    <TableCell className="font-medium text-gray-900 text-sm">{session.username}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${session.cpuPercent > 80 ? 'bg-red-500' : session.cpuPercent > 50 ? 'bg-orange-500' : 'bg-blue-500'}`} style={{ width: `${session.cpuPercent}%` }} />
                        </div>
                        <span className="text-xs font-bold w-10 text-right font-mono">{session.cpuPercent}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6 font-mono text-xs text-gray-500">
                      <div className="flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {formatCPUTime(session.cpuTime)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      {sessions && sessions.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <ChartAreaLinear chartData={sessions} />
          <ChartAreaLinear chartData={sessions} />
        </div>
      )}
    </div>
  );
}

function ChartAreaLinear({ chartData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Linear</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(12, 16)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" labelFormatter={(value) => value.slice(12, 16)} />}
            />
            <Area
              dataKey="cpuPercent"
              type="linear"
              fill="#ffffffff"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}