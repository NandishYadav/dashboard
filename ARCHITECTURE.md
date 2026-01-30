# Architecture Overview

## 📐 Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                           │
│                         (React Components)                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REDUX STORE (State)                         │
│  ┌──────────────────────┐  ┌──────────────────────────────┐    │
│  │  Dashboard Slice     │  │      Data Slice              │    │
│  │  ─────────────────   │  │  ─────────────────────────   │    │
│  │  • selectedDb        │  │  • incidents                 │    │
│  │  • timeRange         │  │  • sessionCPU                │    │
│  │  • autoRefresh       │  │  • sqlQueryCPU               │    │
│  │  • activeSection     │  │  • blockingNodes             │    │
│  │  • selectedIncident  │  │  • tablespaces               │    │
│  │                      │  │  • loading states            │    │
│  │                      │  │  • error states              │    │
│  └──────────────────────┘  └──────────────────────────────┘    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CUSTOM HOOKS                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  useDatabaseData()                                        │  │
│  │  • Automatic data fetching                                │  │
│  │  • Dependency tracking                                    │  │
│  │  • Returns data + loading + errors                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  database.js (API Service)                                │  │
│  │  • getIncidents()                                         │  │
│  │  • getCPUMetrics()                                        │  │
│  │  • getStorageHealth()                                     │  │
│  │  • getBlockingSessions()                                  │  │
│  │  • killSession()                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
         ┌───────────────┴───────────────┐
         │                               │
         ▼                               ▼
┌─────────────────┐           ┌─────────────────────┐
│   MOCK DATA     │           │   REAL API          │
│   (Development) │           │   (Production)      │
│                 │           │                     │
│ • incidents.js  │           │ Backend Server      │
│ • sessions.js   │           │ • REST endpoints    │
│ • sqlQueries.js │           │ • Authentication    │
│ • storage.js    │           │ • Real-time data    │
└─────────────────┘           └─────────────────────┘
```

## 🔄 Data Flow

### 1. User Interaction Flow
```
User Action (e.g., Select Database)
    │
    ▼
Dispatch Redux Action (setSelectedDb)
    │
    ▼
Redux Store Updated
    │
    ▼
useDatabaseData Hook Detects Change
    │
    ▼
API Call Triggered (getIncidents)
    │
    ▼
Mock Data or Real API Response
    │
    ▼
Dispatch Async Thunk (fetchIncidents)
    │
    ▼
Redux Store Updated with Data
    │
    ▼
Components Re-render with New Data
```

### 2. Component Rendering Flow
```
App.jsx (Main Component)
    │
    ├─→ Sidebar
    │   └─→ Navigation Items
    │
    ├─→ Header
    │   ├─→ Database Selector
    │   ├─→ Time Range Selector
    │   └─→ Auto Refresh Selector
    │
    ├─→ Main Content (renderSection)
    │   │
    │   ├─→ Overview Section
    │   │   ├─→ CPUBySession (graph-only)
    │   │   ├─→ CPUBySQL (graph-only)
    │   │   └─→ StorageHealth (gauges-only)
    │   │
    │   ├─→ CPU Session Section
    │   │   └─→ CPUBySession (full)
    │   │
    │   ├─→ CPU SQL Section
    │   │   └─→ CPUBySQL (full)
    │   │
    │   ├─→ Blocking Section
    │   │   └─→ BlockingGraph
    │   │
    │   └─→ Storage Section
    │       └─→ StorageHealth (full)
    │
    └─→ SQLDetailDrawer (conditional)
```

## 🗂️ File Organization

```
src/
├── api/                          # API Integration Layer
│   └── database.js               # All API calls + mock fallback
│
├── app/
│   ├── App.jsx                   # Main application component
│   └── components/
│       ├── LoadingStates.jsx     # Loading components
│       ├── Sidebar.jsx           # Navigation sidebar
│       ├── CPUBySession.jsx      # CPU by session view
│       ├── CPUBySQL.jsx          # CPU by SQL view
│       ├── StorageHealth.jsx     # Storage monitoring
│       ├── BlockingGraph.jsx     # Blocking sessions
│       ├── SQLDetailDrawer.jsx   # Session details
│       └── ui/                   # Shadcn UI components
│
├── hooks/                        # Custom React Hooks
│   └── useDatabaseData.js        # Data fetching hook
│
├── mocks/                        # Mock Data (Development)
│   ├── incidents.js              # Mock incidents
│   ├── sessions.js               # Mock sessions
│   ├── sqlQueries.js             # Mock SQL queries
│   └── storage.js                # Mock storage data
│
├── store/                        # Redux State Management
│   ├── index.js                  # Store configuration
│   ├── dashboardSlice.js         # UI state
│   └── dataSlice.js              # Data state + async thunks
│
├── styles/                       # CSS Files
│   ├── index.css                 # Main CSS entry
│   ├── theme.css                 # Theme variables
│   └── fonts.css                 # Font imports
│
└── main.jsx                      # App entry point
```

## 🔐 State Management Pattern

### Redux Slices

#### Dashboard Slice (UI State)
```javascript
{
  selectedDb: 'ORCL_PROD',        // Current database
  timeRange: '5h',                 // Time range filter
  autoRefresh: '30s',              // Auto-refresh interval
  activeSection: 'overview',       // Current view
  selectedIncident: null,          // Selected incident for drawer
  isLoading: false,                // Global loading state
  error: null                      // Global error state
}
```

#### Data Slice (Application Data)
```javascript
{
  incidents: [],                   // Active incidents
  sessionCPU: [],                  // Session CPU data
  sqlQueryCPU: [],                 // SQL query CPU data
  blockingNodes: [],               // Blocking sessions
  tablespaces: [],                 // Storage data
  waitClassData: [],               // Wait class distribution
  
  loading: {                       // Loading states per data type
    incidents: false,
    cpuMetrics: false,
    storage: false,
    blocking: false
  },
  
  errors: {                        // Error states per data type
    incidents: null,
    cpuMetrics: null,
    storage: null,
    blocking: null
  }
}
```

## 🎯 Key Design Decisions

### 1. **Redux for State Management**
- **Why**: Centralized state, predictable updates, time-travel debugging
- **Alternative**: Context API (too complex for this scale)

### 2. **Separate API Layer**
- **Why**: Clean separation, easy to mock, testable
- **Alternative**: Inline fetch calls (harder to maintain)

### 3. **Mock Data Fallback**
- **Why**: Development without backend, easy testing
- **Alternative**: Always require backend (slower development)

### 4. **Custom Hooks**
- **Why**: Reusable logic, cleaner components
- **Alternative**: Inline useEffect (repetitive code)

### 5. **Loading States**
- **Why**: Better UX, professional feel
- **Alternative**: No loading states (confusing for users)

### 6. **Environment Variables**
- **Why**: Flexible configuration, secure credentials
- **Alternative**: Hardcoded values (not secure)

## 🚀 Performance Considerations

### Current Implementation
- ✅ Conditional rendering with loading states
- ✅ Redux for efficient state updates
- ✅ Separate data slices for granular updates

### Future Optimizations
- ⏳ React.memo for expensive components
- ⏳ useMemo for computed values
- ⏳ useCallback for event handlers
- ⏳ Code splitting with React.lazy
- ⏳ Virtual scrolling for large lists
- ⏳ WebSocket for real-time updates

## 🔒 Security Considerations

### Current Implementation
- ✅ Environment variables for sensitive data
- ✅ .gitignore for credentials
- ✅ No hardcoded API keys

### Future Enhancements
- ⏳ Authentication layer
- ⏳ Authorization checks
- ⏳ CSRF protection
- ⏳ Input validation
- ⏳ XSS prevention
- ⏳ Rate limiting

## 📊 Scalability

### Current Architecture Supports
- ✅ Adding new data sources
- ✅ Adding new views/sections
- ✅ Adding new API endpoints
- ✅ Switching between mock and real data
- ✅ Multiple environments

### Growth Path
1. Add more Redux slices as needed
2. Create more custom hooks for complex logic
3. Add middleware for logging, analytics
4. Implement caching layer
5. Add offline support with Redux Persist
6. Implement optimistic updates

## 🧪 Testing Strategy

### Unit Tests (Future)
- Redux reducers
- Custom hooks
- Utility functions
- API service methods

### Integration Tests (Future)
- Component + Redux integration
- API + Redux integration
- User flows

### E2E Tests (Future)
- Critical user journeys
- Cross-browser testing
- Mobile responsiveness

---

**Last Updated**: January 30, 2026
**Architecture Version**: 2.0
**Status**: Production-Ready Foundation
