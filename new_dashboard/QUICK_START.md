# OraView - Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: **http://localhost:5173**

---

## 🔐 Login

Use **any** email and password to login (mock authentication):
- Email: `admin@oraview.com`
- Password: `password123` (or any password)

---

## 🎯 Navigation Flow

1. **Login** → Enter credentials → Click "Sign In"
2. **Database Fleet** → Click on any database card (e.g., PROD-ORA-01)
3. **Dashboard** → View real-time metrics
4. **Drill-down** → Click any chart for detailed analysis

---

## 🌙 Features to Try

### Theme Toggle
- Click the **sun/moon icon** in the top-right header
- Switches between light and dark mode

### Sidebar
- Click the **chevron icon** to collapse/expand sidebar
- Navigate between pages using sidebar menu

### Auto-Polling
- Dashboard metrics refresh every **15 seconds**
- Watch the "Last Polled" timer in the header

### Interactive Charts
- **Click** on CPU, Sessions, or IOPS charts to drill down
- **Hover** over charts to see detailed tooltips
- **Click** on SQL rows in the Top SQL table

### Database Status
- 🟢 **Green** = Healthy
- 🟡 **Amber** = Warning
- 🔴 **Red** = Critical

---

## 📊 Dashboard Metrics

### 1. CPU Usage
Multi-line chart showing:
- Host CPU %
- Database CPU %

### 2. Active Sessions (ASH)
Stacked area chart with wait classes:
- CPU
- I/O
- Network
- Lock
- Other

### 3. Top SQL by CPU
Table showing:
- SQL ID
- SQL Text (truncated)
- Executions
- CPU %

### 4. Tablespace Usage
Progress bars for:
- SYSTEM
- SYSAUX
- USERS
- TEMP
- UNDO
- DATA_01

Color coding:
- Green: < 75%
- Amber: 75-90%
- Red: > 90%

### 5. IOPS
Bar chart showing:
- Read operations
- Write operations

### 6. Blocking Sessions
Large metric card:
- Shows count of blocked sessions
- Red if > 0
- Green if 0

---

## 🗂️ Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   └── MetricCard.jsx
├── pages/           # Page components
│   ├── Login.jsx
│   ├── SelectDatabase.jsx
│   ├── Dashboard.jsx
│   └── MetricDetail.jsx
├── services/        # Data layer
│   ├── mockData.js
│   └── api.js
├── store/          # Redux state
│   ├── dbSlice.js
│   └── store.js
├── App.jsx         # Main app with routing
└── main.jsx        # Entry point
```

---

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS v3** - Styling
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **React Router v6** - Routing

---

## 📝 Mock Data

The application uses simulated data:
- **6 databases** in the fleet
- **30 data points** for dashboard charts
- **100 data points** for detailed metric views
- **Network latency** simulation (500-1000ms)
- **Auto-refresh** every 15 seconds

---

## 🎨 Design Features

- ✨ Glass-morphism login card
- 🌓 Light/Dark mode toggle
- 📱 Responsive grid layout
- 🎯 Hover effects on interactive elements
- 💫 Pulsing status indicators
- 🔄 Smooth transitions
- 📊 Professional data visualization

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### CSS Not Loading
```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### Charts Not Rendering
- Check browser console for errors
- Ensure all dependencies are installed
- Try refreshing the page

---

## 📚 Additional Resources

- **README.md** - Detailed documentation
- **PROJECT_SUMMARY.md** - Complete feature list
- **src/services/mockData.js** - Data structure reference

---

## 🎓 What You'll Learn

- Modern React development
- Redux Toolkit state management
- RTK Query data fetching
- Tailwind CSS styling
- Recharts data visualization
- React Router navigation
- Mock API development
- Enterprise UI/UX patterns

---

## ✅ Verification Checklist

After starting the app, verify:
- [ ] Login page displays with glass card
- [ ] Can login with any credentials
- [ ] Database fleet shows 6 cards
- [ ] Each card has a sparkline
- [ ] Can select a database
- [ ] Dashboard loads with all metrics
- [ ] Charts render correctly
- [ ] Theme toggle works
- [ ] Sidebar can collapse
- [ ] "Last Polled" timer updates
- [ ] Can click charts for drill-down
- [ ] Can navigate back to dashboard

---

**Happy Monitoring! 🎉**

For questions or issues, refer to the README.md or PROJECT_SUMMARY.md files.
