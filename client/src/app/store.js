import { configureStore } from '@reduxjs/toolkit';
import carsReducer from '../features/carsSlice';
import authReducer from "../features/authSlice"
import bookingsReducer from "../features/bookingSlice"


export const store = configureStore({
  reducer: {
    cars: carsReducer,
    auth: authReducer,
    bookings: bookingsReducer
  },
});
