# OraView - Oracle Database Infrastructure Observability

A world-class, enterprise-grade SaaS application for Oracle Database Infrastructure Observability, built with modern web technologies.

## 🚀 Features

- **Real-time Monitoring**: Auto-polling dashboard with 15-second refresh intervals
- **Database Fleet Management**: Visual overview of all Oracle databases
- **Comprehensive Metrics**:
  - CPU Usage (Host vs Database)
  - Active Sessions with Wait Class breakdown
  - Top SQL queries by CPU consumption
  - Tablespace usage with visual indicators
  - IOPS (Read/Write operations)
  - Blocking sessions monitoring
- **Drill-down Analysis**: Click any metric to view detailed time-series data
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and tablet devices

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Data Fetching**: RTK Query with auto-polling
- **Visualization**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM v6

## 📁 Project Structure

```
new_dashboard/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Top navigation bar with breadcrumbs
│   │   ├── Sidebar.jsx         # Collapsible sidebar navigation
│   │   └── MetricCard.jsx      # Reusable metric card component
│   ├── pages/
│   │   ├── Login.jsx           # Authentication page
│   │   ├── SelectDatabase.jsx  # Database fleet selection
│   │   ├── Dashboard.jsx       # Main monitoring dashboard
│   │   └── MetricDetail.jsx    # Detailed metric drill-down
│   ├── services/
│   │   ├── mockData.js         # Mock data generators
│   │   └── api.js              # RTK Query API configuration
│   ├── store/
│   │   ├── dbSlice.js          # Redux slice for UI state
│   │   └── store.js            # Redux store configuration
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🚦 Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Login

Use any email and password to login (mock authentication).

## 🎨 Design System

### Colors

- **Light Mode**: 
  - Background: `bg-gray-50`
  - Cards: `bg-white`
  
- **Dark Mode**: 
  - Background: `bg-slate-900`
  - Cards: `bg-slate-800`

### Status Indicators

- 🟢 **Healthy**: Green with pulsing animation
- 🟡 **Warning**: Amber with pulsing animation
- 🔴 **Critical**: Red with pulsing animation

## 📊 Mock Data

The application uses a sophisticated mock API layer that simulates:

- Network latency (500-1000ms)
- Real-time data updates
- Time-series metric generation
- Database fleet information

## 🔄 Auto-Polling

Dashboard metrics automatically refresh every 15 seconds to simulate live monitoring.

## 🗺️ Navigation Flow

1. **Login** (`/`) → Enter any credentials
2. **Database Fleet** (`/select-db`) → Select a database
3. **Dashboard** (`/dashboard`) → View metrics and click for details
4. **Metric Detail** (`/metric/:id/:dbId`) → Detailed analysis

## 🎯 Key Components

### Dashboard
- Multi-line CPU charts
- Stacked area charts for sessions
- Bar charts for IOPS
- Interactive SQL table
- Progress bars for tablespace usage
- Real-time blocking session alerts

### MetricCard
- Reusable wrapper for all metrics
- Optional trend indicators
- Click handlers for drill-down

### RTK Query API
- Custom base query with simulated latency
- Auto-polling configuration
- Cache management

## 🌙 Theme Toggle

Click the sun/moon icon in the header to switch between light and dark modes.

## 📱 Responsive Design

The application is optimized for:
- Desktop (1920px+)
- Laptop (1440px)
- Tablet (768px+)

## 🔒 Authentication

Mock authentication stores a fake JWT token in Redux state. Logout clears the session.

## 🚀 Production Build

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## 📝 License

This is a demonstration project for Oracle Database Infrastructure Observability.

---

Built with ❤️ using React, Redux Toolkit, and Tailwind CSS
