import { TrendingUp, Cpu } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import React, { useMemo } from "react";

const MAX_CPU_VALUE = 100000; // adjust to your system baseline

function formatTime(ts) {
  return new Date(ts).toUTCString().slice(17, 22); // HH:MM
}


export function CPUBySession({ sessions, onSessionClick }) {
  // Sort by CPU percent descending
  const sortedSessions = [...sessions].sort((a, b) => b.cpuPercent - a.cpuPercent);
  const topSessions = sortedSessions.slice(0, 10);
   const width = 1400;
  const height = 400;
  const padding = 0;
   const processed = useMemo(() => {
    return [...sessions]
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .map(d => ({
        time: d.timestamp,
        cpuPct: d.cpuPercent,
      }));
  }, [sessions]);

  const xStep = (width) / (processed.length - 1);

  // Line path (X = time, Y = CPU %)
  const path = processed
    .map((d, i) => {
      const x =  i * xStep;
      const y =
        height -
        (d.cpuPct / 100) * height;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const areaPath =
    path +
    ` L ${(processed.length - 1) * xStep} ${
      height
    } L 0 ${height} Z`;


  const chartData = topSessions.map(s => ({
    name: `${s.sid}`,
    value: s.cpuPercent,
    username: s.username,
  }));

  const getBarColor = (value) => {
    if (value >= 70) return '#dc2626'; // red
    if (value >= 40) return '#ea580c'; // orange
    return '#2563eb'; // blue
  };

  const formatCPUTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Cpu className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">CPU Utilization by Session</h3>
      </div>

      {/* Chart */}
      {/* <div className="mb-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis type="number" domain={[0, 100]} unit="%" stroke="#6b7280" />
              <YAxis type="category" dataKey="name" width={60} stroke="#6b7280" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                        <p className="text-sm font-semibold text-gray-900">SID: {data.name}</p>
                        <p className="text-sm text-gray-600">User: {data.username}</p>
                        <p className="text-sm font-medium text-blue-600">{data.value}% CPU</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div> */}
      <div className="mb-6">
   
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          Session CPU Usage (%)
        </span>
        <span className="text-xs text-slate-400">
          15 min intervals (UTC)
        </span>
      </div>

      <div className="relative h-[400px] w-full">
        {/* Grid */}
        <div className="absolute inset-0 flex flex-col justify-between opacity-30">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border-t border-slate-200 dark:border-slate-700"
            />
          ))}
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3c83f6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3c83f6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area */}
          <path d={areaPath} fill="url(#areaGradient)" />

          {/* Line */}
          <path
            d={path}
            fill="none"
            stroke="#3c83f6"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Points */}
          {processed.map((d, i) => {
            const x = padding + i * xStep;
            const y =
              height - padding -
              (d.cpuPct / 100) * (height - padding * 2);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={6} fill="#3c83f6" fillOpacity="0.2" />
                <circle cx={x} cy={y} r={3} fill="#3c83f6" />
              </g>
            );
          })}
        </svg>

        {/* Y-Axis → CPU % */}
        <div className="absolute -left-12 inset-y-0 flex flex-col justify-between text-xs font-bold text-slate-400 py-1">
          <span>100%</span>
          <span>80%</span>
          <span>60%</span>
          <span>40%</span>
          <span>20%</span>
          <span>0%</span>
        </div>
      </div>

      {/* X-Axis → Time */}
      <div className="flex justify-between mt-4 text-xs font-bold text-slate-400 px-1">
        {processed.map(d => (
          <span key={d.time}>{formatTime(d.time)}</span>
        ))}
      </div>
    </div>
       </div>

      {/* Detailed Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Rank</TableHead>
              <TableHead>SID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>CPU %</TableHead>
              <TableHead>CPU Time</TableHead>
              {/* <TableHead>SQL ID</TableHead>
              <TableHead>Status</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSessions.map((session, index) => (
              <TableRow
                key={session.sid}
                className={`
                  cursor-pointer transition-colors
                  ${session.cpuPercent >= 70 ? 'bg-red-50' : session.cpuPercent >= 40 ? 'bg-orange-50' : 'hover:bg-gray-50'}
                `}
                onClick={() => onSessionClick?.(session)}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${index < 3 ? 'text-red-600' : 'text-gray-600'}`}>
                      #{index + 1}
                    </span>
                    {index < 3 && <TrendingUp className="w-4 h-4 text-red-500" />}
                  </div>
                </TableCell>
                <TableCell>
                  <button 
                    className="text-blue-600 hover:text-blue-800 hover:underline font-mono"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSessionClick?.(session);
                    }}
                  >
                    {session.sid}
                  </button>
                </TableCell>
                <TableCell className="font-medium">{session.username}</TableCell>
                <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                  {session.program}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 max-w-[100px]">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            session.cpuPercent >= 70 ? 'bg-red-600' :
                            session.cpuPercent >= 40 ? 'bg-orange-500' :
                            'bg-blue-600'
                          }`}
                          style={{ width: `${session.cpuPercent}%` }}
                        />
                      </div>
                    </div>
                    <span className={`font-semibold ${
                      session.cpuPercent >= 70 ? 'text-red-600' :
                      session.cpuPercent >= 40 ? 'text-orange-600' :
                      'text-gray-900'
                    }`}>
                      {session.cpuPercent}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {formatCPUTime(session.cpuTime)}
                </TableCell>
                {/* <TableCell className="font-mono text-sm text-gray-700">
                  {session.sqlId}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    session.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {session.status}
                  </span>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

