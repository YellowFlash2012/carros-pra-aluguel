import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from "axios"

const initialState = {
    loading:false,
    cars: [],
    error:""
}

export const fetchAllCars = createAsyncThunk("cars/fetchAllCars", () => {
    return axios
        .get("http://localhost:8000/api/v1/cars")
        .then((res) => res.data.data.cars);
})

const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCars.pending, (state) => {
            state.loading= true;
        });
        
        builder.addCase(fetchAllCars.fulfilled, (state, action) => {
            state.loading = false;
            state.cars= action.payload;
            state.error= ""
        });

        builder.addCase(fetchAllCars.rejected, (state, action) => {
            state.loading = false;
            state.cars = [];
            state.error = action.error.message;
        })
    }
})

export default carsSlice.reducer