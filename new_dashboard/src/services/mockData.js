// Mock data for OraView - Simulates Oracle Database Infrastructure data

// Generate time-series data for charts
const generateTimeSeriesData = (points = 20, baseValue = 50, variance = 20) => {
    const now = Date.now();
    return Array.from({ length: points }, (_, i) => ({
        timestamp: new Date(now - (points - i) * 60000).toISOString(),
        value: Math.max(0, Math.min(100, baseValue + (Math.random() - 0.5) * variance)),
    }));
};

// Database Fleet Mock Data
export const mockDatabaseFleet = [
    {
        id: 'db-prod-01',
        name: 'PROD-ORA-01',
        version: '19.3.0.0.0',
        ip: '10.0.1.100',
        status: 'healthy',
        cpuSparkline: generateTimeSeriesData(15, 45, 15),
        environment: 'Production',
        region: 'us-east-1',
    },
    {
        id: 'db-prod-02',
        name: 'PROD-ORA-02',
        version: '19.3.0.0.0',
        ip: '10.0.1.101',
        status: 'healthy',
        cpuSparkline: generateTimeSeriesData(15, 35, 10),
        environment: 'Production',
        region: 'us-east-1',
    },
    {
        id: 'db-staging-01',
        name: 'STAGING-DB',
        version: '21.3.0.0.0',
        ip: '10.0.2.50',
        status: 'warning',
        cpuSparkline: generateTimeSeriesData(15, 75, 20),
        environment: 'Staging',
        region: 'us-west-2',
    },
    {
        id: 'db-dev-01',
        name: 'DEV-ORA-01',
        version: '21.3.0.0.0',
        ip: '10.0.3.25',
        status: 'healthy',
        cpuSparkline: generateTimeSeriesData(15, 25, 15),
        environment: 'Development',
        region: 'us-west-2',
    },
    {
        id: 'db-analytics-01',
        name: 'ANALYTICS-DB',
        version: '19.3.0.0.0',
        ip: '10.0.4.200',
        status: 'critical',
        cpuSparkline: generateTimeSeriesData(15, 90, 10),
        environment: 'Production',
        region: 'eu-west-1',
    },
    {
        id: 'db-reporting-01',
        name: 'REPORTING-ORA',
        version: '21.3.0.0.0',
        ip: '10.0.5.150',
        status: 'healthy',
        cpuSparkline: generateTimeSeriesData(15, 40, 12),
        environment: 'Production',
        region: 'ap-southeast-1',
    },
];

// Dashboard Metrics Mock Data Generator
export const generateDashboardMetrics = (dbId) => {
    const now = Date.now();
    const points = 30;

    // CPU Usage (Host vs DB)
    const cpuUsage = Array.from({ length: points }, (_, i) => ({
        timestamp: new Date(now - (points - i) * 60000).toISOString(),
        host: Math.max(0, Math.min(100, 45 + (Math.random() - 0.5) * 30)),
        database: Math.max(0, Math.min(100, 35 + (Math.random() - 0.5) * 25)),
    }));

    // Active Sessions (ASH) - Wait Classes
    const activeSessions = Array.from({ length: points }, (_, i) => ({
        timestamp: new Date(now - (points - i) * 60000).toISOString(),
        cpu: Math.floor(Math.random() * 50) + 10,
        io: Math.floor(Math.random() * 30) + 5,
        network: Math.floor(Math.random() * 15) + 2,
        lock: Math.floor(Math.random() * 10),
        other: Math.floor(Math.random() * 8),
    }));

    // Top SQL Queries
    const topSQL = [
        {
            sqlId: 'a7k9m2p3x4c5v',
            sqlText: 'SELECT * FROM orders WHERE status = :1 AND created_date > :2',
            executions: 15234,
            cpuPercent: 23.5,
            elapsedTime: 1234.56,
            bufferGets: 456789,
        },
        {
            sqlId: 'b2n8k5m9p1x7z',
            sqlText: 'UPDATE customer_profile SET last_login = SYSDATE WHERE customer_id = :1',
            executions: 12456,
            cpuPercent: 18.2,
            elapsedTime: 987.34,
            bufferGets: 234567,
        },
        {
            sqlId: 'c9x4v7b2n5k8m',
            sqlText: 'INSERT INTO audit_log (user_id, action, timestamp) VALUES (:1, :2, :3)',
            executions: 9876,
            cpuPercent: 15.7,
            elapsedTime: 654.21,
            bufferGets: 123456,
        },
        {
            sqlId: 'd5k2m8p4x9v3b',
            sqlText: 'SELECT COUNT(*) FROM transactions WHERE transaction_date = TRUNC(SYSDATE)',
            executions: 7654,
            cpuPercent: 12.3,
            elapsedTime: 543.12,
            bufferGets: 98765,
        },
        {
            sqlId: 'e8v3b9k5m2p7x',
            sqlText: 'DELETE FROM temp_staging WHERE created_date < SYSDATE - 7',
            executions: 5432,
            cpuPercent: 9.8,
            elapsedTime: 432.98,
            bufferGets: 76543,
        },
    ];

    // Tablespace Usage
    const tablespaces = [
        { name: 'SYSTEM', used: 8.5, total: 10, percentUsed: 85 },
        { name: 'SYSAUX', used: 6.2, total: 10, percentUsed: 62 },
        { name: 'USERS', used: 45.8, total: 50, percentUsed: 91.6 },
        { name: 'TEMP', used: 12.3, total: 20, percentUsed: 61.5 },
        { name: 'UNDO', used: 7.8, total: 15, percentUsed: 52 },
        { name: 'DATA_01', used: 89.2, total: 100, percentUsed: 89.2 },
    ];

    // IOPS (Read vs Write)
    const iops = Array.from({ length: points }, (_, i) => ({
        timestamp: new Date(now - (points - i) * 60000).toISOString(),
        read: Math.floor(Math.random() * 5000) + 1000,
        write: Math.floor(Math.random() * 3000) + 500,
    }));

    // Blocking Sessions
    const blockingSessions = Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0;

    // Connection Pool Stats
    const connectionPool = {
        active: Math.floor(Math.random() * 80) + 20,
        idle: Math.floor(Math.random() * 50) + 10,
        max: 150,
    };

    return {
        dbId,
        lastPolled: new Date().toISOString(),
        connectionMode: 'Read-Only',
        cpuUsage,
        activeSessions,
        topSQL,
        tablespaces,
        iops,
        blockingSessions,
        connectionPool,
    };
};

// Detailed Metric Data for Drill-down Pages
export const generateDetailedMetric = (metricId, dbId) => {
    const now = Date.now();
    const points = 100; // More data points for detailed view

    const metricConfigs = {
        cpu: {
            title: 'CPU Usage Over Time',
            description: 'Host and Database CPU utilization',
            data: Array.from({ length: points }, (_, i) => ({
                timestamp: new Date(now - (points - i) * 60000).toISOString(),
                host: Math.max(0, Math.min(100, 45 + (Math.random() - 0.5) * 30)),
                database: Math.max(0, Math.min(100, 35 + (Math.random() - 0.5) * 25)),
            })),
        },
        sessions: {
            title: 'Active Sessions by Wait Class',
            description: 'ASH (Active Session History) breakdown',
            data: Array.from({ length: points }, (_, i) => ({
                timestamp: new Date(now - (points - i) * 60000).toISOString(),
                cpu: Math.floor(Math.random() * 50) + 10,
                io: Math.floor(Math.random() * 30) + 5,
                network: Math.floor(Math.random() * 15) + 2,
                lock: Math.floor(Math.random() * 10),
                other: Math.floor(Math.random() * 8),
            })),
        },
        iops: {
            title: 'I/O Operations Per Second',
            description: 'Read and Write IOPS trends',
            data: Array.from({ length: points }, (_, i) => ({
                timestamp: new Date(now - (points - i) * 60000).toISOString(),
                read: Math.floor(Math.random() * 5000) + 1000,
                write: Math.floor(Math.random() * 3000) + 500,
            })),
        },
    };

    return metricConfigs[metricId] || metricConfigs.cpu;
};
