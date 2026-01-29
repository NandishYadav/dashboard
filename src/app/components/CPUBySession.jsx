import React, { useMemo, useState } from "react";
import { Activity, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';

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
  const width = 1400;
  const height = 400;
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

  return (
    <div className="flex flex-col gap-6 h-full">

      {/* 1. CHART SECTION */}
      {(mode === 'full' || mode === 'graph-only') && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 pb-2 bg-white">
            <div>
              <h3 className="text-lg font-bold text-slate-900">CPU Utilization by Session</h3>
              <p className="text-sm text-slate-400 font-medium">Monitoring period: {processed.length > 0 ? `${formatTime(processed[0].time)} to ${formatTime(processed[processed.length - 1].time)} UTC` : 'Loading...'}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2 border-slate-300"></div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Baseline</span>
              </div>
            </div>
          </div>

          {/* Chart Content */}
          <div className="relative w-full px-6 pb-6 pt-6 flex-1">
            {/* Tooltip Overlay */}
            {hoveredPoint && (
              <div
                className="absolute z-10 pointer-events-none bg-slate-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-slate-700 transition-all duration-75 transform -translate-x-1/2 -translate-y-full"
                style={{
                  left: `${(hoveredPoint.x / width) * 100}%`,
                  top: `${((hoveredPoint.y / height) * 100)}%`,
                  marginTop: '-16px'
                }}
              >
                <div className="font-bold mb-1 border-b border-slate-700 pb-1">{formatTime(hoveredPoint.time)}</div>
                <div className="text-blue-200 pt-1">CPU Load: <span className="font-mono text-white ml-1 font-bold">{hoveredPoint.cpuPct}%</span></div>
              </div>
            )}

            <div className="h-[320px] w-full">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid Lines with Y-Axis Labels */}
                {[0, 0.2, 0.4, 0.6, 0.8, 1].map((tick, i) => {
                  const y = paddingY + graphHeight - (tick * graphHeight);
                  const percentage = Math.round(tick * 100);
                  return (
                    <g key={i}>
                      <line
                        x1={paddingX} y1={y}
                        x2={width - paddingX} y2={y}
                        stroke="#f1f5f9"
                        strokeWidth="1"
                      />
                      <text
                        x={paddingX - 10}
                        y={y + 4}
                        textAnchor="end"
                        className="text-[11px] font-bold fill-slate-400"
                      >
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
                  <g key={i}
                    onMouseEnter={() => setHoveredPoint(p)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    className="cursor-pointer group"
                  >
                    <circle cx={p.x} cy={p.y} r="20" fill="transparent" /> {/* Larger hit area */}
                    <circle
                      cx={p.x} cy={p.y} r={hoveredPoint === p ? 6 : 4}
                      fill={hoveredPoint === p ? "#3b82f6" : "white"}
                      stroke="#3b82f6"
                      strokeWidth="2"
                      className="transition-all duration-200"
                    />
                  </g>
                ))}

                {/* X Axis Labels */}
                {points.filter((_, i) => i % 2 === 0).map((p, i, arr) => (
                  <text key={i} x={p.x} y={height - 10}
                    textAnchor={i === 0 ? "start" : i === arr.length - 1 ? "end" : "middle"}
                    className="text-[11px] font-bold fill-slate-400">
                    {formatTime(p.time)}
                  </text>
                ))}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* 2. TABLE SECTION */}
      {(mode === 'full' || mode === 'table-only') && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-1">
          {/* Header */}
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
                  <TableRow key={session.sid}
                    className="group hover:bg-blue-50/30 cursor-pointer transition-colors"
                    onClick={() => onSessionClick?.(session)}
                  >
                    <TableCell className="pl-6 font-medium text-gray-500">
                      {index < 3 ? (
                        <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${index === 0 ? "bg-yellow-100 text-yellow-700" :
                          index === 1 ? "bg-gray-100 text-gray-700" :
                            "bg-orange-100 text-orange-700"
                          }`}>
                          {index + 1}
                        </span>
                      ) : (
                        <span className="ml-2 text-sm">#{index + 1}</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-sm font-bold text-blue-600 group-hover:underline">
                      {session.sid}
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      {session.username}
                    </TableCell>
                    <TableCell className="text-gray-500 text-xs max-w-[150px] truncate" title={session.program}>
                      {session.program}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-2.5 flex-1 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                          <div
                            className={`h-full rounded-full shadow-sm transition-all duration-700 ${session.cpuPercent > 80 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                              session.cpuPercent > 50 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                                'bg-gradient-to-r from-blue-500 to-blue-600'
                              }`}
                            style={{ width: `${session.cpuPercent}%` }}
                          />
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
      )}
    </div>
  );
}
