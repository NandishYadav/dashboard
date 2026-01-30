# API Integration Guide

## ✅ Configuration Complete

The application is now configured to make **real API calls** to `http://localhost:3000/api`.

## 🔧 Current Configuration

- **API Base URL**: `http://localhost:3000/api`
- **Mock Data**: `DISABLED` (set to `false`)
- **Environment**: Development

## 📡 API Endpoints Being Called

When you open the application, it will make the following HTTP requests:

### 1. Get Incidents
```
GET http://localhost:3000/api/incidents?database=ORCL_PROD
```

### 2. Get CPU Metrics
```
GET http://localhost:3000/api/cpu-metrics?database=ORCL_PROD&range=5h
```

### 3. Get Storage Health
```
GET http://localhost:3000/api/storage?database=ORCL_PROD
```

### 4. Get Blocking Sessions
```
GET http://localhost:3000/api/blocking-sessions?database=ORCL_PROD
```

## 🔍 How to Verify API Calls

### Method 1: Browser Console
1. Open your browser at `http://localhost:5173`
2. Open Developer Tools (F12 or Right-click → Inspect)
3. Go to the **Console** tab
4. You should see logs like:

```
🔧 API Configuration:
  - Base URL: http://localhost:3000/api
  - Mock Data Enabled: false

🌐 Fetching incidents from API: http://localhost:3000/api/incidents?database=ORCL_PROD
🌐 Fetching CPU metrics from API: http://localhost:3000/api/cpu-metrics?database=ORCL_PROD&range=5h
🌐 Fetching storage health from API: http://localhost:3000/api/storage?database=ORCL_PROD
🌐 Fetching blocking sessions from API: http://localhost:3000/api/blocking-sessions?database=ORCL_PROD
```

### Method 2: Network Tab
1. Open Developer Tools (F12)
2. Go to the **Network** tab
3. Refresh the page
4. Filter by "Fetch/XHR"
5. You should see requests to:
   - `incidents?database=ORCL_PROD`
   - `cpu-metrics?database=ORCL_PROD&range=5h`
   - `storage?database=ORCL_PROD`
   - `blocking-sessions?database=ORCL_PROD`

### Method 3: Backend Server Logs
If you have a backend server running on `http://localhost:3000`, check its logs to see incoming requests.

## ⚠️ Expected Behavior

### If Backend Server is Running
- ✅ API calls will be made successfully
- ✅ Data will be fetched from your backend
- ✅ Console will show: `✅ Successfully fetched [data] from API`

### If Backend Server is NOT Running
- ❌ API calls will fail with network errors
- ❌ Console will show: `❌ Error fetching [data]: Failed to fetch`
- ❌ Application will show error states

## 🚀 Starting Your Backend Server

If you don't have a backend server running yet, you need to:

1. **Start your backend server** on port 3000
2. **Ensure it has the following endpoints**:
   - `GET /api/incidents?database={dbName}`
   - `GET /api/cpu-metrics?database={dbName}&range={timeRange}`
   - `GET /api/storage?database={dbName}`
   - `GET /api/blocking-sessions?database={dbName}`
   - `POST /api/sessions/{sid}/kill`
   - `GET /api/databases`

3. **Ensure CORS is enabled** on your backend to allow requests from `http://localhost:5173`

## 🔄 Switching Back to Mock Data

If you need to use mock data (for development without backend):

1. Edit `.env.development`:
```bash
VITE_ENABLE_MOCK_DATA=true
```

2. Restart the dev server:
```bash
# Stop current server (Ctrl+C)
npm run dev
```

## 📋 Expected API Response Formats

### Incidents Response
```json
[
  {
    "id": "1",
    "role": "BLOCKER",
    "sid": 1234,
    "username": "APP_USER",
    "sqlId": "a8f3k2m9p1x4s",
    "elapsedTime": 2400,
    "waitEvent": "enq: TX - row lock contention",
    "waitClass": "Application",
    "blockingSid": null,
    "impactedSessions": 7,
    "sqlText": "UPDATE orders SET status = 'PROCESSING' WHERE order_id = :1"
  }
]
```

### CPU Metrics Response
```json
{
  "sessionCPU": [
    {
      "timestamp": "2026-01-28T08:00:00.000Z",
      "sid": 2890,
      "username": "BATCH_USER",
      "program": "python@batch-processor",
      "cpuPercent": 72,
      "cpuTime": 5400,
      "sqlId": "f9n2q5r8t4w7x",
      "status": "ACTIVE"
    }
  ],
  "sqlQueryCPU": [
    {
      "timestamp": "2026-01-28T08:00:00.000Z",
      "sqlId": "a8f3k2m9p1x4s",
      "cpuPercent": 82,
      "cpuTime": 3240,
      "executions": 12450,
      "avgCpuPerExec": 0.26,
      "elapsedTime": 3840,
      "sqlText": "UPDATE orders SET status = 'PROCESSING'",
      "module": "OrderService"
    }
  ]
}
```

### Storage Health Response
```json
{
  "tablespaces": [
    {
      "name": "USERS",
      "usedPercent": 92,
      "freeMB": 1024,
      "totalMB": 12800
    }
  ],
  "waitClassData": [
    {
      "name": "Application",
      "value": 35
    }
  ]
}
```

### Blocking Sessions Response
```json
[
  {
    "sid": 1234,
    "username": "APP_USER",
    "program": "java@app-server-01",
    "waitTime": 2400,
    "blockingSid": null,
    "isRootBlocker": true
  }
]
```

## 🐛 Troubleshooting

### Problem: "Failed to fetch" errors
**Solution**: 
- Ensure your backend server is running on `http://localhost:3000`
- Check that CORS is enabled on your backend
- Verify the backend endpoints are correct

### Problem: Still seeing mock data
**Solution**:
- Check `.env.development` has `VITE_ENABLE_MOCK_DATA=false`
- Restart the dev server (Ctrl+C, then `npm run dev`)
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### Problem: API calls not showing in Network tab
**Solution**:
- Open Network tab BEFORE loading the page
- Make sure "Fetch/XHR" filter is enabled
- Refresh the page with Network tab open

## 📞 Need Help?

If you're still having issues:

1. Check the browser console for error messages
2. Check the Network tab for failed requests
3. Verify your backend server is running and accessible
4. Check backend server logs for incoming requests

## 🎯 Quick Test

To quickly test if API calls are working:

1. Open browser console
2. Look for: `🔧 API Configuration: - Mock Data Enabled: false`
3. Look for: `🌐 Fetching [data] from API: http://localhost:3000/api/...`
4. If you see these, API calls are being made! ✅

---

**Last Updated**: January 30, 2026
**Status**: API Integration Active
