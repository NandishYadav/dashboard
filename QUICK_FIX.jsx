// QUICK FIX FOR NAVIGATION
// Copy and paste these replacements into App.jsx

// REPLACE lines 497-506 (CPU by Session) with:
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

// REPLACE lines 508-514 (CPU by SQL) with:
<div className="relative group">
  <div 
    onClick={() => setCurrentView('cpu-sql')}
    className="absolute inset-0 z-10 cursor-pointer rounded-xl group-hover:ring-2 group-hover:ring-blue-500 group-hover:ring-offset-2 transition-all"
    title="Click to view CPU by SQL details"
  />
  <CPUBySQL queries={mockSQLQueryCPU} mode="graph-only" />
</div>

// REPLACE lines 523-529 (Storage Health) with:
<div className="relative group">
  <div 
    onClick={() => setCurrentView('storage')}
    className="absolute inset-0 z-10 cursor-pointer rounded-xl group-hover:ring-2 group-hover:ring-blue-500 group-hover:ring-offset-2 transition-all"
    title="Click to view Storage Health details"
  />
  <StorageHealth tablespaces={tablespaceData} mode="gauges-only" />
</div>
