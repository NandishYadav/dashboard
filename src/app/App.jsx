import { useState } from 'react';
import { Database, Clock, RefreshCw, Settings, Activity } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Sidebar } from '@/app/components/Sidebar';
import { KPICard } from '@/app/components/KPICard';
import { IncidentTable } from '@/app/components/IncidentTable';
import { BlockingGraph } from '@/app/components/BlockingGraph';
import { WaitClassDistribution } from '@/app/components/WaitClassDistribution';
import { StorageHealth } from '@/app/components/StorageHealth';
import { SQLDetailDrawer } from '@/app/components/SQLDetailDrawer';
import { CPUBySession } from '@/app/components/CPUBySession';
import { CPUBySQL } from '@/app/components/CPUBySQL';
import { SessionStateDistribution } from '@/app/components/SessionStateDistribution';
import { time } from 'motion';

// Mock data generation
const generateSparklineData = () => {
  return Array.from({ length: 20 }, () => Math.floor(Math.random() * 15));
};

const mockIncidents = [
  {
    id: '1',
    role: 'BLOCKER',
    sid: 1234,
    username: 'APP_USER',
    sqlId: 'a8f3k2m9p1x4s',
    elapsedTime: 2400,
    waitEvent: 'enq: TX - row lock contention',
    waitClass: 'Application',
    blockingSid: null,
    impactedSessions: 7,
    sqlText: 'UPDATE orders SET status = \'PROCESSING\' WHERE order_id = :1 AND user_id = :2',
  },
  {
    id: '2',
    role: 'VICTIM',
    sid: 1456,
    username: 'WEB_APP',
    sqlId: 'c7h9k3n2m5p8q',
    elapsedTime: 1850,
    waitEvent: 'enq: TX - row lock contention',
    waitClass: 'Application',
    blockingSid: 1234,
    impactedSessions: 0,
    sqlText: 'UPDATE orders SET delivery_date = SYSDATE + 2 WHERE order_id = :1',
  },
  {
    id: '3',
    role: 'VICTIM',
    sid: 1567,
    username: 'WEB_APP',
    sqlId: 'd2k8m4p9s7t3v',
    elapsedTime: 1620,
    waitEvent: 'enq: TX - row lock contention',
    waitClass: 'Application',
    blockingSid: 1234,
    impactedSessions: 0,
    sqlText: 'SELECT * FROM orders WHERE order_id = :1 FOR UPDATE',
  },
  {
    id: '4',
    role: 'LONG RUNNER',
    sid: 2890,
    username: 'BATCH_USER',
    sqlId: 'f9n2q5r8t4w7x',
    elapsedTime: 3600,
    waitEvent: 'db file sequential read',
    waitClass: 'User I/O',
    blockingSid: null,
    impactedSessions: 0,
    sqlText: `SELECT /*+ FULL(o) PARALLEL(4) */ 
  o.order_id, 
  o.customer_id, 
  SUM(oi.quantity * oi.price) as total_amount
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.created_date >= TRUNC(SYSDATE) - 90
GROUP BY o.order_id, o.customer_id
HAVING SUM(oi.quantity * oi.price) > 1000`,
  },
  {
    id: '5',
    role: 'VICTIM',
    sid: 1678,
    username: 'API_SERVICE',
    sqlId: 'h3p7q2s9t5v8w',
    elapsedTime: 450,
    waitEvent: 'enq: TX - row lock contention',
    waitClass: 'Application',
    blockingSid: 1234,
    impactedSessions: 0,
    sqlText: 'UPDATE inventory SET quantity = quantity - :1 WHERE product_id = :2',
  },
  {
    id: '6',
    role: 'BLOCKER',
    sid: 3456,
    username: 'REPORTING',
    sqlId: 'k8m3n9p2q7r5s',
    elapsedTime: 1200,
    waitEvent: 'direct path read',
    waitClass: 'User I/O',
    blockingSid: null,
    impactedSessions: 2,
    sqlText: 'SELECT * FROM large_fact_table WHERE date_key BETWEEN :1 AND :2',
  },
  {
    id: '7',
    role: 'VICTIM',
    sid: 3789,
    username: 'REPORTING',
    sqlId: 'n2p8q4r7s9t3v',
    elapsedTime: 680,
    waitEvent: 'library cache lock',
    waitClass: 'Concurrency',
    blockingSid: 3456,
    impactedSessions: 0,
    sqlText: 'SELECT COUNT(*) FROM large_fact_table',
  },
];

const mockBlockingNodes = [
  {
    sid: 1234,
    username: 'APP_USER',
    program: 'java@app-server-01',
    waitTime: 2400,
    blockingSid: null,
    isRootBlocker: true,
  },
  {
    sid: 1456,
    username: 'WEB_APP',
    program: 'node@web-server-03',
    waitTime: 1850,
    blockingSid: 1234,
  },
  {
    sid: 1567,
    username: 'WEB_APP',
    program: 'node@web-server-04',
    waitTime: 1620,
    blockingSid: 1234,
  },
  {
    sid: 1678,
    username: 'API_SERVICE',
    program: 'python@api-gateway-02',
    waitTime: 450,
    blockingSid: 1234,
  },
  {
    sid: 3456,
    username: 'REPORTING',
    program: 'sqlplus@report-server',
    waitTime: 1200,
    blockingSid: null,
    isRootBlocker: true,
  },
  {
    sid: 3789,
    username: 'REPORTING',
    program: 'sqlplus@report-server',
    waitTime: 680,
    blockingSid: 3456,
  },
];

const waitClassData = [
  { name: 'Application', value: 35 },
  { name: 'User I/O', value: 28 },
  { name: 'CPU', value: 20 },
  { name: 'Concurrency', value: 10 },
  { name: 'System I/O', value: 5 },
  { name: 'Other', value: 2 },
];

const tablespaceData = [
  { name: 'USERS', usedPercent: 92, freeMB: 1024, totalMB: 12800 },
  { name: 'DATA', usedPercent: 85, freeMB: 3840, totalMB: 25600 },
  { name: 'INDEX', usedPercent: 68, freeMB: 6400, totalMB: 20000 },
  { name: 'TEMP', usedPercent: 45, freeMB: 11000, totalMB: 20000 },
  { name: 'UNDO', usedPercent: 35, freeMB: 6500, totalMB: 10000 },
];

const mockSessionCPU = [

  {
    timestamp: "2026-01-28T08:00:00.000Z",
    sid: 2890,
    username: 'BATCH_USER',
    program: 'python@batch-processor',
    cpuPercent: 72,
    cpuTime: 5400,
    sqlId: 'f9n2q5r8t4w7x',
    status: 'ACTIVE',
  },
  {
    timestamp: "2026-01-28T08:15:00.000Z",
    sid: 1456,
    username: 'WEB_APP',
    program: 'node@web-server-03',
    cpuPercent: 68,
    cpuTime: 1850,
    sqlId: 'c7h9k3n2m5p8q',
    status: 'ACTIVE',
  },
  {
    timestamp: "2026-01-28T08:30:00.000Z",
    sid: 3456,
    username: 'REPORTING',
    program: 'sqlplus@report-server',
    cpuPercent: 45,
    cpuTime: 2200,
    sqlId: 'k8m3n9p2q7r5s',
    status: 'ACTIVE',
  },
  {
    timestamp: "2026-01-28T08:45:00.000Z",
    sid: 1567,
    username: 'WEB_APP',
    program: 'node@web-server-04',
    cpuPercent: 38,
    cpuTime: 920,
    sqlId: 'd2k8m4p9s7t3v',
    status: 'ACTIVE',
  },
  {
    timestamp: "2026-01-28T09:00:00.000Z",
    sid: 4567,
    username: 'ETL_USER',
    program: 'informatica@etl-server',
    cpuPercent: 32,
    cpuTime: 1680,
    sqlId: 'g5j2k8n9p4r7s',
    status: 'ACTIVE',
  },
  {
    timestamp: "2026-01-28T09:15:00.000Z",
    sid: 5678,
    username: 'API_SERVICE',
    program: 'python@api-gateway-01',
    cpuPercent: 28,
    cpuTime: 840,
    sqlId: 'h3p7q2s9t5v8w',
    status: 'ACTIVE',
  },
  {
    timestamp: "2026-01-28T09:30:00.000Z",
    sid: 6789,
    username: 'WEB_PORTAL',
    program: 'tomcat@portal-server',
    cpuPercent: 22,
    cpuTime: 660,
    sqlId: 'j8m4n9p2q6r3s',
    status: 'ACTIVE',
  },
  {
    timestamp: "2026-01-28T09:45:00.000Z",
    sid: 7890,
    username: 'MOBILE_API',
    program: 'springboot@mobile-api',
    cpuPercent: 18,
    cpuTime: 540,
    sqlId: 'k2n7p4q8r9s3t',
    status: 'ACTIVE',
  },
  {
    timestamp: "2026-01-28T10:00:00.000Z",
    sid: 8901,
    username: 'ANALYTICS',
    program: 'tableau@analytics-server',
    cpuPercent: 15,
    cpuTime: 450,
    sqlId: 'l9p3q7r2s8t4v',
    status: 'ACTIVE',
  },
];

const mockSQLQueryCPU = [
  {
    timestamp: "2026-01-28T08:00:00.000Z",
    sqlId: 'a8f3k2m9p1x4s',
    cpuPercent: 82,
    cpuTime: 3240,
    executions: 12450,
    avgCpuPerExec: 0.26,
    elapsedTime: 3840,
    sqlText: 'UPDATE orders SET status = \'PROCESSING\' WHERE order_id = :1 AND user_id = :2',
    module: 'OrderService',
  },
  {
    timestamp: "2026-01-28T08:15:00.000Z",
    sqlId: 'f9n2q5r8t4w7x',
    cpuPercent: 75,
    cpuTime: 5400,
    executions: 245,
    avgCpuPerExec: 22.04,
    elapsedTime: 7200,
    sqlText: `SELECT /*+ FULL(o) PARALLEL(4) */ 
  o.order_id, o.customer_id, 
  SUM(oi.quantity * oi.price) as total_amount
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.created_date >= TRUNC(SYSDATE) - 90
GROUP BY o.order_id, o.customer_id
HAVING SUM(oi.quantity * oi.price) > 1000`,
    module: 'BatchReporting',
  },
  {
    timestamp: "2026-01-28T08:30:00.000Z",
    sqlId: 'c7h9k3n2m5p8q',
    cpuPercent: 65,
    cpuTime: 1850,
    executions: 8920,
    avgCpuPerExec: 0.21,
    elapsedTime: 2100,
    sqlText: 'UPDATE orders SET delivery_date = SYSDATE + 2 WHERE order_id = :1',
    module: 'OrderService',
  },
  {
    timestamp: "2026-01-28T08:45:00.000Z",
    sqlId: 'k8m3n9p2q7r5s',
    cpuPercent: 48,
    cpuTime: 2200,
    executions: 156,
    avgCpuPerExec: 14.1,
    elapsedTime: 3600,
    sqlText: 'SELECT * FROM large_fact_table WHERE date_key BETWEEN :1 AND :2',
    module: 'ReportingEngine',
  },
  {
    timestamp: "2026-01-28T09:00:00.000Z",
    sqlId: 'd2k8m4p9s7t3v',
    cpuPercent: 42,
    cpuTime: 920,
    executions: 5640,
    avgCpuPerExec: 0.16,
    elapsedTime: 1200,
    sqlText: 'SELECT * FROM orders WHERE order_id = :1 FOR UPDATE',
    module: 'WebApp',
  },
  {
    timestamp: "2026-01-28T09:15:00.000Z",
    sqlId: 'g5j2k8n9p4r7s',
    cpuPercent: 35,
    cpuTime: 1680,
    executions: 89,
    avgCpuPerExec: 18.88,
    elapsedTime: 2400,
    sqlText: 'INSERT INTO fact_sales SELECT /*+ APPEND */ * FROM staging_sales WHERE load_date = TRUNC(SYSDATE)',
    module: 'ETL_Process',
  },
  {
    timestamp: "2026-01-28T09:30:00.000Z",
    sqlId: 'h3p7q2s9t5v8w',
    cpuPercent: 28,
    cpuTime: 840,
    executions: 15230,
    avgCpuPerExec: 0.06,
    elapsedTime: 960,
    sqlText: 'UPDATE inventory SET quantity = quantity - :1 WHERE product_id = :2',
    module: 'InventoryAPI',
  },
  {
    timestamp: "2026-01-28T09:45:00.000Z",
    sqlId: 'j8m4n9p2q6r3s',
    cpuPercent: 22,
    cpuTime: 660,
    executions: 9870,
    avgCpuPerExec: 0.07,
    elapsedTime: 780,
    sqlText: 'SELECT customer_id, first_name, last_name, email FROM customers WHERE customer_id = :1',
    module: 'CustomerPortal',
  },
];

export default function App() {
  const [selectedDb, setSelectedDb] = useState('ORCL_PROD');
  const [timeRange, setTimeRange] = useState('5h');
  const [autoRefresh, setAutoRefresh] = useState('30s');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <>

            {/* KPI Cards - Enhanced Metrics */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-red-50 p-3 rounded-lg">
                      <Activity className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex items-center gap-1 text-red-600 text-sm font-semibold">
                      <span>+12%</span>
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">Active Incidents</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">7</span>
                    <span className="text-sm text-gray-500">critical issues</span>
                  </div>
                  <div className="mt-4 h-12">
                    <div className="flex items-end justify-between h-full gap-1">
                      {generateSparklineData().map((val, i) => (
                        <div key={i} className="flex-1 bg-red-100 rounded-t" style={{ height: `${(val / 15) * 100}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <Activity className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                      <span>-8%</span>
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">CPU Utilization</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">68%</span>
                    <span className="text-sm text-gray-500">avg load</span>
                  </div>
                  <div className="mt-4 h-12">
                    <div className="flex items-end justify-between h-full gap-1">
                      {generateSparklineData().map((val, i) => (
                        <div key={i} className="flex-1 bg-blue-100 rounded-t" style={{ height: `${(val / 15) * 100}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <Activity className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                      <span>+5%</span>
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">Active Sessions</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">142</span>
                    <span className="text-sm text-gray-500">connections</span>
                  </div>
                  <div className="mt-4 h-12">
                    <div className="flex items-end justify-between h-full gap-1">
                      {generateSparklineData().map((val, i) => (
                        <div key={i} className="flex-1 bg-purple-100 rounded-t" style={{ height: `${(val / 15) * 100}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <Database className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex items-center gap-1 text-red-600 text-sm font-semibold">
                      <span>+3%</span>
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">Storage Usage</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">85%</span>
                    <span className="text-sm text-gray-500">capacity</span>
                  </div>
                  <div className="mt-4 h-12">
                    <div className="flex items-end justify-between h-full gap-1">
                      {generateSparklineData().map((val, i) => (
                        <div key={i} className="flex-1 bg-orange-100 rounded-t" style={{ height: `${(val / 15) * 100}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CPU Analysis Section */}
            <section>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">CPU Performance Analysis</h2>
                <p className="text-sm text-gray-500 mt-1">Real-time CPU utilization by sessions and SQL queries</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CPUBySession sessions={mockSessionCPU} mode="graph-only" onSessionClick={(session) => {
                  const incident = mockIncidents.find(i => i.sid === session.sid);
                  if (incident) setSelectedIncident(incident);
                }} />
                <CPUBySQL queries={mockSQLQueryCPU} mode="graph-only" />
              </div>
            </section>

            {/* Blocking Sessions */}
            <section>
              <BlockingGraph nodes={mockBlockingNodes} mode="cards-only" />
            </section>

            {/* Storage Health */}
            <section>
              <StorageHealth tablespaces={tablespaceData} mode="gauges-only" />
            </section>
          </>
        );
      case 'cpu-session':
        return (
          <section>
            <CPUBySession data={mockSessionCPU} sessions={mockSessionCPU} onSessionClick={(session) => {
              const incident = mockIncidents.find(i => i.sid === session.sid);
              if (incident) setSelectedIncident(incident);
            }} />
          </section>
        );

      case 'cpu-sql':
        return (
          <section>
            <CPUBySQL queries={mockSQLQueryCPU} />
          </section>
        );

      case 'blocking':
        return (
          <section>
            <BlockingGraph nodes={mockBlockingNodes} />
          </section>
        );

      case 'storage':
        return (
          <section>
            <StorageHealth tablespaces={tablespaceData} />
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar - Sticky Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left: Title and Database Selector */}
              <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-600" />
                  <h1 className="text-xl font-bold text-gray-900">Oracle Database Observability</h1>
                </div>

                <div className="flex items-center gap-2 lg:ml-8">
                  <Database className="w-4 h-4 text-gray-600" />
                  <Select value={selectedDb} onValueChange={setSelectedDb}>
                    <SelectTrigger className="w-[180px] bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ORCL_PROD">ORCL_PROD</SelectItem>
                      <SelectItem value="ORCL_STAGE">ORCL_STAGE</SelectItem>
                      <SelectItem value="ORCL_DEV">ORCL_DEV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right: Controls */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[140px] bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30m">Last 30 min</SelectItem>
                      <SelectItem value="1h">Last 1 hour</SelectItem>
                      <SelectItem value="5h">Last 5 hours</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="hidden md:flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-gray-600" />
                  <Select value={autoRefresh} onValueChange={setAutoRefresh}>
                    <SelectTrigger className="w-[120px] bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10s">10 seconds</SelectItem>
                      <SelectItem value="30s">30 seconds</SelectItem>
                      <SelectItem value="1m">1 minute</SelectItem>
                      <SelectItem value="off">Off</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 py-6 max-w-[1800px] mx-auto w-full space-y-6">
          {renderSection()}
        </main>
      </div>

      {/* SQL Detail Drawer */}
      {selectedIncident && (
        <SQLDetailDrawer
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      )}
    </div>
  );
}
