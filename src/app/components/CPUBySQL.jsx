import { Database, Cpu, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function CPUBySQL({ queries, onQueryClick, mode = 'full' }) {
  const [expandedRows, setExpandedRows] = useState(new Set());

  // Sort by CPU percent descending
  const sortedQueries = [...queries].sort((a, b) => b.cpuPercent - a.cpuPercent);
  const topQueries = sortedQueries.slice(0, 10);

  /* ---------- GRAPH CONFIG ---------- */
  const width = 1400;
  const height = 280;
  const maxCPU = 100; // CPU %

  /* ---------- NORMALIZE DATA ---------- */
  const points = useMemo(() => {
    if (!queries?.length) return [];

    const sorted = [...queries].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    return sorted.map((d, i, arr) => {
      const x = (i / (arr.length - 1)) * width; // 🔑 NO PADDING
      const y =
        height -
        (d.cpuPercent / maxCPU) * height;

      return { ...d, x, y };
    });
  }, [queries]);

  /* ---------- SPLINE PATH ---------- */
  const linePath = useMemo(() => {
    if (points.length < 2) return "";

    return points.reduce((path, point, i, arr) => {
      if (i === 0) return `M ${point.x},${point.y}`;

      const prev = arr[i - 1];
      const dx = (point.x - prev.x) / 2;

      return `${path}
        C ${prev.x + dx},${prev.y}
          ${point.x - dx},${point.y}
          ${point.x},${point.y}`;
    }, "");
  }, [points]);

  const areaPath = `
    ${linePath}
    L ${points.at(-1)?.x},${height}
    L ${points[0]?.x},${height}
    Z
  `;

  const formatCPUTime = (seconds) => {
    if (seconds < 60) return `${seconds.toFixed(2)}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ${(seconds % 60).toFixed(0)}s`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  const toggleRow = (id) => {
    const newExpanded = new Set(expandedRows);
    if (expandedRows.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  // Graph Component
  const GraphSection = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-base font-semibold text-gray-900">CPU Utilization by SQL</h3>
              <p className="text-xs text-gray-500 mt-0.5"></p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-600 font-medium">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-gray-600 font-medium">Baseline</span>
            </div>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="relative w-full" style={{ height: '280px' }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          <defs>
            <linearGradient id="sqlAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3c83f6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3c83f6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {[0, 25, 50, 75, 100].map(pct => {
            const y = height - (pct / 100) * height;
            return (
              <line
                key={pct}
                x1={0}
                x2={width}
                y1={y}
                y2={y}
                className="stroke-gray-200"
                strokeWidth="1"
              />
            );
          })}

          {/* Area */}
          <path d={areaPath} fill="url(#sqlAreaGradient)" />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#3c83f6"
            strokeWidth="3"
          />

          {/* Points */}
          {points.map(p => (
            <circle
              key={p.timestamp}
              cx={p.x}
              cy={p.y}
              r={5}
              className="fill-blue-500 stroke-white stroke-2"
            />
          ))}
        </svg>

        {/* Y-axis labels - positioned inside */}
        <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-[10px] font-semibold text-gray-500 py-2">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>
      </div>

      {/* X-axis */}
      <div className="px-6 pb-4">
        <div className="flex justify-between text-xs font-medium text-gray-500">
          {points.map((p, i) => {
            // Show only first, middle, and last labels to avoid crowding
            if (i === 0 || i === Math.floor(points.length / 2) || i === points.length - 1) {
              return <span key={p.timestamp}>{formatTime(p.timestamp)}</span>;
            }
            return <span key={p.timestamp} className="invisible">{formatTime(p.timestamp)}</span>;
          })}
        </div>
      </div>
    </div>
  );

  // Table Component
  const TableSection = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-base font-semibold text-gray-900">Top SQL Queries by CPU</h3>
            <p className="text-xs text-gray-500 mt-0.5">Detailed metrics and execution statistics</p>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-8"></TableHead>
              <TableHead>Rank</TableHead>
              <TableHead>SQL ID</TableHead>
              <TableHead>CPU %</TableHead>
              <TableHead>CPU Time</TableHead>
              <TableHead>Executions</TableHead>
              <TableHead>Avg CPU/Exec</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>SQL Text</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedQueries.flatMap((query, index) => {
              const rows = [
                <TableRow
                  key={query.sqlId}
                  className={`
                    cursor-pointer transition-colors
                    ${query.cpuPercent >= 70 ? 'bg-red-50' : query.cpuPercent >= 40 ? 'bg-orange-50' : 'hover:bg-gray-50'}
                  `}
                  onClick={() => onQueryClick?.(query)}
                >
                  <TableCell>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRow(query.sqlId);
                      }}
                      className="hover:bg-gray-200 rounded p-1"
                    >
                      {expandedRows.has(query.sqlId) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${index < 3 ? 'text-red-600' : 'text-gray-600'}`}>
                        #{index + 1}
                      </span>
                      {index < 3 && <Cpu className="w-4 h-4 text-red-500" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <button
                      className="text-blue-600 hover:text-blue-800 hover:underline font-mono text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQueryClick?.(query);
                      }}
                    >
                      {query.sqlId}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[100px]">
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${query.cpuPercent >= 70 ? 'bg-red-600' :
                              query.cpuPercent >= 40 ? 'bg-orange-500' :
                                'bg-blue-600'
                              }`}
                            style={{ width: `${query.cpuPercent}%` }}
                          />
                        </div>
                      </div>
                      <span className={`font-semibold ${query.cpuPercent >= 70 ? 'text-red-600' :
                        query.cpuPercent >= 40 ? 'text-orange-600' :
                          'text-gray-900'
                        }`}>
                        {query.cpuPercent}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatCPUTime(query.cpuTime)}
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900">
                    {query.executions.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-gray-700">
                    {formatCPUTime(query.avgCpuPerExec)}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {query.module}
                  </TableCell>
                  <TableCell className="max-w-md truncate text-sm text-gray-600">
                    {query.sqlText}
                  </TableCell>
                </TableRow>
              ];

              if (expandedRows.has(query.sqlId)) {
                rows.push(
                  <TableRow key={`${query.sqlId}-expanded`} className="bg-gray-50">
                    <TableCell colSpan={9} className="p-4">
                      <div className="bg-white rounded border border-gray-200 p-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Total Elapsed Time</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {formatCPUTime(query.elapsedTime)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">CPU Efficiency</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {((query.cpuTime / query.elapsedTime) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 mb-2">Full SQL Text:</p>
                        <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap overflow-x-auto bg-gray-900 text-green-400 p-3 rounded">
                          {query.sqlText}
                        </pre>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              }

              return rows;
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  // Render based on mode
  if (mode === 'graph-only') {
    return <GraphSection />;
  }

  if (mode === 'table-only') {
    return <TableSection />;
  }

  // Full mode - side-by-side layout
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-lg shadow-lg">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">CPU Utilization by SQL</h2>
              <p className="text-sm text-gray-600 mt-1">Real-time monitoring and analysis of SQL query CPU consumption</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="font-semibold text-gray-700">Current Load</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
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
            <p className="text-xs text-gray-500 mt-0.5"></p>
          </div>

          {/* Graph */}
          <div className="relative w-full" style={{ height: '280px' }}>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
              <defs>
                <linearGradient id="sqlAreaGradientFull" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3c83f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3c83f6" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 25, 50, 75, 100].map(pct => {
                const y = height - (pct / 100) * height;
                return (
                  <line
                    key={pct}
                    x1={0}
                    x2={width}
                    y1={y}
                    y2={y}
                    className="stroke-gray-200"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Area */}
              <path d={areaPath} fill="url(#sqlAreaGradientFull)" />

              {/* Line */}
              <path
                d={linePath}
                fill="none"
                stroke="#3c83f6"
                strokeWidth="3"
              />

              {/* Points */}
              {points.map(p => (
                <circle
                  key={p.timestamp}
                  cx={p.x}
                  cy={p.y}
                  r={5}
                  className="fill-blue-500 stroke-white stroke-2"
                />
              ))}
            </svg>

            {/* Y-axis labels */}
            <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-[10px] font-semibold text-gray-500 py-2">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
          </div>

          {/* X-axis */}
          <div className="px-6 pb-4">
            <div className="flex justify-between text-xs font-medium text-gray-500">
              {points.map((p, i) => {
                if (i === 0 || i === Math.floor(points.length / 2) || i === points.length - 1) {
                  return <span key={p.timestamp}>{formatTime(p.timestamp)}</span>;
                }
                return <span key={p.timestamp} className="invisible">{formatTime(p.timestamp)}</span>;
              })}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-base font-semibold text-gray-900">Top SQL Queries</h3>
            <p className="text-xs text-gray-500 mt-0.5">Ranked by CPU utilization</p>
          </div>

          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-[60px] pl-6">Rank</TableHead>
                  <TableHead>SQL ID</TableHead>
                  <TableHead>CPU %</TableHead>
                  <TableHead className="text-right pr-6">Executions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topQueries.map((query, index) => (
                  <TableRow
                    key={query.sqlId}
                    className={`cursor-pointer transition-colors ${query.cpuPercent >= 70 ? 'bg-red-50 hover:bg-red-100' : query.cpuPercent >= 40 ? 'bg-orange-50 hover:bg-orange-100' : 'hover:bg-gray-50'}`}
                    onClick={() => onQueryClick?.(query)}
                  >
                    <TableCell className="pl-6 font-medium text-gray-500">
                      {index < 3 ? (
                        <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${index === 0 ? "bg-yellow-100 text-yellow-700" : index === 1 ? "bg-gray-100 text-gray-700" : "bg-orange-100 text-orange-700"}`}>
                          {index + 1}
                        </span>
                      ) : (
                        <span className="ml-2 text-sm">#{index + 1}</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-sm font-bold text-blue-600 hover:underline">{query.sqlId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${query.cpuPercent >= 70 ? 'bg-red-600' : query.cpuPercent >= 40 ? 'bg-orange-500' : 'bg-blue-600'}`} style={{ width: `${query.cpuPercent}%` }} />
                        </div>
                        <span className="text-xs font-bold w-10 text-right font-mono">{query.cpuPercent}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6 font-mono text-xs text-gray-600">
                      {query.executions.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}