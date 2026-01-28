import { HardDrive } from 'lucide-react';
import { Progress } from '@/app/components/ui/progress';

export function StorageHealth({ tablespaces }) {
  const getThresholdColor = (percent) => {
    if (percent >= 90) return 'bg-red-600';
    if (percent >= 80) return 'bg-orange-500';
    return 'bg-green-600';
  };

  const getThresholdBg = (percent) => {
    if (percent >= 90) return 'bg-red-50 border-red-200';
    if (percent >= 80) return 'bg-orange-50 border-orange-200';
    return 'bg-green-50 border-green-200';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <HardDrive className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">Tablespace Storage</h3>
      </div>

      <div className="space-y-4">
        {tablespaces.map((ts) => (
          <div key={ts.name} className={`p-4 rounded-lg border ${getThresholdBg(ts.usedPercent)}`}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium text-gray-900">{ts.name}</p>
                <p className="text-sm text-gray-600">
                  {ts.freeMB.toLocaleString()} MB free of {ts.totalMB.toLocaleString()} MB
                </p>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${
                  ts.usedPercent >= 90 ? 'text-red-600' : 
                  ts.usedPercent >= 80 ? 'text-orange-600' : 
                  'text-green-600'
                }`}>
                  {ts.usedPercent}%
                </p>
                <p className="text-xs text-gray-500">Used</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getThresholdColor(ts.usedPercent)} transition-all duration-500`}
                  style={{ width: `${ts.usedPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
