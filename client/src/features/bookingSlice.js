import {
    createAsyncThunk,
    createSlice,
    isRejectedWithValue,
} from "@reduxjs/toolkit";

import { message } from "antd";

import axios from "axios";
import API from "../utils";

const initialState = {
    loading: false,
    bookings: [],
    error: "",
}; 

export const bookACar = createAsyncThunk("booking/bookACar",(reqObj) => {
    axios.post(`${API}/api/v1/bookings`, reqObj).then((res) => {
        message.success("Booking was successful!");

        setTimeout(() => {
            window.location.href=("/my-bookings")
        }, 5000);
    }).catch((error) => {
        isRejectedWithValue("Invalid Credentials");
        message.error("Something went wrong, please try again!")
    });
})

export const fetchAllBookings = createAsyncThunk("bookings/fetchAllBookings", () => {
    return axios
        .get(`${API}/api/v1/bookings`)
        .then(
            (res) =>
                // console.log(res.data);
                res.data
        )
        .catch((error) => {
            isRejectedWithValue("Fetch Unsuccessful");
            message.error("Something went wrong, please try again!");
        });
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
            state.error = "";
        });

        builder.addCase(fetchAllBookings.rejected, (state, action) => {
            state.loading = false;
            state.bookings = [];
            state.error = action.error.message;
        });
    },
});

export default bookingSlice.reducer;