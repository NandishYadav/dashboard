import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, TrendingUp } from 'lucide-react';
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
import { useGetDetailedMetricQuery } from '../services/api';
import { selectCurrentDb } from '../store/dbSlice';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MetricDetail = () => {
    const { id: metricId } = useParams();
    const navigate = useNavigate();
    const currentDb = useSelector(selectCurrentDb);

    const { data: metricData, isLoading, error } = useGetDetailedMetricQuery(
        { metricId, dbId: currentDb?.id },
        { skip: !currentDb }
    );

    if (!currentDb) {
        navigate('/select-db');
        return null;
    }

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const renderChart = () => {
        if (!metricData) return null;

        switch (metricId) {
            case 'cpu':
                return (
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart data={metricData.data}>
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
                                label={{ value: 'CPU %', angle: -90, position: 'insideLeft' }}
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
                                strokeWidth={3}
                                dot={false}
                                name="Host CPU %"
                            />
                            <Line
                                type="monotone"
                                dataKey="database"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={false}
                                name="DB CPU %"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                );

            case 'sessions':
                return (
                    <ResponsiveContainer width="100%" height={500}>
                        <AreaChart data={metricData.data}>
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
                                label={{ value: 'Sessions', angle: -90, position: 'insideLeft' }}
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
                );

            case 'iops':
                return (
                    <ResponsiveContainer width="100%" height={500}>
                        <BarChart data={metricData.data.slice(-50)}>
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
                                label={{ value: 'IOPS', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                }}
                            />
                            <Legend />
                            <Bar dataKey="read" fill="#3b82f6" name="Read IOPS" />
                            <Bar dataKey="write" fill="#10b981" name="Write IOPS" />
                        </BarChart>
                    </ResponsiveContainer>
                );

            default:
                return <p>Unknown metric type</p>;
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header breadcrumbs={['Dashboard', currentDb.name, 'Metric Detail']} />

                <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-slate-900">
                    <div className="max-w-[1600px] mx-auto">
                        {/* Back Button */}
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Dashboard</span>
                        </button>

                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex items-center justify-center h-96">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                    <p className="text-gray-600 dark:text-gray-400">Loading metric data...</p>
                                </div>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                                <p className="text-red-800 dark:text-red-300">
                                    Failed to load metric details
                                </p>
                            </div>
                        )}

                        {/* Metric Content */}
                        {metricData && (
                            <div className="space-y-6">
                                {/* Header */}
                                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                                {metricData.title}
                                            </h1>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {metricData.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                                            <TrendingUp className="w-5 h-5" />
                                            <span className="text-sm font-semibold">Live Data</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Chart */}
                                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Time Series Chart
                                    </h2>
                                    {renderChart()}
                                </div>

                                {/* Data Table */}
                                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Raw Data (Last 10 Points)
                                    </h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-gray-200 dark:border-slate-700">
                                                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                                                        Timestamp
                                                    </th>
                                                    {Object.keys(metricData.data[0] || {})
                                                        .filter((key) => key !== 'timestamp')
                                                        .map((key) => (
                                                            <th
                                                                key={key}
                                                                className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300"
                                                            >
                                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                                            </th>
                                                        ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {metricData.data.slice(-10).reverse().map((row, index) => (
                                                    <tr
                                                        key={index}
                                                        className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                                                    >
                                                        <td className="py-3 px-4 text-gray-900 dark:text-white">
                                                            {new Date(row.timestamp).toLocaleString()}
                                                        </td>
                                                        {Object.entries(row)
                                                            .filter(([key]) => key !== 'timestamp')
                                                            .map(([key, value]) => (
                                                                <td
                                                                    key={key}
                                                                    className="py-3 px-4 text-right font-mono text-gray-900 dark:text-white"
                                                                >
                                                                    {typeof value === 'number' ? value.toFixed(2) : value}
                                                                </td>
                                                            ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MetricDetail;
