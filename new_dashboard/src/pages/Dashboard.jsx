import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Clock,
    AlertCircle,
    Database as DatabaseIcon,
    TrendingUp,
    HardDrive
} from 'lucide-react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useGetDashboardMetricsQuery } from '../services/api';
import { selectCurrentDb, selectTimeRange } from '../store/dbSlice';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MetricCard from '../components/MetricCard';

const Dashboard = () => {
    const navigate = useNavigate();
    const currentDb = useSelector(selectCurrentDb);
    const timeRange = useSelector(selectTimeRange);
    const [lastPolled, setLastPolled] = useState(0);

    const { data: metrics, isLoading, error } = useGetDashboardMetricsQuery(
        currentDb?.id,
        { skip: !currentDb, pollingInterval: 15000 }
    );

    // Redirect if no database selected
    useEffect(() => {
        if (!currentDb) {
            navigate('/select-db');
        }
    }, [currentDb, navigate]);

    // Update last polled timer
    useEffect(() => {
        if (metrics) {
            const interval = setInterval(() => {
                const seconds = Math.floor((Date.now() - new Date(metrics.lastPolled).getTime()) / 1000);
                setLastPolled(seconds);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [metrics]);

    if (!currentDb) return null;

    if (isLoading && !metrics) {
        return (
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">Loading dashboard metrics...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                        <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
                        <p className="text-red-800 dark:text-red-300 text-center">
                            Failed to load dashboard metrics
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getFilteredData = (data) => {
        if (!data || timeRange === 'custom') return data;

        const now = Date.now();
        let duration = 30 * 60 * 1000; // 30m default
        if (timeRange === '1h') duration = 60 * 60 * 1000;
        if (timeRange === '6h') duration = 6 * 60 * 60 * 1000;
        if (timeRange === '12h') duration = 12 * 60 * 60 * 1000;
        if (timeRange === '24h') duration = 24 * 60 * 60 * 1000;

        const cutoff = now - duration;
        return data.filter(item => new Date(item.timestamp).getTime() > cutoff);
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header breadcrumbs={['Dashboard', currentDb.name]} />

                <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-slate-900">
                    <div className="max-w-[1800px] mx-auto">
                        {/* Dashboard Header */}
                        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 truncate">
                                    {currentDb.name} Overview
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <DatabaseIcon className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Mode: <span className="font-semibold">{metrics?.connectionMode}</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Last Polled: <span className="font-semibold">{lastPolled}s ago</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Connection Pool Stats */}
                            <div className="glass-card px-4 py-3 md:px-6">
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Connection Pool</p>
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
                                            {metrics?.connectionPool.active}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Active</p>
                                    </div>
                                    <div>
                                        <p className="text-xl md:text-2xl font-bold text-gray-600 dark:text-gray-400">
                                            {metrics?.connectionPool.idle}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Idle</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            / {metrics?.connectionPool.max} max
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {/* CPU Usage */}
                            <MetricCard
                                title="CPU Usage"
                                clickable
                                onClick={() => navigate(`/metric/cpu/${currentDb.id}`)}
                                className="xl:col-span-2"
                            >
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={getFilteredData(metrics?.cpuUsage)}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                        <XAxis
                                            dataKey="timestamp"
                                            tickFormatter={formatTime}
                                            stroke="#6b7280"
                                            style={{ fontSize: '12px' }}
                                        />
                                        <YAxis
                                            stroke="#6b7280"
                                            style={{ fontSize: '12px' }}
                                            domain={[0, 100]}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                            }}
                                            labelFormatter={(value) => new Date(value).toLocaleString()}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="host"
                                            stroke="#3b82f6"
                                            strokeWidth={2}
                                            dot={false}
                                            name="Host CPU %"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="database"
                                            stroke="#10b981"
                                            strokeWidth={2}
                                            dot={false}
                                            name="DB CPU %"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </MetricCard>

                            {/* Blocking Sessions */}
                            <MetricCard title="Blocking Sessions">
                                <div className="flex flex-col items-center justify-center h-[250px]">
                                    <div
                                        className={`text-6xl font-bold mb-4 ${metrics?.blockingSessions > 0
                                            ? 'text-red-600 dark:text-red-400'
                                            : 'text-green-600 dark:text-green-400'
                                            }`}
                                    >
                                        {metrics?.blockingSessions}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {metrics?.blockingSessions > 0 ? 'Sessions Blocked' : 'No Blocking'}
                                    </p>
                                    {metrics?.blockingSessions > 0 && (
                                        <div className="mt-4 flex items-center space-x-2 text-red-600 dark:text-red-400">
                                            <AlertCircle className="w-5 h-5" />
                                            <span className="text-sm font-semibold">Action Required</span>
                                        </div>
                                    )}
                                </div>
                            </MetricCard>

                            {/* Active Sessions (ASH) */}
                            <MetricCard
                                title="Active Sessions (ASH)"
                                clickable
                                onClick={() => navigate(`/metric/sessions/${currentDb.id}`)}
                                className="xl:col-span-2"
                            >
                                <ResponsiveContainer width="100%" height={250}>
                                    <AreaChart data={getFilteredData(metrics?.activeSessions)}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                        <XAxis
                                            dataKey="timestamp"
                                            tickFormatter={formatTime}
                                            stroke="#6b7280"
                                            style={{ fontSize: '12px' }}
                                        />
                                        <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                            }}
                                            labelFormatter={(value) => new Date(value).toLocaleString()}
                                        />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            dataKey="cpu"
                                            stackId="1"
                                            stroke="#3b82f6"
                                            fill="#3b82f6"
                                            name="CPU"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="io"
                                            stackId="1"
                                            stroke="#10b981"
                                            fill="#10b981"
                                            name="I/O"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="network"
                                            stackId="1"
                                            stroke="#f59e0b"
                                            fill="#f59e0b"
                                            name="Network"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="lock"
                                            stackId="1"
                                            stroke="#ef4444"
                                            fill="#ef4444"
                                            name="Lock"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="other"
                                            stackId="1"
                                            stroke="#6b7280"
                                            fill="#6b7280"
                                            name="Other"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </MetricCard>

                            {/* IOPS */}
                            <MetricCard
                                title="IOPS (I/O Operations/sec)"
                                clickable
                                onClick={() => navigate(`/metric/iops/${currentDb.id}`)}
                            >
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={getFilteredData(metrics?.iops)?.slice(-15)}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                        <XAxis
                                            dataKey="timestamp"
                                            tickFormatter={formatTime}
                                            stroke="#6b7280"
                                            style={{ fontSize: '12px' }}
                                        />
                                        <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                            }}
                                        />
                                        <Legend />
                                        <Bar dataKey="read" fill="#3b82f6" name="Read" />
                                        <Bar dataKey="write" fill="#10b981" name="Write" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </MetricCard>

                            {/* Top SQL */}
                            <MetricCard title="Top SQL by CPU" className="xl:col-span-2">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-200 dark:border-slate-700">
                                                <th className="text-left py-2 px-3 font-semibold text-gray-700 dark:text-gray-300">
                                                    SQL ID
                                                </th>
                                                <th className="text-left py-2 px-3 font-semibold text-gray-700 dark:text-gray-300">
                                                    SQL Text
                                                </th>
                                                <th className="text-right py-2 px-3 font-semibold text-gray-700 dark:text-gray-300">
                                                    Executions
                                                </th>
                                                <th className="text-right py-2 px-3 font-semibold text-gray-700 dark:text-gray-300">
                                                    CPU %
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {metrics?.topSQL.map((sql, index) => (
                                                <tr
                                                    key={sql.sqlId}
                                                    className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                                                    onClick={() => navigate(`/sql/${sql.sqlId}`)}
                                                >
                                                    <td className="py-3 px-3">
                                                        <code className="text-xs font-mono text-blue-600 dark:text-blue-400">
                                                            {sql.sqlId}
                                                        </code>
                                                    </td>
                                                    <td className="py-3 px-3">
                                                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-md">
                                                            {sql.sqlText}
                                                        </p>
                                                    </td>
                                                    <td className="py-3 px-3 text-right font-semibold text-gray-900 dark:text-white">
                                                        {sql.executions.toLocaleString()}
                                                    </td>
                                                    <td className="py-3 px-3 text-right">
                                                        <span
                                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${sql.cpuPercent > 20
                                                                ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                                                                : sql.cpuPercent > 10
                                                                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                                                                    : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                                                }`}
                                                        >
                                                            {sql.cpuPercent.toFixed(1)}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </MetricCard>

                            {/* Tablespace Usage */}
                            <MetricCard title="Tablespace Usage">
                                <div className="space-y-4">
                                    {metrics?.tablespaces.map((ts) => (
                                        <div key={ts.name}>
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center space-x-2">
                                                    <HardDrive className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        {ts.name}
                                                    </span>
                                                </div>
                                                <span
                                                    className={`text-sm font-bold ${ts.percentUsed > 90
                                                        ? 'text-red-600 dark:text-red-400'
                                                        : ts.percentUsed > 75
                                                            ? 'text-amber-600 dark:text-amber-400'
                                                            : 'text-green-600 dark:text-green-400'
                                                        }`}
                                                >
                                                    {ts.percentUsed.toFixed(1)}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5">
                                                <div
                                                    className={`h-2.5 rounded-full transition-all duration-300 ${ts.percentUsed > 90
                                                        ? 'bg-red-600'
                                                        : ts.percentUsed > 75
                                                            ? 'bg-amber-500'
                                                            : 'bg-green-500'
                                                        }`}
                                                    style={{ width: `${ts.percentUsed}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {ts.used.toFixed(1)} GB / {ts.total} GB
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </MetricCard>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
