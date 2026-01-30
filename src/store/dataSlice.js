import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { databaseAPI } from '@/api/database';

// Async thunks for API calls
export const fetchIncidents = createAsyncThunk(
    'data/fetchIncidents',
    async (dbName, { rejectWithValue }) => {
        try {
            const data = await databaseAPI.getIncidents(dbName);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCPUMetrics = createAsyncThunk(
    'data/fetchCPUMetrics',
    async ({ dbName, timeRange }, { rejectWithValue }) => {
        try {
            const data = await databaseAPI.getCPUMetrics(dbName, timeRange);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchStorageHealth = createAsyncThunk(
    'data/fetchStorageHealth',
    async (dbName, { rejectWithValue }) => {
        try {
            const data = await databaseAPI.getStorageHealth(dbName);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchBlockingSessions = createAsyncThunk(
    'data/fetchBlockingSessions',
    async (dbName, { rejectWithValue }) => {
        try {
            const data = await databaseAPI.getBlockingSessions(dbName);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    incidents: [],
    sessionCPU: [],
    sqlQueryCPU: [],
    blockingNodes: [],
    tablespaces: [],
    waitClassData: [],
    loading: {
        incidents: false,
        cpuMetrics: false,
        storage: false,
        blocking: false,
    },
    errors: {
        incidents: null,
        cpuMetrics: null,
        storage: null,
        blocking: null,
    },
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = {
                incidents: null,
                cpuMetrics: null,
                storage: null,
                blocking: null,
            };
        },
    },
    extraReducers: (builder) => {
        // Incidents
        builder
            .addCase(fetchIncidents.pending, (state) => {
                state.loading.incidents = true;
                state.errors.incidents = null;
            })
            .addCase(fetchIncidents.fulfilled, (state, action) => {
                state.loading.incidents = false;
                state.incidents = action.payload;
            })
            .addCase(fetchIncidents.rejected, (state, action) => {
                state.loading.incidents = false;
                state.errors.incidents = action.payload;
            });

        // CPU Metrics
        builder
            .addCase(fetchCPUMetrics.pending, (state) => {
                state.loading.cpuMetrics = true;
                state.errors.cpuMetrics = null;
            })
            .addCase(fetchCPUMetrics.fulfilled, (state, action) => {
                state.loading.cpuMetrics = false;
                state.sessionCPU = action.payload.sessionCPU;
                state.sqlQueryCPU = action.payload.sqlQueryCPU;
            })
            .addCase(fetchCPUMetrics.rejected, (state, action) => {
                state.loading.cpuMetrics = false;
                state.errors.cpuMetrics = action.payload;
            });

        // Storage Health
        builder
            .addCase(fetchStorageHealth.pending, (state) => {
                state.loading.storage = true;
                state.errors.storage = null;
            })
            .addCase(fetchStorageHealth.fulfilled, (state, action) => {
                state.loading.storage = false;
                state.tablespaces = action.payload.tablespaces;
                state.waitClassData = action.payload.waitClassData;
            })
            .addCase(fetchStorageHealth.rejected, (state, action) => {
                state.loading.storage = false;
                state.errors.storage = action.payload;
            });

        // Blocking Sessions
        builder
            .addCase(fetchBlockingSessions.pending, (state) => {
                state.loading.blocking = true;
                state.errors.blocking = null;
            })
            .addCase(fetchBlockingSessions.fulfilled, (state, action) => {
                state.loading.blocking = false;
                state.blockingNodes = action.payload;
            })
            .addCase(fetchBlockingSessions.rejected, (state, action) => {
                state.loading.blocking = false;
                state.errors.blocking = action.payload;
            });
    },
});

export const { clearErrors } = dataSlice.actions;

export default dataSlice.reducer;
