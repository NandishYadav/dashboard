import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Read database
const readDB = () => {
    const data = fs.readFileSync('./db.json', 'utf8');
    return JSON.parse(data);
};

// API Routes
app.get('/api/incidents', (req, res) => {
    const db = readDB();
    console.log(`📥 GET /api/incidents?database=${req.query.database}`);
    res.json(db.incidents);
});

app.get('/api/cpu-metrics', (req, res) => {
    const db = readDB();
    console.log(`📥 GET /api/cpu-metrics?database=${req.query.database}&range=${req.query.range}`);
    res.json(db['cpu-metrics']);
});

app.get('/api/storage', (req, res) => {
    const db = readDB();
    console.log(`📥 GET /api/storage?database=${req.query.database}`);
    res.json(db.storage);
});

app.get('/api/blocking-sessions', (req, res) => {
    const db = readDB();
    console.log(`📥 GET /api/blocking-sessions?database=${req.query.database}`);
    res.json(db['blocking-sessions']);
});

app.get('/api/databases', (req, res) => {
    const db = readDB();
    console.log(`📥 GET /api/databases`);
    res.json(db.databases);
});

app.post('/api/sessions/:sid/kill', (req, res) => {
    const { sid } = req.params;
    console.log(`📥 POST /api/sessions/${sid}/kill`);
    res.json({
        success: true,
        message: `Session ${sid} killed successfully`,
        sid: parseInt(sid)
    });
});

// Start server
app.listen(PORT, () => {
    console.log('');
    console.log('🚀 ========================================');
    console.log(`🚀 Backend API Server is running!`);
    console.log(`🚀 URL: http://localhost:${PORT}`);
    console.log('🚀 ========================================');
    console.log('');
    console.log('📡 Available endpoints:');
    console.log(`   GET  http://localhost:${PORT}/api/incidents`);
    console.log(`   GET  http://localhost:${PORT}/api/cpu-metrics`);
    console.log(`   GET  http://localhost:${PORT}/api/storage`);
    console.log(`   GET  http://localhost:${PORT}/api/blocking-sessions`);
    console.log(`   GET  http://localhost:${PORT}/api/databases`);
    console.log(`   POST http://localhost:${PORT}/api/sessions/:sid/kill`);
    console.log('');
});
