# 🚀 Backend Server Setup Complete!

## ✅ Status: Backend API Server is Running

Your backend API server is now running on **http://localhost:3000**

## 📡 Available API Endpoints

All endpoints are accessible and ready to serve data:

- ✅ `GET  http://localhost:3000/api/incidents`
- ✅ `GET  http://localhost:3000/api/cpu-metrics`
- ✅ `GET  http://localhost:3000/api/storage`
- ✅ `GET  http://localhost:3000/api/blocking-sessions`
- ✅ `GET  http://localhost:3000/api/databases`
- ✅ `POST http://localhost:3000/api/sessions/:sid/kill`

## 🎯 Current Setup

### Running Services

1. **Backend API Server** (Port 3000)
   - Running in terminal
   - Serving data from `db.json`
   - CORS enabled for frontend access

2. **Frontend Dev Server** (Port 5173)
   - Running in separate terminal
   - Making API calls to backend
   - Mock data: DISABLED

## 🔧 How to Use

### Option 1: Run Both Servers Separately (Current Setup)

**Terminal 1 - Backend:**
```bash
npm run backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option 2: Run Both Servers Together

```bash
npm start
```
This will run both backend and frontend concurrently in one terminal.

## 🧪 Test the Backend

### Test in Browser
Open these URLs in your browser:

```
http://localhost:3000/api/incidents
http://localhost:3000/api/cpu-metrics
http://localhost:3000/api/storage
http://localhost:3000/api/blocking-sessions
http://localhost:3000/api/databases
```

### Test with curl
```bash
curl http://localhost:3000/api/incidents
curl http://localhost:3000/api/cpu-metrics
curl http://localhost:3000/api/storage
```

## 📊 Verify Frontend is Using Backend

1. Open **http://localhost:5173** in your browser
2. Open **Developer Tools** (F12)
3. Go to **Console** tab
4. You should see:
   ```
   🔧 API Configuration:
     - Base URL: http://localhost:3000/api
     - Mock Data Enabled: false
   
   🌐 Fetching incidents from API: http://localhost:3000/api/incidents?database=ORCL_PROD
   ✅ Successfully fetched incidents from API: [...]
   ```

5. Go to **Network** tab
6. Filter by "Fetch/XHR"
7. You should see successful requests to `localhost:3000`

## 📁 Files Created

1. **`db.json`** - Database file with all mock data
2. **`server.js`** - Express server serving the API
3. **`routes.json`** - Route configuration (not used with Express)

## 🔄 Modify Data

To change the data returned by the API:

1. Edit `db.json`
2. Save the file
3. Restart the backend server:
   ```bash
   # Stop: Ctrl+C
   npm run backend
   ```

## 🛠️ NPM Scripts

```json
{
  "dev": "vite",                    // Run frontend only
  "backend": "node server.js",      // Run backend only
  "start": "concurrently ...",      // Run both together
  "build": "vite build",            // Build for production
  "preview": "vite preview"         // Preview production build
}
```

## 🎨 Backend Server Features

- ✅ **CORS Enabled** - Frontend can make requests
- ✅ **Request Logging** - See all incoming requests in terminal
- ✅ **JSON Responses** - All endpoints return proper JSON
- ✅ **Query Parameters** - Supports database and range filters
- ✅ **POST Support** - Kill session endpoint works

## 🐛 Troubleshooting

### Backend Not Starting
```bash
# Check if port 3000 is already in use
lsof -ti:3000

# Kill process on port 3000
kill -9 $(lsof -ti:3000)

# Restart backend
npm run backend
```

### Frontend Not Connecting
1. Verify backend is running on port 3000
2. Check `.env.development` has `VITE_ENABLE_MOCK_DATA=false`
3. Restart frontend dev server
4. Clear browser cache

### CORS Errors
- Backend already has CORS enabled
- If still seeing errors, check browser console for details

## 📝 Example API Responses

### GET /api/incidents
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
    "sqlText": "UPDATE orders SET status = 'PROCESSING' WHERE order_id = :1 AND user_id = :2"
  }
]
```

### GET /api/cpu-metrics
```json
{
  "sessionCPU": [...],
  "sqlQueryCPU": [...]
}
```

### GET /api/storage
```json
{
  "tablespaces": [...],
  "waitClassData": [...]
}
```

## 🎯 Next Steps

1. ✅ Backend server is running
2. ✅ Frontend is configured to use backend
3. ✅ Open http://localhost:5173 to see the dashboard
4. ✅ Check browser console to verify API calls
5. ✅ Check Network tab to see HTTP requests

## 🔒 Production Deployment

For production, you'll want to:

1. Replace this mock server with a real Oracle database backend
2. Implement proper authentication
3. Add input validation
4. Use environment variables for configuration
5. Deploy backend and frontend separately

---

**Status**: ✅ Backend Server Running  
**Port**: 3000  
**Frontend**: http://localhost:5173  
**Backend**: http://localhost:3000  
**Last Updated**: January 30, 2026
