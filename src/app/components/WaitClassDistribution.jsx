import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = {
  'CPU': '#16a34a',
  'User I/O': '#2563eb',
  'Application': '#dc2626',
  'Concurrency': '#ea580c',
  'System I/O': '#8b5cf6',
  'Other': '#6b7280',
};

export function WaitClassDistribution({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Wait Class Distribution</h3>
      
      <div className="flex items-center gap-8">
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS.Other} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value}%`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[item.name] || COLORS.Other }}
                ></div>
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold text-gray-900">{item.value}%</span>
                <span className="text-xs text-gray-500">
                  ({Math.round((item.value / 100) * total)} sessions)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}