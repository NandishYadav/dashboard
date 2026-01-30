import { useDispatch, useSelector } from 'react-redux';
import { Database, Clock, RefreshCw, Settings, Activity } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Sidebar } from '@/app/components/Sidebar';
import { BlockingGraph } from '@/app/components/BlockingGraph';
import { StorageHealth } from '@/app/components/StorageHealth';
import { SQLDetailDrawer } from '@/app/components/SQLDetailDrawer';
import { CPUBySession } from '@/app/components/CPUBySession';
import { CPUBySQL } from '@/app/components/CPUBySQL';
import { LoadingChart, LoadingCard } from '@/app/components/LoadingStates';
import { useDatabaseData } from '@/hooks/useDatabaseData';
import {
  setSelectedDb,
  setTimeRange,
  setAutoRefresh,
  setActiveSection,
  setSelectedIncident,
} from '@/store/dashboardSlice';

export default function App() {
  const dispatch = useDispatch();

  // Get state from Redux
  const { selectedDb, timeRange, autoRefresh, activeSection, selectedIncident } = useSelector(
    (state) => state.dashboard
  );

  // Fetch data using custom hook
  const {
    incidents,
    sessionCPU,
    sqlQueryCPU,
    blockingNodes,
    tablespaces,
    loading,
    errors,
  } = useDatabaseData();

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (

          <>



            {/* KPI Cards - Enhanced Metrics */}
            {/* <section>
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
            </section> */}

            {/* CPU Analysis Section */}
            <section>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">CPU Performance Analysis</h2>
                <p className="text-sm text-gray-500 mt-1">Real-time CPU utilization by sessions and SQL queries</p>
              </div>

              {loading.cpuMetrics ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <LoadingChart />
                  <LoadingChart />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* CPU by Session - Clickable */}
                  <div
                    onClick={() => dispatch(setActiveSection('cpu-session'))}
                    className="cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
                  >
                    <CPUBySession sessions={sessionCPU} mode="graph-only" onSessionClick={(session) => {
                      const incident = incidents.find(i => i.sid === session.sid);
                      if (incident) {
                        dispatch(setSelectedIncident(incident));
                      }
                    }} />
                  </div>

                  {/* CPU by SQL - Clickable */}
                  <div
                    onClick={() => dispatch(setActiveSection('cpu-sql'))}
                    className="cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
                  >
                    <CPUBySQL queries={sqlQueryCPU} mode="graph-only" />
                  </div>
                </div>
              )}
            </section>

            {/* Blocking Sessions */}
            {/* <section>
              <BlockingGraph nodes={mockBlockingNodes} mode="cards-only" />
            </section> */}

            {/* Storage Health - Clickable */}
            {loading.storage ? (
              <LoadingChart />
            ) : (
              <section
                onClick={() => dispatch(setActiveSection('storage'))}
                className="cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg"
              >
                <StorageHealth tablespaces={tablespaces} mode="gauges-only" />
              </section>
            )}
          </>
        );
      case 'cpu-session':
        return (
          <section>
            <CPUBySession data={sessionCPU} sessions={sessionCPU} onSessionClick={(session) => {
              const incident = incidents.find(i => i.sid === session.sid);
              if (incident) {
                dispatch(setSelectedIncident(incident));
              }
            }} />
          </section>
        );

      case 'cpu-sql':
        return (
          <section>
            <CPUBySQL queries={sqlQueryCPU} />
          </section>
        );

      case 'blocking':
        return (
          <section>
            <BlockingGraph nodes={blockingNodes} />
          </section>
        );

      case 'storage':
        return (
          <section>
            <StorageHealth tablespaces={tablespaces} />
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={(section) => dispatch(setActiveSection(section))} />

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
                  <Select value={selectedDb} onValueChange={(value) => dispatch(setSelectedDb(value))}>
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
                  <Select value={timeRange} onValueChange={(value) => dispatch(setTimeRange(value))}>
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
                  <Select value={autoRefresh} onValueChange={(value) => dispatch(setAutoRefresh(value))}>
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
          onClose={() => dispatch(setSelectedIncident(null))}
        />
      )}
    </div>
  );
}
