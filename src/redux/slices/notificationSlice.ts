import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  message: string;
  sound: string; 
}

const initialState: NotificationState = {
  message: '',
  sound: '',
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationState>) => {
      state.message = action.payload.message;
      state.sound = action.payload.sound;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
