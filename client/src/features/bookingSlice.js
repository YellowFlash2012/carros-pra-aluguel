import {
    createAsyncThunk,
    createSlice,
    
} from "@reduxjs/toolkit";

import { message } from "antd";

import axios from "axios";


const initialState = {
    loading: false,
    bookings: [],
    myBookings:[],
    error: false,
}; 

export const bookACar = createAsyncThunk("bookings/bookACar", async (reqObj, thunkAPI) => {
    console.log(thunkAPI);
    try {
        const res = await axios.post('/api/v1/bookings', reqObj, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
                },
            });

        return res.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
    
})

export const fetchAllBookings = createAsyncThunk("bookings/fetchAllBookings", async (data, thunkAPI) => {
    // console.log(thunkAPI);
    try {
        const res = await axios.get("/api/v1/bookings", {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
            },
        });

        console.log(res);
        return res.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
        
    }
        
});

export const fetchMyBookings = createAsyncThunk("bookings/fetchMyBookings", async (data, thunkAPI) => {
    // console.log(thunkAPI);
    try {
        const res = await axios.get("/api/v1/bookings/mybookings", {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
            },
        });

        console.log(res.data);

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
        // ***all bookings by admin
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
        
        // ***my bookings
        builder.addCase(fetchMyBookings.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchMyBookings.fulfilled, (state, action) => {
            state.loading = false;
            state.myBookings = action.payload;
        });

        builder.addCase(fetchMyBookings.rejected, (state, action) => {
            state.loading = false;

            state.error = true;

            message.error(action.error.message);
        });

        // ***book a car
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