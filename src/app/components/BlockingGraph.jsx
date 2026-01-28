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
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Blocking Session Graph</h3>
      <div className="overflow-x-auto">
        <svg width={width} height={height} className="border border-gray-100 rounded">
          {/* Edges */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#dc2626" />
            </marker>
          </defs>
          
          {edges.map((edge, idx) => {
            if (!edge) return null;
            return (
              <line
                key={idx}
                x1={edge.from.x}
                y1={edge.from.y}
                x2={edge.to.x}
                y2={edge.to.y}
                stroke="#dc2626"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          })}

          {/* Nodes */}
          {layout.map((item) => (
            <g
              key={item.node.sid}
              transform={`translate(${item.x}, ${item.y})`}
              onMouseEnter={() => setHoveredNode(item.node.sid)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
              <circle
                r="30"
                fill={item.node.isRootBlocker ? '#dc2626' : '#2563eb'}
                stroke={hoveredNode === item.node.sid ? '#1e40af' : 'transparent'}
                strokeWidth="3"
              />
              <text
                textAnchor="middle"
                dy="5"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                {item.node.sid}
              </text>

              {/* Tooltip */}
              {hoveredNode === item.node.sid && (
                <g>
                  <rect
                    x="40"
                    y="-40"
                    width="180"
                    height="80"
                    fill="white"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    rx="4"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                  />
                  <text x="50" y="-20" fontSize="12" fill="#111827" fontWeight="600">
                    SID: {item.node.sid}
                  </text>
                  <text x="50" y="-5" fontSize="11" fill="#6b7280">
                    User: {item.node.username}
                  </text>
                  <text x="50" y="10" fontSize="11" fill="#6b7280">
                    Program: {item.node.program.substring(0, 20)}
                  </text>
                  <text x="50" y="25" fontSize="11" fill="#dc2626" fontWeight="600">
                    Wait: {item.node.waitTime}s
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-4 flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-600"></div>
          <span className="text-gray-700">Root Blocker</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-600"></div>
          <span className="text-gray-700">Blocked Session</span>
        </div>
      </div>
    </div>
  );
}
