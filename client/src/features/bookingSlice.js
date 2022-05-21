import {
    createAsyncThunk,
    createSlice,
    isRejectedWithValue,
} from "@reduxjs/toolkit";

import { message } from "antd";

import axios from "axios";

const initialState = {
    loading: false,

    error: "",
};

export const bookACar = createAsyncThunk("booking/bookACar",(reqObj) => {
    axios.post("http://localhost:8000/api/v1/bookings", reqObj).then((res) => {
        message.success("Booking was successful! Thank you for choosing us!")
    }).catch((error) => {
        isRejectedWithValue("Invalid Credentials");
        message.error("Something went wrong, please try again!")
    });
})