import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedDb: 'ORCL_PROD',
    timeRange: '5h',
    autoRefresh: '30s',
    activeSection: 'overview',
    selectedIncident: null,
    isLoading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setSelectedDb: (state, action) => {
            state.selectedDb = action.payload;
        },
        setTimeRange: (state, action) => {
            state.timeRange = action.payload;
        },
        setAutoRefresh: (state, action) => {
            state.autoRefresh = action.payload;
        },
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        },
        setSelectedIncident: (state, action) => {
            state.selectedIncident = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    setSelectedDb,
    setTimeRange,
    setAutoRefresh,
    setActiveSection,
    setSelectedIncident,
    setLoading,
    setError,
    clearError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
