import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Authentication
    isAuthenticated: false,
    token: null,
    user: null,

    // Current Database Selection
    currentDb: null,

    // Theme
    theme: 'light', // 'light' or 'dark'

    // URL State
    timeRange: '30m',

    // UI State
    sidebarCollapsed: false,
};

const dbSlice = createSlice({
    name: 'db',
    initialState,
    reducers: {
        // Authentication actions
        login: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.currentDb = null;
        },

        // Database selection
        setCurrentDb: (state, action) => {
            state.currentDb = action.payload;
        },
        clearCurrentDb: (state) => {
            state.currentDb = null;
        },

        // Time Range
        setTimeRange: (state, action) => {
            state.timeRange = action.payload;
        },

        // Theme toggle
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },

        // Sidebar toggle
        toggleSidebar: (state) => {
            state.sidebarCollapsed = !state.sidebarCollapsed;
        },
        setSidebarCollapsed: (state, action) => {
            state.sidebarCollapsed = action.payload;
        },
    },
});

// Export actions
export const {
    login,
    logout,
    setCurrentDb,
    clearCurrentDb,
    toggleTheme,
    setTheme,
    toggleSidebar,
    setSidebarCollapsed,
    setTimeRange,
} = dbSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => state.db.isAuthenticated;
export const selectCurrentDb = (state) => state.db.currentDb;
export const selectTheme = (state) => state.db.theme;
export const selectSidebarCollapsed = (state) => state.db.sidebarCollapsed;
export const selectUser = (state) => state.db.user;
export const selectTimeRange = (state) => state.db.timeRange;

export default dbSlice.reducer;
