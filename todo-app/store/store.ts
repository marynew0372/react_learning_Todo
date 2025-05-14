import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import pageReducer from './pageSlice';
import limitReducer from './limitSlice';

export const store = configureStore ({
    reducer: {
        tasks: tasksReducer,
        page: pageReducer,
        limit: limitReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;