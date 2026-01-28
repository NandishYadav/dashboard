import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export function KPICard({ title, value, trend, severity, sparklineData }) {
  const severityColors = {
    normal: 'text-green-600 border-green-200 bg-green-50',
    warning: 'text-orange-600 border-orange-200 bg-orange-50',
    critical: 'text-red-600 border-red-200 bg-red-50',
  };

  const lineColors = {
    normal: '#16a34a',
    warning: '#ea580c',
    critical: '#dc2626',
  };

  const chartData = sparklineData.map((value, index) => ({ value, index }));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">{value}</span>
            {trend === 'up' && <TrendingUp className="w-5 h-5 text-red-500" />}
            {trend === 'down' && <TrendingDown className="w-5 h-5 text-green-500" />}
            {trend === 'stable' && <Minus className="w-5 h-5 text-gray-400" />}
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full border ${severityColors[severity]}`}>
          <span className="text-xs font-medium uppercase">{severity}</span>
        </div>
      </div>
      
      <div className="h-12 -mb-2">
        <ResponsiveContainer width="100%" height={48}>
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColors[severity]}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}