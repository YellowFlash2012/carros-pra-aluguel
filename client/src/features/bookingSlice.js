import {
    createAsyncThunk,
    createSlice,
    
} from "@reduxjs/toolkit";

import { message } from "antd";

import axios from "axios";


const initialState = {
    loading: false,
    bookings: [],
    error: false,
}; 

export const bookACar = createAsyncThunk("booking/bookACar", async (reqObj, thunkAPI) => {
    try {
        const res = await axios.post('/api/v1/bookings', reqObj);

        return res.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
    
})

export const fetchAllBookings = createAsyncThunk("bookings/fetchAllBookings", async (thunkAPI) => {
    try {
        const res = await axios.get('/api/v1/bookings');

        return res.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
        
    }
        
});

const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllBookings.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchAllBookings.fulfilled, (state, action) => {
            state.loading = false;
            state.bookings = action.payload;
            
        });

        builder.addCase(fetchAllBookings.rejected, (state, action) => {
            state.loading = false;
            
            state.error = true;

            message.error(action.error.message);
        });

        builder.addCase(bookACar.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(bookACar.fulfilled, (state, action) => {
            state.loading = false;
            state.bookings = action.payload;

            message.success("Booking was successful!");

            setTimeout(() => {
                window.location.href = "/my-bookings";
            }, 5000);
        });

        builder.addCase(bookACar.rejected, (state, action) => {
            state.loading = false;

            state.error = true;

            message.error(action.error.message);
        });
    },
});

export default bookingSlice.reducer;