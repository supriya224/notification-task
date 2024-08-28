import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './slices/notificationSlice';

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
