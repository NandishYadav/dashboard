# Changelog

All notable changes to the Database Observability Dashboard project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-01-30

### 🎉 Major Refactoring - Production-Ready Foundation

This release represents a complete architectural overhaul to make the application production-ready.

### Added

#### State Management
- **Redux Toolkit** integration for centralized state management
- **Dashboard Slice** for UI state (database selection, time range, active section)
- **Data Slice** for application data with async thunks
- **Custom Hooks** (`useDatabaseData`) for automatic data fetching

#### API Layer
- **API Service** (`src/api/database.js`) with comprehensive methods:
  - `getIncidents()` - Fetch active database incidents
  - `getCPUMetrics()` - Fetch CPU metrics by session and SQL
  - `getStorageHealth()` - Fetch tablespace and storage data
  - `getBlockingSessions()` - Fetch blocking session chains
  - `killSession()` - Kill a database session
  - `getDatabases()` - Get available databases
- **Mock Data Fallback** - Automatic fallback to mock data in development
- **Simulated Network Delays** - Realistic development experience
- **Error Handling** - Comprehensive try-catch with error messages
- **JSDoc Documentation** - Full API documentation

#### Mock Data Organization
- **Separated Mock Data** into dedicated modules:
  - `src/mocks/incidents.js` - Incident data
  - `src/mocks/sessions.js` - Session and blocking data
  - `src/mocks/sqlQueries.js` - SQL query metrics
  - `src/mocks/storage.js` - Storage and wait class data

#### Loading States
- **LoadingSpinner** - Configurable spinner (sm, md, lg)
- **LoadingCard** - Skeleton loader for cards
- **LoadingTable** - Skeleton loader for tables
- **LoadingChart** - Skeleton loader for charts
- **PageLoader** - Full-page loading state
- **Conditional Rendering** - Loading states throughout the app

#### Environment Configuration
- **Environment Files**:
  - `.env.development` - Development configuration
  - `.env.production` - Production configuration
  - `.env.example` - Template for developers
- **Environment Variables**:
  - `VITE_API_BASE_URL` - API endpoint
  - `VITE_REFRESH_INTERVAL` - Auto-refresh interval
  - `VITE_ENABLE_MOCK_DATA` - Toggle mock data
  - `VITE_APP_NAME` - Application name
  - `VITE_APP_VERSION` - Application version

#### Code Quality Tools
- **ESLint** configuration with React best practices
- **Prettier** configuration for consistent formatting
- **NPM Scripts**:
  - `npm run lint` - Check for linting errors
  - `npm run lint:fix` - Auto-fix linting errors
  - `npm run format` - Format code
  - `npm run format:check` - Check formatting
  - `npm run preview` - Preview production build

#### Documentation
- **README.md** - Comprehensive project documentation
- **IMPLEMENTATION_SUMMARY.md** - Detailed change summary
- **QUICK_REFERENCE.md** - Developer quick reference
- **ARCHITECTURE.md** - Architecture diagrams and decisions
- **CHANGELOG.md** - This file

### Changed

#### App.jsx Refactoring
- **Removed** ~350 lines of hardcoded mock data
- **Replaced** `useState` with Redux `useSelector` and `useDispatch`
- **Integrated** `useDatabaseData` hook for automatic data fetching
- **Added** loading states to all sections
- **Updated** all event handlers to dispatch Redux actions
- **Reduced** file size from 660 lines to ~330 lines (50% reduction)

#### Main Entry Point
- **Wrapped** App with Redux Provider
- **Connected** Redux store to React application

#### .gitignore
- **Added** build outputs (`dist`, `build`)
- **Added** environment files (`.env*`)
- **Added** logs (`*.log`)
- **Added** testing artifacts (`coverage`)
- **Added** editor files (`.vscode`, `.idea`)
- **Added** OS-specific files (`.DS_Store`, `Thumbs.db`)

### Improved

#### Code Organization
- **Separated** concerns (UI, state, data, API)
- **Modularized** mock data
- **Created** reusable hooks
- **Established** clear file structure

#### Developer Experience
- **Consistent** code style with ESLint + Prettier
- **Better** error messages
- **Comprehensive** documentation
- **Quick** reference guides

#### User Experience
- **Loading** indicators throughout
- **Smooth** state transitions
- **Professional** appearance
- **Responsive** interactions

### Dependencies

#### Added
- `@reduxjs/toolkit` ^2.x - State management
- `react-redux` ^9.x - React bindings for Redux
- `eslint` ^9.x - JavaScript linting
- `@eslint/js` ^9.x - ESLint JavaScript config
- `eslint-plugin-react` ^7.x - React-specific linting
- `eslint-plugin-react-hooks` ^5.x - React Hooks linting
- `eslint-plugin-react-refresh` ^0.x - React Refresh support
- `prettier` ^3.x - Code formatting
- `eslint-config-prettier` ^9.x - ESLint + Prettier integration

### Technical Debt Addressed
- ✅ Removed hardcoded mock data from components
- ✅ Eliminated prop drilling with Redux
- ✅ Centralized state management
- ✅ Added proper error handling
- ✅ Implemented loading states
- ✅ Created reusable data fetching logic
- ✅ Established code quality standards

### Metrics
- **Lines of Code**: Reduced by ~330 lines in App.jsx
- **Files Created**: 15 new files
- **Files Updated**: 5 files
- **Dependencies Added**: 10 packages
- **Code Coverage**: 0% → Ready for testing implementation

---

## [1.0.0] - 2026-01-29

### Initial Release

#### Features
- Real-time Oracle database monitoring
- CPU performance analysis (by session and SQL)
- Blocking session visualization
- Storage health monitoring
- Session detail drawer
- Responsive sidebar navigation
- Interactive charts with Recharts
- Shadcn/UI component library
- Tailwind CSS styling

#### Components
- `App.jsx` - Main application
- `Sidebar.jsx` - Navigation sidebar
- `CPUBySession.jsx` - Session CPU analysis
- `CPUBySQL.jsx` - SQL query CPU analysis
- `StorageHealth.jsx` - Storage monitoring
- `BlockingGraph.jsx` - Blocking sessions
- `SQLDetailDrawer.jsx` - Session details

#### Tech Stack
- React 18.3.1
- Vite 6.3.5
- Tailwind CSS 4.1.12
- Recharts 2.15.2
- Radix UI components
- Lucide React icons

---

## Future Releases

### [3.0.0] - Planned
- TypeScript migration
- Unit and integration tests
- Authentication and authorization
- Error boundaries
- WebSocket real-time updates
- Performance optimizations
- CI/CD pipeline

### [2.1.0] - Planned
- Enhanced error handling
- Retry logic for failed API calls
- Offline support
- Data caching
- Export functionality (CSV, PDF)
- Advanced filtering and search

---

## Version History

- **2.0.0** (2026-01-30) - Production-ready foundation with Redux, API layer, and code quality tools
- **1.0.0** (2026-01-29) - Initial release with basic monitoring features

---

**Maintained by**: Development Team
**Last Updated**: January 30, 2026
