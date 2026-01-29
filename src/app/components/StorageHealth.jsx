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
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* CRITICAL CARD 1: USERS */}
      <div className="flex flex-col rounded-xl shadow-lg border-2 border-red-200 dark:border-red-900/50 bg-[#FEF2F2] dark:bg-[#2D1616] p-6 transition-transform hover:scale-[1.02]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              PROD-01
            </p>
            <h3 className="text-xl font-black text-[#0d131c] dark:text-white">
              USERS
            </h3>
          </div>
          <span className="material-symbols-outlined text-[#49699c] dark:text-gray-400 cursor-pointer hover:text-primary">
            more_vert
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-6 relative">
          <div className="radial-progress size-40">
            <svg className="size-40">
              <circle
                className="text-red-100 dark:text-red-900/20"
                cx={80}
                cy={80}
                fill="transparent"
                r={70}
                stroke="currentColor"
                strokeWidth={12}
              />
              <circle
                className="text-red-500"
                cx={80}
                cy={80}
                fill="transparent"
                r={70}
                stroke="currentColor"
                strokeDasharray="439.8"
                strokeDashoffset="26.4"
                strokeLinecap="round"
                strokeWidth={12}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-red-600 dark:text-red-400">
                94%
              </span>
              <span className="text-[10px] uppercase font-bold text-red-500">
                Critical
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2 border-t border-red-100 dark:border-red-900/30 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-red-800/70 dark:text-red-400/70">
              Total Size:
            </span>
            <span className="font-bold text-[#0d131c] dark:text-white">
              50,000 MB
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-red-800/70 dark:text-red-400/70">Used:</span>
            <span className="font-bold text-[#0d131c] dark:text-white">
              47,000 MB
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-red-800/70 dark:text-red-400/70">Free:</span>
            <span className="font-bold text-red-600 dark:text-red-400">
              3,000 MB
            </span>
          </div>
        </div>
        <button className="mt-6 w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-md">
          <span className="material-symbols-outlined text-sm">analytics</span>
          Analyze Growth
        </button>
      </div>
      {/* CRITICAL CARD 2: REPORTS */}
      <div className="flex flex-col rounded-xl shadow-lg border-2 border-red-200 dark:border-red-900/50 bg-[#FEF2F2] dark:bg-[#2D1616] p-6 transition-transform hover:scale-[1.02]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              PROD-01
            </p>
            <h3 className="text-xl font-black text-[#0d131c] dark:text-white">
              REPORTS
            </h3>
          </div>
          <span className="material-symbols-outlined text-[#49699c] dark:text-gray-400 cursor-pointer hover:text-primary">
            more_vert
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-6 relative">
          <div className="radial-progress size-40">
            <svg className="size-40">
              <circle
                className="text-red-100 dark:text-red-900/20"
                cx={80}
                cy={80}
                fill="transparent"
                r={70}
                stroke="currentColor"
                strokeWidth={12}
              />
              <circle
                className="text-red-500"
                cx={80}
                cy={80}
                fill="transparent"
                r={70}
                stroke="currentColor"
                strokeDasharray="439.8"
                strokeDashoffset="17.6"
                strokeLinecap="round"
                strokeWidth={12}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-red-600 dark:text-red-400">
                96%
              </span>
              <span className="text-[10px] uppercase font-bold text-red-500">
                Critical
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2 border-t border-red-100 dark:border-red-900/30 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-red-800/70 dark:text-red-400/70">
              Total Size:
            </span>
            <span className="font-bold text-[#0d131c] dark:text-white">
              100,000 MB
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-red-800/70 dark:text-red-400/70">Used:</span>
            <span className="font-bold text-[#0d131c] dark:text-white">
              96,000 MB
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-red-800/70 dark:text-red-400/70">Free:</span>
            <span className="font-bold text-red-600 dark:text-red-400">
              4,000 MB
            </span>
          </div>
        </div>
        <button className="mt-6 w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-md">
          <span className="material-symbols-outlined text-sm">analytics</span>
          Analyze Growth
        </button>
      </div>
      {/* HEALTHY CARD: SYSTEM */}
      <div className="flex flex-col rounded-xl shadow-md border border-[#e7ecf4] dark:border-gray-800 bg-white dark:bg-[#1a2332] p-6 transition-transform hover:scale-[1.02]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#49699c] dark:text-gray-400">
              PROD-02
            </p>
            <h3 className="text-xl font-black text-[#0d131c] dark:text-white">
              SYSTEM
            </h3>
          </div>
          <span className="material-symbols-outlined text-[#49699c] dark:text-gray-400 cursor-pointer hover:text-primary">
            more_vert
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-6 relative">
          <div className="radial-progress size-40">
            <svg className="size-40">
              <circle
                className="text-blue-50 dark:text-gray-800"
                cx={80}
                cy={80}
                fill="transparent"
                r={70}
                stroke="currentColor"
                strokeWidth={12}
              />
              <circle
                className="text-primary"
                cx={80}
                cy={80}
                fill="transparent"
                r={70}
                stroke="currentColor"
                strokeDasharray="439.8"
                strokeDashoffset="241.9"
                strokeLinecap="round"
                strokeWidth={12}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-[#0d131c] dark:text-white">
                45%
              </span>
              <span className="text-[10px] uppercase font-bold text-green-500">
                Healthy
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2 border-t border-[#e7ecf4] dark:border-gray-800 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-[#49699c] dark:text-gray-400">
              Total Size:
            </span>
            <span className="font-bold text-[#0d131c] dark:text-white">
              20,000 MB
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#49699c] dark:text-gray-400">Used:</span>
            <span className="font-bold text-[#0d131c] dark:text-white">
              9,000 MB
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#49699c] dark:text-gray-400">Free:</span>
            <span className="font-bold text-green-500">11,000 MB</span>
          </div>
        </div>
        <button className="mt-6 w-full py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">search</span>
          Inspect
        </button>
      </div>
      {/* WARNING CARD: DATA_IDX */}
      <div className="flex flex-col rounded-xl shadow-md border border-orange-200 dark:border-orange-900/50 bg-orange-50/30 dark:bg-orange-900/10 p-6 transition-transform hover:scale-[1.02]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              PROD-01
            </p>
            <h3 className="text-xl font-black text-[#0d131c] dark:text-white">
              DATA_IDX
            </h3>
          </div>
          <span className="material-symbols-outlined text-[#49699c] dark:text-gray-400 cursor-pointer hover:text-primary">
            more_vert
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-6 relative">
          <div className="radial-progress size-40">
            <svg className="size-40">
              <circle
                className="text-orange-100 dark:text-orange-900/20"
                cx={80}
                cy={80}
                fill="transparent"
                r={70}
                stroke="currentColor"
                strokeWidth={12}
              />
              <circle
                className="text-orange-500"
                cx={80}
                cy={80}
                fill="transparent"
                r={70}
                stroke="currentColor"
                strokeDasharray="439.8"
                strokeDashoffset="79.2"
                strokeLinecap="round"
                strokeWidth={12}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-orange-600 dark:text-orange-400">
                82%
              </span>
              <span className="text-[10px] uppercase font-bold text-orange-500">
                Warning
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2 border-t border-orange-100 dark:border-orange-900/30 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-orange-800/70 dark:text-orange-400/70">
              Total Size:
            </span>
            <span className="font-bold text-[#0d131c] dark:text-white">
              200,000 MB
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-orange-800/70 dark:text-orange-400/70">
              Used:
            </span>
            <span className="font-bold text-[#0d131c] dark:text-white">
              164,000 MB
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-orange-800/70 dark:text-orange-400/70">
              Free:
            </span>
            <span className="font-bold text-orange-600 dark:text-orange-400">
              36,000 MB
            </span>
          </div>
        </div>
        <button className="mt-6 w-full py-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">warning</span>
          Check Quota
        </button>
      </div>
    </div>
    <div>
      <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          {/* Top Visualization: Grid + Stats */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Heatmap Grid Container */}
            <div className="xl:col-span-3 bg-white dark:bg-background-dark border border-slate-200 dark:border-[#282b39] rounded-xl p-6 relative group">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">
                    grid_view
                  </span>
                  Core-Level Load Distribution
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-500">
                    <span>Idle</span>
                    <div className="w-32 h-2 rounded-full bg-gradient-to-r from-heatmap-low via-indigo-600 to-heatmap-high" />
                    <span>Peak</span>
                  </div>
                </div>
              </div>
              {/* The Heatmap Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {/* Core Squares */}
                {/* We alternate colors to simulate varied load */}
                <div
                  className="heatmap-square aspect-square rounded-lg bg-heatmap-low border border-slate-700/50 flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#2e1065" }}
                >
                  <span className="text-[10px] font-bold text-white/40">
                    C00
                  </span>
                  <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover/core:opacity-100 border border-primary/50 pointer-events-none" />
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/core:block w-32 bg-slate-900 text-white text-[10px] p-2 rounded shadow-xl z-50">
                    <div className="font-bold border-b border-white/10 pb-1 mb-1">
                      Core 00
                    </div>
                    <div>Load: 12.4%</div>
                    <div>Temp: 42°C</div>
                  </div>
                </div>
                <div
                  className="heatmap-square aspect-square rounded-lg flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#4c1d95" }}
                >
                  <span className="text-[10px] font-bold text-white/60">
                    C01
                  </span>
                </div>
                <div
                  className="heatmap-square aspect-square rounded-lg flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#7c3aed" }}
                >
                  <span className="text-[10px] font-bold text-white">C02</span>
                </div>
                <div
                  className="heatmap-square aspect-square rounded-lg flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#ff8c00" }}
                >
                  <span className="text-[10px] font-bold text-black">C03</span>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                </div>
                <div
                  className="heatmap-square aspect-square rounded-lg flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#f97316" }}
                >
                  <span className="text-[10px] font-bold text-black">C04</span>
                </div>
                <div
                  className="heatmap-square aspect-square rounded-lg flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#4c1d95" }}
                >
                  <span className="text-[10px] font-bold text-white/60">
                    C05
                  </span>
                </div>
                <div
                  className="heatmap-square aspect-square rounded-lg flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#2e1065" }}
                >
                  <span className="text-[10px] font-bold text-white/40">
                    C06
                  </span>
                </div>
                <div
                  className="heatmap-square aspect-square rounded-lg flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#2e1065" }}
                >
                  <span className="text-[10px] font-bold text-white/40">
                    C07
                  </span>
                </div>
                <div
                  className="heatmap-square aspect-square rounded-lg flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#6d28d9" }}
                >
                  <span className="text-[10px] font-bold text-white">C08</span>
                </div>
                <div
                  className="heatmap-square aspect-square rounded-lg flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#ea580c" }}
                >
                  <span className="text-[10px] font-bold text-black">C09</span>
                </div>
                <div
                  className="heatmap-square aspect-square rounded-lg flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#ff8c00" }}
                >
                  <span className="text-[10px] font-bold text-black">C10</span>
                </div>
                <div
                  className="heatmap-square aspect-square rounded-lg flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#4c1d95" }}
                >
                  <span className="text-[10px] font-bold text-white/60">
                    C11
                  </span>
                </div>
                <div
                  className="heatmap-square aspect-square rounded-lg flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#2e1065" }}
                >
                  <span className="text-[10px] font-bold text-white/40">
                    C12
                  </span>
                </div>
                <div
                  className="heatmap-square aspect-square rounded-lg flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#2e1065" }}
                >
                  <span className="text-[10px] font-bold text-white/40">
                    C13
                  </span>
                </div>
                <div
                  className="heatmap-square aspect-square rounded-lg flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#7c3aed" }}
                >
                  <span className="text-[10px] font-bold text-white">C14</span>
                </div>
                <div
                  className="heatmap-square aspect-square rounded-lg flex items-center justify-center relative cursor-help group/core"
                  style={{ backgroundColor: "#4c1d95" }}
                >
                  <span className="text-[10px] font-bold text-white/60">
                    C15
                  </span>
                </div>
              </div>
            </div>
            {/* Side Stats Panel */}
            <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-[#282b39] rounded-xl p-6 flex flex-col gap-6">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">
                  equalizer
                </span>
                System Vitalities
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Avg. Utilization
                  </p>
                  <p className="text-2xl font-bold text-heatmap-high">42.8%</p>
                  <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                    <div className="bg-heatmap-high h-full w-[42.8%]" />
                  </div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Max Core Temp
                  </p>
                  <p className="text-2xl font-bold">64°C</p>
                  <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">
                      arrow_downward
                    </span>
                    -2°C from last min
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Context Switches
                  </p>
                  <p className="text-xl font-bold">
                    14.2k{" "}
                    <span className="text-xs font-normal text-slate-400">
                      /sec
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    
      </div>
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
