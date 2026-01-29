import { useState } from 'react';

export function BlockingGraph({ nodes }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Build a simple hierarchical layout
  const buildLayout = () => {
    const rootBlockers = nodes.filter(n => n.isRootBlocker);
    const layout = [];
    const visited = new Set();

    const addNodeAndChildren = (node, level, xOffset) => {
      if (visited.has(node.sid)) return xOffset;
      
      visited.add(node.sid);
      const x = xOffset;
      const y = level * 100 + 50;
      
      layout.push({ node, x, y, level });

      // Find children (nodes being blocked by this one)
      const children = nodes.filter(n => n.blockingSid === node.sid);
      let currentX = xOffset;
      
      children.forEach((child, idx) => {
        currentX = addNodeAndChildren(child, level + 1, currentX);
        currentX += 150;
      });

      return Math.max(xOffset + 150, currentX);
    };

    let globalX = 50;
    rootBlockers.forEach(blocker => {
      globalX = addNodeAndChildren(blocker, 0, globalX);
      globalX += 100;
    });

    return layout;
  };

  const layout = buildLayout();
  const width = Math.max(800, layout.reduce((max, item) => Math.max(max, item.x), 0) + 100);
  const height = Math.max(400, layout.reduce((max, item) => Math.max(max, item.y), 0) + 100);

  // Build edges
  const edges = layout
    .filter(item => item.node.blockingSid)
    .map(item => {
      const source = layout.find(l => l.node.sid === item.node.blockingSid);
      if (!source) return null;
      return { from: source, to: item };
    })
    .filter(Boolean);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 overflow-auto">
      <div>
        <p>New Active session code</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-[#e7ecf4] dark:border-gray-700 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-[#49699c] dark:text-gray-400 uppercase tracking-wider">
              Active Sessions
            </p>
            <h3 className="text-3xl font-black mt-1">42</h3>
          </div>
          <div className="bg-primary/10 p-2 rounded-lg text-primary">
            <span className="material-symbols-outlined !text-2xl">bolt</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-emerald-500 text-sm font-bold flex items-center">
            <span className="material-symbols-outlined !text-sm">
              trending_up
            </span>{" "}
            12%
          </span>
          <span className="text-[#49699c] dark:text-gray-500 text-xs font-medium">
            vs last 15m
          </span>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-[#e7ecf4] dark:border-gray-700 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-waiting" />
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-[#49699c] dark:text-gray-400 uppercase tracking-wider">
              Waiting Sessions
            </p>
            <h3 className="text-3xl font-black mt-1">8</h3>
          </div>
          <div className="bg-waiting/10 p-2 rounded-lg text-waiting">
            <span className="material-symbols-outlined !text-2xl">
              hourglass_empty
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-rose-500 text-sm font-bold flex items-center">
            <span className="material-symbols-outlined !text-sm">
              trending_up
            </span>{" "}
            4%
          </span>
          <span className="text-[#49699c] dark:text-gray-500 text-xs font-medium">
            vs last 15m
          </span>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-[#e7ecf4] dark:border-gray-700 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-idle" />
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-[#49699c] dark:text-gray-400 uppercase tracking-wider">
              Idle Sessions
            </p>
            <h3 className="text-3xl font-black mt-1">156</h3>
          </div>
          <div className="bg-idle/10 p-2 rounded-lg text-idle">
            <span className="material-symbols-outlined !text-2xl">bed</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-slate-500 text-sm font-bold flex items-center">
            <span className="material-symbols-outlined !text-sm">
              trending_down
            </span>{" "}
            2%
          </span>
          <span className="text-[#49699c] dark:text-gray-500 text-xs font-medium">
            vs last 15m
          </span>
        </div>
      </div>
    </div>

      {/* Main Chart Container */}
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#e7ecf4] dark:border-gray-700 shadow-md p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-6">
          <h4 className="text-lg font-bold">Sessions Distribution over Time</h4>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-sm bg-primary" />
              <span className="text-sm font-medium text-[#49699c] dark:text-gray-300">
                Active
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-sm bg-waiting" />
              <span className="text-sm font-medium text-[#49699c] dark:text-gray-300">
                Waiting
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-sm bg-idle" />
              <span className="text-sm font-medium text-[#49699c] dark:text-gray-300">
                Idle
              </span>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>
      {/* Area Chart Visualization Simulation */}
      <div className="relative chart-container w-full flex flex-col justify-end">
        {/* SVG Area Simulation */}
        <svg
          className="w-full overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 1000 300"
        >
          {/* Idle Area (Bottom) */}
          <path
            d="M0,280 L100,270 L200,275 L300,260 L400,265 L500,250 L600,255 L700,240 L800,245 L900,230 L1000,235 L1000,300 L0,300 Z"
            fill="#94a3b8"
            fillOpacity="0.2"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          {/* Waiting Area (Middle) */}
          <path
            d="M0,220 L100,210 L200,230 L300,200 L400,240 L500,210 L600,230 L700,180 L800,210 L900,220 L1000,200 L1000,235 L900,230 L800,245 L700,240 L600,255 L500,250 L400,265 L300,260 L200,275 L100,270 L0,280 Z"
            fill="#f59e0b"
            fillOpacity="0.3"
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
          {/* Active Area (Top) */}
          <path
            d="M0,150 Q100,120 200,140 T400,100 T600,130 T800,90 T1000,120 L1000,200 L900,220 L800,210 L700,180 L600,230 L500,210 L400,240 L300,200 L200,230 L100,210 L0,220 Z"
            fill="#3c83f6"
            fillOpacity="0.4"
            stroke="#3c83f6"
            strokeWidth="2.5"
          />
          {/* Tooltip Line Marker */}
          {/* <line
            stroke="#3c83f6"
            strokeDasharray={4}
            strokeWidth={1}
            x1={700}
            x2={700}
            y1={0}
            y2={300}
          />
          <circle
            cx={700}
            cy={180}
            fill="#3c83f6"
            r={4}
            stroke="white"
            strokeWidth={2}
          /> */}
        </svg>
        {/* Tooltip Overlay */}
        {/* <div className="absolute left-[70%] top-10 -translate-x-1/2 pointer-events-none z-10">
          <div className="bg-white dark:bg-gray-900 border border-primary p-4 rounded-xl shadow-xl min-w-48 backdrop-blur-sm">
            <p className="text-xs font-bold text-[#49699c] dark:text-gray-400 mb-2">
              Today, 14:45:00
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span className="size-2 rounded-full bg-primary" /> Active
                </span>
                <span className="text-sm font-black">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span className="size-2 rounded-full bg-waiting" /> Waiting
                </span>
                <span className="text-sm font-black text-waiting">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span className="size-2 rounded-full bg-idle" /> Idle
                </span>
                <span className="text-sm font-black">148</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase">
                Total Load
              </span>
              <span className="text-sm font-black">202</span>
            </div>
          </div>
        </div> */}
        {/* X Axis Labels */}
        <div className="flex justify-between mt-4 px-2">
          <span className="text-xs font-bold text-[#49699c]">14:00</span>
          <span className="text-xs font-bold text-[#49699c]">14:15</span>
          <span className="text-xs font-bold text-[#49699c]">14:30</span>
          <span className="text-xs font-bold text-[#49699c]">
            14:45
          </span>
          <span className="text-xs font-bold text-[#49699c]">15:00</span>
        </div>
      </div>
    </div>
        
      </div>
    </div>
  );
}
