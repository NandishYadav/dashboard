{/* CPU Analysis Section */ }
<section>
    <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">CPU Performance Analysis</h2>
        <p className="text-sm text-gray-500 mt-1">Real-time CPU utilization by sessions and SQL queries</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CPU by Session - Clickable */}
        <div className="relative group">
            <div
                onClick={() => setCurrentView('cpu-session')}
                className="absolute inset-0 z-10 cursor-pointer rounded-xl group-hover:ring-2 group-hover:ring-blue-500 group-hover:ring-offset-2 transition-all"
                title="Click to view CPU by Session details"
            />
            <CPUBySession sessions={mockSessionCPU} mode="graph-only" onSessionClick={(session) => {
                const incident = mockIncidents.find(i => i.sid === session.sid);
                if (incident) setSelectedIncident(incident);
            }} />
        </div>

        {/* CPU by SQL - Clickable */}
        <div className="relative group">
            <div
                onClick={() => setCurrentView('cpu-sql')}
                className="absolute inset-0 z-10 cursor-pointer rounded-xl group-hover:ring-2 group-hover:ring-blue-500 group-hover:ring-offset-2 transition-all"
                title="Click to view CPU by SQL details"
            />
            <CPUBySQL queries={mockSQLQueryCPU} mode="graph-only" />
        </div>
    </div>
</section>

{/* Blocking Sessions */ }
{/* <section>
              <BlockingGraph nodes={mockBlockingNodes} mode="cards-only" />
            </section> */}

{/* Storage Health - Clickable */ }
<div className="relative group">
    <div
        onClick={() => setCurrentView('storage')}
        className="absolute inset-0 z-10 cursor-pointer rounded-xl group-hover:ring-2 group-hover:ring-blue-500 group-hover:ring-offset-2 transition-all"
        title="Click to view Storage Health details"
    />
    <StorageHealth tablespaces={tablespaceData} mode="gauges-only" />
</div>
