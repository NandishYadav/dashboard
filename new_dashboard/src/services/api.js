import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create the API service using fetchBaseQuery for JSON Server
export const oraViewApi = createApi({
    reducerPath: 'oraViewApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    tagTypes: ['Databases', 'Dashboard', 'Metric'],
    endpoints: (builder) => ({
        // Get all databases in the fleet
        getDatabases: builder.query({
            query: () => 'databases',
            providesTags: ['Databases'],
        }),

        // Get dashboard metrics for a specific database
        getDashboardMetrics: builder.query({
            query: (dbId) => `dashboard/${dbId}`,
            providesTags: (result, error, dbId) => [{ type: 'Dashboard', id: dbId }],
            // Auto-poll every 15 seconds for live monitoring
            pollingInterval: 15000,
        }),

        // Get detailed metric data for drill-down
        getDetailedMetric: builder.query({
            query: ({ metricId, dbId }) => `metrics/${metricId}-${dbId}`,
            providesTags: (result, error, { metricId, dbId }) => [
                { type: 'Metric', id: `${metricId}-${dbId}` },
            ],
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetDatabasesQuery,
    useGetDashboardMetricsQuery,
    useGetDetailedMetricQuery,
} = oraViewApi;
