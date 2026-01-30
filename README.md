# Database Observability Dashboard

A real-time Oracle database monitoring dashboard built with React, Redux, and modern web technologies.

## 🚀 Features

- **Real-time Monitoring**: Track CPU usage, sessions, and storage health
- **Interactive Visualizations**: Charts and graphs powered by Recharts
- **Session Management**: View and manage database sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **State Management**: Centralized state with Redux Toolkit
- **API Integration**: Flexible API layer with mock data fallback
- **Loading States**: Skeleton loaders for better UX

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd Database_Observability_Dashboard

# Install dependencies
npm install
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory (use `.env.example` as a template):

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_REFRESH_INTERVAL=30000
VITE_APP_NAME=Database Observability Dashboard
VITE_APP_VERSION=1.0.0
```

### Available Environments

- **Development** (`.env.development`): Local development with backend on port 3000
- **Production** (`.env.production`): Production API endpoint

## 🏃 Running the Application

### Development Mode

**Option 1: Run both frontend and backend together (Recommended)**
```bash
npm start
```

**Option 2: Run separately in two terminals**

Terminal 1 - Backend API:
```bash
npm run backend
```

Terminal 2 - Frontend:
```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

## 🧪 Code Quality

### Linting

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

### Formatting

```bash
# Format code with Prettier
npm run format

# Check formatting
npm run format:check
```

## 📁 Project Structure

```
src/
├── api/                    # API integration layer
│   └── database.js         # Database API service
├── app/
│   ├── App.jsx            # Main application component
│   └── components/        # React components
│       ├── LoadingStates.jsx
│       ├── Sidebar.jsx
│       ├── CPUBySession.jsx
│       ├── CPUBySQL.jsx
│       ├── StorageHealth.jsx
│       ├── BlockingGraph.jsx
│       ├── SQLDetailDrawer.jsx
│       └── ui/            # Shadcn UI components
├── hooks/                 # Custom React hooks
│   └── useDatabaseData.js
├── store/                 # Redux store and slices
│   ├── index.js
│   ├── dashboardSlice.js
│   └── dataSlice.js
├── styles/                # CSS files
│   ├── index.css
│   ├── theme.css
│   └── fonts.css
└── main.jsx              # Application entry point

Backend/
├── db.json               # JSON database for development
└── server.js             # Express API server
```

## 🔧 Technology Stack

### Core
- **React 18.3.1** - UI library
- **Vite 6.3.5** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Routing

### UI & Styling
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Shadcn/UI** - Component library
- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Icon library

### Data Visualization
- **Recharts 2.15.2** - Chart library

### Code Quality
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting

## 🎯 Key Features Explained

### State Management (Redux)

The application uses Redux Toolkit for centralized state management:

- **Dashboard Slice**: Manages UI state (selected database, time range, active section)
- **Data Slice**: Manages fetched data (incidents, CPU metrics, storage health)

### API Integration

The API layer (`src/api/database.js`) provides:

The API layer (`src/api/database.js`) provides:

- Clean abstraction for all API calls
- Comprehensive error handling and logging
- JSDoc documentation
- Environment-based configuration

### Custom Hooks

- **useDatabaseData**: Automatically fetches data when database or time range changes
- **useAutoRefresh**: Manages auto-refresh functionality

### Loading States

Multiple loading components for better UX:
- `LoadingSpinner` - General purpose spinner
- `LoadingCard` - Skeleton loader for cards
- `LoadingTable` - Skeleton loader for tables
- `LoadingChart` - Skeleton loader for charts
- `PageLoader` - Full-page loading state

## 📊 Available Sections

1. **Overview** - High-level dashboard with key metrics
2. **CPU by Session** - Session-level CPU analysis
3. **CPU by SQL** - SQL query-level CPU analysis
4. **Blocking Sessions** - Visual representation of blocking chains
5. **Storage Health** - Tablespace monitoring and health

## 🔄 Data Flow

1. User selects database/time range
2. Redux action dispatched
3. Custom hook (`useDatabaseData`) detects change
4. API call made (or mock data returned)
5. Redux store updated with new data
6. Components re-render with fresh data

## 🌐 API Endpoints (When Mock Data is Disabled)

- `GET /api/incidents?database={dbName}` - Get active incidents
- `GET /api/cpu-metrics?database={dbName}&range={timeRange}` - Get CPU metrics
- `GET /api/storage?database={dbName}` - Get storage health
- `GET /api/blocking-sessions?database={dbName}` - Get blocking sessions
- `POST /api/sessions/{sid}/kill` - Kill a session
- `GET /api/databases` - Get available databases

## 🚧 Development Workflow

1. **Make changes** to source files
2. **Lint** your code: `npm run lint:fix`
3. **Format** your code: `npm run format`
4. **Test** in browser: `npm run dev`
5. **Build** for production: `npm run build`

## 📝 Recent Improvements

### ✅ Completed
1. ✅ Extracted mock data into separate files
2. ✅ Added comprehensive `.gitignore`
3. ✅ Created environment configuration files
4. ✅ Implemented Redux state management
5. ✅ Added loading states throughout the app
6. ✅ Created API integration layer with mock data fallback
7. ✅ Added ESLint and Prettier for code quality

### 🎯 Next Steps (Production Readiness)
- [ ] Add TypeScript for type safety
- [ ] Implement authentication and authorization
- [ ] Add unit and integration tests
- [ ] Set up CI/CD pipeline
- [ ] Add error boundaries
- [ ] Implement WebSocket for real-time updates
- [ ] Add comprehensive logging
- [ ] Performance optimization (code splitting, memoization)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Shadcn/UI](https://ui.shadcn.com/) for the component library
- [Recharts](https://recharts.org/) for charting capabilities
- [Lucide](https://lucide.dev/) for icons