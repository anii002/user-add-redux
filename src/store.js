import { configureStore } from '@reduxjs/toolkit';
import { registerSlice } from './Reducer/Index';

const store = configureStore({
  reducer: {
    user: registerSlice.reducer,
  },
});

export default store;
