import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mockDatabaseFleet, generateDashboardMetrics, generateDetailedMetric } from '../src/services/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {
    databases: mockDatabaseFleet,
    dashboard: [],
    metrics: []
};

// Generate dashboard data for each database
mockDatabaseFleet.forEach(dbItem => {
    const dashboardData = generateDashboardMetrics(dbItem.id);
    // Add an id to the dashboard object for json-server retrieval
    dashboardData.id = dbItem.id;
    db.dashboard.push(dashboardData);

    // Generate detailed metrics
    ['cpu', 'sessions', 'iops'].forEach(metricId => {
        const detail = generateDetailedMetric(metricId, dbItem.id);
        db.metrics.push({
            id: `${metricId}-${dbItem.id}`,
            metricId,
            dbId: dbItem.id,
            ...detail
        });
    });
});

fs.writeFileSync(
    path.join(__dirname, '../db.json'),
    JSON.stringify(db, null, 2)
);

console.log('db.json generated successfully!');
