import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import dataReducer from './dataSlice';

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        data: dataReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types if needed
                ignoredActions: ['your/action/type'],
            },
        }),
});

export default store;
