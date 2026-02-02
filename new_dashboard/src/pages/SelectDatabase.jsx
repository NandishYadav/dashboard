import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Server, Activity } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useGetDatabasesQuery } from '../services/api';
import { setCurrentDb } from '../store/dbSlice';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const SelectDatabase = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: databases, isLoading, error } = useGetDatabasesQuery();

    const handleSelectDb = (db) => {
        dispatch(setCurrentDb(db));
        navigate('/dashboard');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'healthy':
                return 'status-healthy';
            case 'warning':
                return 'status-warning';
            case 'critical':
                return 'status-critical';
            default:
                return 'bg-gray-500';
        }
    };

    const getStatusText = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header breadcrumbs={['Database Fleet']} />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Page Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Database Fleet
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Select a database to monitor and analyze
                            </p>
                        </div>

                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex items-center justify-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                <p className="text-red-800 dark:text-red-300">
                                    Failed to load databases. Please try again.
                                </p>
                            </div>
                        )}

                        {/* Database Grid */}
                        {databases && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {databases.map((db) => (
                                    <div
                                        key={db.id}
                                        onClick={() => handleSelectDb(db)}
                                        className="metric-card cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                    <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                        {db.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {db.environment}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`status-dot ${getStatusColor(db.status)}`}></div>
                                        </div>

                                        {/* Info Grid */}
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                    Version
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {db.version}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                    IP Address
                                                </p>
                                                <p className="text-sm font-mono text-gray-900 dark:text-white">
                                                    {db.ip}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                    Region
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {db.region}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                    Status
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {getStatusText(db.status)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* CPU Sparkline */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                                    <Activity className="w-3 h-3 mr-1" />
                                                    CPU Load (15min)
                                                </p>
                                                <p className="text-xs font-semibold text-gray-900 dark:text-white">
                                                    {db.cpuSparkline[db.cpuSparkline.length - 1]?.value.toFixed(1)}%
                                                </p>
                                            </div>
                                            <ResponsiveContainer width="100%" height={40}>
                                                <LineChart data={db.cpuSparkline}>
                                                    <Line
                                                        type="monotone"
                                                        dataKey="value"
                                                        stroke="#3b82f6"
                                                        strokeWidth={2}
                                                        dot={false}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SelectDatabase;
