import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import dbReducer from './dbSlice';
import { oraViewApi } from '../services/api';

export const store = configureStore({
    reducer: {
        db: dbReducer,
        [oraViewApi.reducerPath]: oraViewApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(oraViewApi.middleware),
});

// Enable refetchOnFocus and refetchOnReconnect behaviors
setupListeners(store.dispatch);

export default store;
