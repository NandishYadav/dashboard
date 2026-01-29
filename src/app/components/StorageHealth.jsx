import { Database, HardDrive, AlertCircle } from 'lucide-react';

export function StorageHealth({ tablespaces, mode = 'full' }) {

  // Part 1: Gauge Cards Section
  const GaugeCardsSection = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-base font-semibold text-gray-900">Storage Health</h3>
            <p className="text-xs text-gray-500 mt-0.5">Tablespace utilization and capacity</p>
          </div>
        </div>
      </div>

      {/* Gauge Cards Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* CRITICAL CARD 1: USERS */}
          <div className="flex flex-col rounded-xl shadow-lg border-2 border-red-200 bg-red-50 p-6 transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                  PROD-01
                </p>
                <h3 className="text-xl font-black text-gray-900">
                  USERS
                </h3>
              </div>
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex flex-col items-center justify-center py-6 relative">
              <div className="radial-progress size-40">
                <svg className="size-40">
                  <circle
                    className="text-red-100"
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
                  <span className="text-3xl font-black text-red-600">
                    94%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-red-500">
                    Critical
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2 border-t border-red-100 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-red-800/70">
                  Total Size:
                </span>
                <span className="font-bold text-gray-900">
                  50,000 MB
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-800/70">Used:</span>
                <span className="font-bold text-gray-900">
                  47,000 MB
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-800/70">Free:</span>
                <span className="font-bold text-red-600">
                  3,000 MB
                </span>
              </div>
            </div>
          </div>

          {/* CRITICAL CARD 2: REPORTS */}
          <div className="flex flex-col rounded-xl shadow-lg border-2 border-red-200 bg-red-50 p-6 transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                  PROD-01
                </p>
                <h3 className="text-xl font-black text-gray-900">
                  REPORTS
                </h3>
              </div>
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex flex-col items-center justify-center py-6 relative">
              <div className="radial-progress size-40">
                <svg className="size-40">
                  <circle
                    className="text-red-100"
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
                  <span className="text-3xl font-black text-red-600">
                    96%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-red-500">
                    Critical
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2 border-t border-red-100 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-red-800/70">
                  Total Size:
                </span>
                <span className="font-bold text-gray-900">
                  100,000 MB
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-800/70">Used:</span>
                <span className="font-bold text-gray-900">
                  96,000 MB
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-800/70">Free:</span>
                <span className="font-bold text-red-600">
                  4,000 MB
                </span>
              </div>
            </div>
          </div>

          {/* HEALTHY CARD: SYSTEM */}
          <div className="flex flex-col rounded-xl shadow-md border border-gray-200 bg-white p-6 transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-600">
                  PROD-02
                </p>
                <h3 className="text-xl font-black text-gray-900">
                  SYSTEM
                </h3>
              </div>
              <HardDrive className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex flex-col items-center justify-center py-6 relative">
              <div className="radial-progress size-40">
                <svg className="size-40">
                  <circle
                    className="text-blue-50"
                    cx={80}
                    cy={80}
                    fill="transparent"
                    r={70}
                    stroke="currentColor"
                    strokeWidth={12}
                  />
                  <circle
                    className="text-blue-600"
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
                  <span className="text-3xl font-black text-gray-900">
                    45%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-green-500">
                    Healthy
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Total Size:
                </span>
                <span className="font-bold text-gray-900">
                  20,000 MB
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used:</span>
                <span className="font-bold text-gray-900">
                  9,000 MB
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Free:</span>
                <span className="font-bold text-green-500">11,000 MB</span>
              </div>
            </div>
          </div>

          {/* WARNING CARD: DATA_IDX */}
          <div className="flex flex-col rounded-xl shadow-md border border-orange-200 bg-orange-50/30 p-6 transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  PROD-01
                </p>
                <h3 className="text-xl font-black text-gray-900">
                  DATA_IDX
                </h3>
              </div>
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex flex-col items-center justify-center py-6 relative">
              <div className="radial-progress size-40">
                <svg className="size-40">
                  <circle
                    className="text-orange-100"
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
                  <span className="text-3xl font-black text-orange-600">
                    82%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-orange-500">
                    Warning
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2 border-t border-orange-100 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-orange-800/70">
                  Total Size:
                </span>
                <span className="font-bold text-gray-900">
                  200,000 MB
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-orange-800/70">
                  Used:
                </span>
                <span className="font-bold text-gray-900">
                  164,000 MB
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-orange-800/70">
                  Free:
                </span>
                <span className="font-bold text-orange-600">
                  36,000 MB
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Part 2: Heatmap and Stats Section
  const HeatmapSection = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <HardDrive className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-base font-semibold text-gray-900">Core-Level Analysis</h3>
            <p className="text-xs text-gray-500 mt-0.5">System load distribution and vitalities</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Heatmap Grid Container */}
          <div className="xl:col-span-3 bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <span className="text-blue-600">●</span>
                Core-Level Load Distribution
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
                  <span>Idle</span>
                  <div className="w-32 h-2 rounded-full bg-gradient-to-r from-purple-900 via-indigo-600 to-orange-500" />
                  <span>Peak</span>
                </div>
              </div>
            </div>
            {/* The Heatmap Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {/* Core Squares */}
              <div
                className="aspect-square rounded-lg flex items-center justify-center relative cursor-help group"
                style={{ backgroundColor: "#2e1065" }}
              >
                <span className="text-[10px] font-bold text-white/40">
                  C00
                </span>
                <div className="absolute inset-0 bg-blue-600/10 rounded-lg opacity-0 group-hover:opacity-100 border border-blue-600/50 pointer-events-none" />
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-32 bg-gray-900 text-white text-[10px] p-2 rounded shadow-xl z-50">
                  <div className="font-bold border-b border-white/10 pb-1 mb-1">
                    Core 00
                  </div>
                  <div>Load: 12.4%</div>
                  <div>Temp: 42°C</div>
                </div>
              </div>
              <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: "#4c1d95" }}>
                <span className="text-[10px] font-bold text-white/60">C01</span>
              </div>
              <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: "#7c3aed" }}>
                <span className="text-[10px] font-bold text-white">C02</span>
              </div>
              <div className="aspect-square rounded-lg flex items-center justify-center relative" style={{ backgroundColor: "#ff8c00" }}>
                <span className="text-[10px] font-bold text-black">C03</span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
              </div>
              <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: "#f97316" }}>
                <span className="text-[10px] font-bold text-black">C04</span>
              </div>
              <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: "#4c1d95" }}>
                <span className="text-[10px] font-bold text-white/60">C05</span>
              </div>
              <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: "#2e1065" }}>
                <span className="text-[10px] font-bold text-white/40">C06</span>
              </div>
              <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: "#2e1065" }}>
                <span className="text-[10px] font-bold text-white/40">C07</span>
              </div>
              <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: "#6d28d9" }}>
                <span className="text-[10px] font-bold text-white">C08</span>
              </div>
              <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: "#ea580c" }}>
                <span className="text-[10px] font-bold text-black">C09</span>
              </div>
              <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: "#ff8c00" }}>
                <span className="text-[10px] font-bold text-black">C10</span>
              </div>
              <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: "#4c1d95" }}>
                <span className="text-[10px] font-bold text-white/60">C11</span>
              </div>
              <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: "#2e1065" }}>
                <span className="text-[10px] font-bold text-white/40">C12</span>
              </div>
              <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: "#2e1065" }}>
                <span className="text-[10px] font-bold text-white/40">C13</span>
              </div>
              <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: "#7c3aed" }}>
                <span className="text-[10px] font-bold text-white">C14</span>
              </div>
              <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: "#4c1d95" }}>
                <span className="text-[10px] font-bold text-white/60">C15</span>
              </div>
            </div>
          </div>

          {/* Side Stats Panel */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-6">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <span className="text-blue-600">●</span>
              System Vitalities
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Avg. Utilization
                </p>
                <p className="text-2xl font-bold text-orange-500">42.8%</p>
                <div className="w-full h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div className="bg-orange-500 h-full w-[42.8%]" />
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Max Core Temp
                </p>
                <p className="text-2xl font-bold">64°C</p>
                <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                  <span>↓</span>
                  -2°C from last min
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Context Switches
                </p>
                <p className="text-xl font-bold">
                  14.2k{" "}
                  <span className="text-xs font-normal text-gray-400">
                    /sec
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render based on mode
  if (mode === 'gauges-only') {
    return <GaugeCardsSection />;
  }

  if (mode === 'heatmap-only') {
    return <HeatmapSection />;
  }

  // Full mode - both sections
  return (
    <div className="flex flex-col gap-6">
      <GaugeCardsSection />
      <HeatmapSection />
    </div>
  );
}
