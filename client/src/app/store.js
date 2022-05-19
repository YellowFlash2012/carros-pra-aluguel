import { configureStore } from '@reduxjs/toolkit';
import carsReducer from '../features/carsSlice';

export const store = configureStore({
  reducer: {
    cars:carsReducer
  },
});
