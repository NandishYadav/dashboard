import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchIncidents,
    fetchCPUMetrics,
    fetchStorageHealth,
    fetchBlockingSessions,
} from '@/store/dataSlice';

/**
 * Custom hook to fetch and manage database data
 * Automatically fetches data when database or time range changes
 */
export function useDatabaseData() {
    const dispatch = useDispatch();

    // Get dashboard state
    const { selectedDb, timeRange } = useSelector((state) => state.dashboard);

    // Get data state
    const {
        incidents,
        sessionCPU,
        sqlQueryCPU,
        blockingNodes,
        tablespaces,
        waitClassData,
        loading,
        errors,
    } = useSelector((state) => state.data);

    // Fetch incidents when database changes
    useEffect(() => {
        if (selectedDb) {
            dispatch(fetchIncidents(selectedDb));
        }
    }, [selectedDb, dispatch]);

    // Fetch CPU metrics when database or time range changes
    useEffect(() => {
        if (selectedDb && timeRange) {
            dispatch(fetchCPUMetrics({ dbName: selectedDb, timeRange }));
        }
    }, [selectedDb, timeRange, dispatch]);

    // Fetch storage health when database changes
    useEffect(() => {
        if (selectedDb) {
            dispatch(fetchStorageHealth(selectedDb));
        }
    }, [selectedDb, dispatch]);

    // Fetch blocking sessions when database changes
    useEffect(() => {
        if (selectedDb) {
            dispatch(fetchBlockingSessions(selectedDb));
        }
    }, [selectedDb, dispatch]);

    return {
        incidents,
        sessionCPU,
        sqlQueryCPU,
        blockingNodes,
        tablespaces,
        waitClassData,
        loading,
        errors,
    };
}

/**
 * Custom hook to manage auto-refresh functionality
 */
export function useAutoRefresh(callback, interval) {
    const { autoRefresh } = useSelector((state) => state.dashboard);

    useEffect(() => {
        if (autoRefresh === 'off') {
            return;
        }

        const intervalMs = {
            '10s': 10000,
            '30s': 30000,
            '1m': 60000,
        }[autoRefresh] || 30000;

        const timer = setInterval(callback, intervalMs);

        return () => clearInterval(timer);
    }, [autoRefresh, callback]);
}
