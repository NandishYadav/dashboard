import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Zap, Hourglass, BedDouble, MoreHorizontal, Activity } from 'lucide-react';

const mockData = [
  { time: '14:00', active: 30, waiting: 5, idle: 165 },
  { time: '14:05', active: 35, waiting: 8, idle: 160 },
  { time: '14:10', active: 38, waiting: 6, idle: 158 },
  { time: '14:15', active: 32, waiting: 10, idle: 160 },
  { time: '14:20', active: 45, waiting: 15, idle: 142 },
  { time: '14:25', active: 55, waiting: 12, idle: 135 },
  { time: '14:30', active: 60, waiting: 8, idle: 134 },
  { time: '14:35', active: 50, waiting: 14, idle: 138 },
  { time: '14:40', active: 48, waiting: 10, idle: 144 },
  { time: '14:45', active: 42, waiting: 12, idle: 148 },
  { time: '14:50', active: 35, waiting: 8, idle: 159 },
  { time: '14:55', active: 38, waiting: 6, idle: 158 },
  { time: '15:00', active: 30, waiting: 5, idle: 167 },
];

export function BlockingGraph({ mode = 'full' }) {

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const activeVal = payload.find(p => p.dataKey === 'active')?.value || 0;
      const waitingVal = payload.find(p => p.dataKey === 'waiting')?.value || 0;
      const idleVal = payload.find(p => p.dataKey === 'idle')?.value || 0;
      const total = activeVal + waitingVal + idleVal;

      return (
        <div className="bg-white rounded-xl shadow-xl border border-blue-500 p-4 min-w-[180px]">
          <p className="text-xs font-bold text-gray-500 mb-3">Today, {label}:00</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm font-semibold text-gray-700">Active</span>
              </div>
              <span className="text-sm font-black text-gray-900">{activeVal}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                <span className="text-sm font-semibold text-gray-700">Waiting</span>
              </div>
              <span className="text-sm font-black text-orange-500">{waitingVal}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-sm font-semibold text-gray-700">Idle</span>
              </div>
              <span className="text-sm font-black text-gray-900">{idleVal}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Load</span>
            <span className="text-sm font-black text-gray-900">{total}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Part 1: Graph Section
  const GraphSection = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-base font-semibold text-gray-900">Session Distribution</h3>
            <p className="text-xs text-gray-500 mt-0.5">Active, waiting, and idle sessions over time</p>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500"></div>
              <span className="text-sm font-semibold text-gray-500">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-400"></div>
              <span className="text-sm font-semibold text-gray-500">Waiting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-300"></div>
              <span className="text-sm font-semibold text-gray-500">Idle</span>
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f1f5f9" />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: 'bold', fill: '#64748b' }}
                dy={10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }} />

              <Area
                type="monotone"
                dataKey="idle"
                stackId="1"
                stroke="#cbd5e1"
                fill="#cbd5e1"
                fillOpacity={0.3}
                strokeWidth={2}
                activeDot={{ r: 4, stroke: 'white', strokeWidth: 2, fill: '#94a3b8' }}
              />
              <Area
                type="monotone"
                dataKey="waiting"
                stackId="1"
                stroke="#fb923c"
                fill="#fb923c"
                fillOpacity={0.3}
                strokeWidth={2}
                activeDot={{ r: 4, stroke: 'white', strokeWidth: 2, fill: '#fb923c' }}
              />
              <Area
                type="monotone"
                dataKey="active"
                stackId="1"
                stroke="#3b82f6"
                fill="url(#activeGradient)"
                strokeWidth={2}
                activeDot={{ r: 4, stroke: 'white', strokeWidth: 2, fill: '#3b82f6' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  // Part 2: Cards Section
  const CardsSection = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-base font-semibold text-gray-900">Session Metrics</h3>
            <p className="text-xs text-gray-500 mt-0.5">Current session statistics and trends</p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Active */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Active Sessions</h4>
                <span className="text-3xl font-black text-gray-900">42</span>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Zap className="w-5 h-5 text-blue-500" fill="currentColor" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-green-500 flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                12%
              </span>
              <span className="text-gray-400 font-medium">vs last 15m</span>
            </div>
          </div>

          {/* Card 2: Waiting */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Waiting Sessions</h4>
                <span className="text-3xl font-black text-gray-900">8</span>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <Hourglass className="w-5 h-5 text-orange-400" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-red-500 flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                4%
              </span>
              <span className="text-gray-400 font-medium">vs last 15m</span>
            </div>
          </div>

          {/* Card 3: Idle */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Idle Sessions</h4>
                <span className="text-3xl font-black text-gray-900">156</span>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <BedDouble className="w-5 h-5 text-gray-500" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-gray-500 flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                  <polyline points="17 18 23 18 23 12"></polyline>
                </svg>
                2%
              </span>
              <span className="text-gray-400 font-medium">vs last 15m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render based on mode
  if (mode === 'graph-only') {
    return <GraphSection />;
  }

  if (mode === 'cards-only') {
    return <CardsSection />;
  }

  // Full mode - both sections
  return (
    <div className="flex flex-col gap-6">
      <CardsSection />
      <GraphSection />
    </div>
  );
}
