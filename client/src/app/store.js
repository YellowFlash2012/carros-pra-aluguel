import { configureStore } from '@reduxjs/toolkit';
import carsReducer from '../features/carsSlice';
import authReducer from "../features/authSlice"

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    auth:authReducer
  },
});
