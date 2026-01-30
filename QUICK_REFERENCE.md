# Quick Reference Guide

## 🗂️ File Structure

### Mock Data (`src/mocks/`)
```javascript
// Import mock data
import { mockIncidents } from '@/mocks/incidents';
import { mockSessionCPU, mockBlockingNodes } from '@/mocks/sessions';
import { mockSQLQueryCPU } from '@/mocks/sqlQueries';
import { tablespaceData, waitClassData } from '@/mocks/storage';
```

### Redux Store (`src/store/`)

#### Dashboard State
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDb, setTimeRange, setActiveSection } from '@/store/dashboardSlice';

// In component
const dispatch = useDispatch();
const { selectedDb, timeRange, activeSection } = useSelector(state => state.dashboard);

// Update state
dispatch(setSelectedDb('ORCL_PROD'));
dispatch(setTimeRange('5h'));
dispatch(setActiveSection('cpu-session'));
```

#### Data State
```javascript
import { fetchIncidents, fetchCPUMetrics } from '@/store/dataSlice';

// In component
const { incidents, sessionCPU, loading, errors } = useSelector(state => state.data);

// Fetch data
dispatch(fetchIncidents('ORCL_PROD'));
dispatch(fetchCPUMetrics({ dbName: 'ORCL_PROD', timeRange: '5h' }));
```

### API Layer (`src/api/`)

```javascript
import { databaseAPI } from '@/api/database';

// Fetch data
const incidents = await databaseAPI.getIncidents('ORCL_PROD');
const cpuMetrics = await databaseAPI.getCPUMetrics('ORCL_PROD', '5h');
const storage = await databaseAPI.getStorageHealth('ORCL_PROD');
const blocking = await databaseAPI.getBlockingSessions('ORCL_PROD');

// Kill session
await databaseAPI.killSession(1234);
```

### Custom Hooks (`src/hooks/`)

```javascript
import { useDatabaseData } from '@/hooks/useDatabaseData';

// In component - automatically fetches data
const {
  incidents,
  sessionCPU,
  sqlQueryCPU,
  blockingNodes,
  tablespaces,
  loading,
  errors
} = useDatabaseData();
```

### Loading States (`src/app/components/`)

```javascript
import { 
  LoadingSpinner, 
  LoadingCard, 
  LoadingTable, 
  LoadingChart,
  PageLoader 
} from '@/app/components/LoadingStates';

// Usage
{loading ? <LoadingChart /> : <MyChart data={data} />}
```

## 🔧 Common Tasks

### Adding a New Redux Action

1. **Update the slice** (`src/store/dashboardSlice.js`):
```javascript
reducers: {
  setNewValue: (state, action) => {
    state.newValue = action.payload;
  },
}
```

2. **Export the action**:
```javascript
export const { setNewValue } = dashboardSlice.actions;
```

3. **Use in component**:
```javascript
import { setNewValue } from '@/store/dashboardSlice';
dispatch(setNewValue('new value'));
```

### Adding a New API Endpoint

1. **Add method to API** (`src/api/database.js`):
```javascript
getNewData: async (param) => {
  if (ENABLE_MOCK_DATA) {
    await delay(500);
    return mockNewData;
  }
  
  const response = await fetch(`${API_BASE_URL}/new-endpoint?param=${param}`);
  return await response.json();
}
```

2. **Create async thunk** (`src/store/dataSlice.js`):
```javascript
export const fetchNewData = createAsyncThunk(
  'data/fetchNewData',
  async (param, { rejectWithValue }) => {
    try {
      return await databaseAPI.getNewData(param);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

3. **Add to reducer**:
```javascript
extraReducers: (builder) => {
  builder
    .addCase(fetchNewData.pending, (state) => {
      state.loading.newData = true;
    })
    .addCase(fetchNewData.fulfilled, (state, action) => {
      state.loading.newData = false;
      state.newData = action.payload;
    })
    .addCase(fetchNewData.rejected, (state, action) => {
      state.loading.newData = false;
      state.errors.newData = action.payload;
    });
}
```

### Adding New Mock Data

1. **Create file** (`src/mocks/newData.js`):
```javascript
export const mockNewData = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];
```

2. **Import in API** (`src/api/database.js`):
```javascript
import { mockNewData } from '@/mocks/newData';
```

## 🎨 Component Patterns

### Using Redux in Components

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSection } from '@/store/dashboardSlice';

function MyComponent() {
  const dispatch = useDispatch();
  const { activeSection } = useSelector(state => state.dashboard);
  const { incidents, loading } = useSelector(state => state.data);
  
  const handleClick = () => {
    dispatch(setActiveSection('new-section'));
  };
  
  if (loading.incidents) {
    return <LoadingSpinner />;
  }
  
  return <div onClick={handleClick}>{/* content */}</div>;
}
```

### Creating a New Section

1. **Add to Sidebar** (`src/app/components/Sidebar.jsx`):
```javascript
const navigationItems = [
  // ...existing items
  { id: 'new-section', label: 'New Section', icon: IconName },
];
```

2. **Add case to App.jsx**:
```javascript
case 'new-section':
  return (
    <section>
      <NewSectionComponent data={data} />
    </section>
  );
```

## 🔍 Debugging Tips

### Redux DevTools
1. Install Redux DevTools browser extension
2. Open DevTools → Redux tab
3. Inspect state, actions, and time-travel debug

### Check Loading States
```javascript
const { loading, errors } = useSelector(state => state.data);
console.log('Loading:', loading);
console.log('Errors:', errors);
```

### Verify API Calls
```javascript
// Check if mock data is enabled
console.log('Mock data enabled:', import.meta.env.VITE_ENABLE_MOCK_DATA);
console.log('API URL:', import.meta.env.VITE_API_BASE_URL);
```

## 📝 Code Style

### ESLint
```bash
# Check for errors
npm run lint

# Auto-fix errors
npm run lint:fix
```

### Prettier
```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

## 🌍 Environment Variables

### Access in Code
```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const enableMock = import.meta.env.VITE_ENABLE_MOCK_DATA === 'true';
```

### Switch Environments
```bash
# Development (uses .env.development)
npm run dev

# Production (uses .env.production)
npm run build
```

## 🚀 Deployment Checklist

- [ ] Set `VITE_ENABLE_MOCK_DATA=false` in production
- [ ] Update `VITE_API_BASE_URL` to production API
- [ ] Run `npm run lint` - should have 0 errors
- [ ] Run `npm run format:check` - should pass
- [ ] Run `npm run build` - should succeed
- [ ] Test production build with `npm run preview`
- [ ] Verify all features work with real API
- [ ] Check browser console for errors
- [ ] Test on multiple browsers
- [ ] Test responsive design on mobile

## 📚 Additional Resources

- **Redux Toolkit**: https://redux-toolkit.js.org/
- **React Hooks**: https://react.dev/reference/react
- **Vite Env Variables**: https://vitejs.dev/guide/env-and-mode.html
- **ESLint**: https://eslint.org/
- **Prettier**: https://prettier.io/
