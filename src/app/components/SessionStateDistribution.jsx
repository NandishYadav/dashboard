import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Activity } from 'lucide-react';

const data = [
  { name: 'Active', value: 12, color: '#22c55e' }, // green-500
  { name: 'Waiting', value: 5, color: '#f97316' }, // orange-500
  { name: 'Idle', value: 33, color: '#94a3b8' },   // slate-400
];

export function SessionStateDistribution() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">Session State</h3>
      </div>
      
      <div className="flex-1 min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-3xl font-bold text-gray-900">50</span>
          <span className="text-xs text-gray-500 uppercase font-semibold">Total Sessions</span>
        </div>
      </div>
    </div>
  );
}
