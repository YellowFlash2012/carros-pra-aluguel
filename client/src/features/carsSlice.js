import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import { message } from "antd";

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

export const addNewCarAction = createAsyncThunk("cars/addNewCarAction", (reqObj) => {
    return axios.post("http://localhost:8000/api/v1/cars", reqObj).then((res) => {
        message.success("New car added successfully!");

        setTimeout(() => {
            window.location.href = "/";
        }, 3000);
    }).catch((error) => {
        isRejectedWithValue("An error occured and your car could NOT be added right now!");

        message.error(
            "An error occured and your car could NOT be added right now!"
        );
    });
});

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
        });

        builder.addCase(addNewCarAction.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(addNewCarAction.fulfilled, (state) => {
            state.loading = false;
        });

        builder.addCase(addNewCarAction.rejected, (state,action) => {
            state.loading = false;
            state.error=action.error.message
        })
    }
})

export default carsSlice.reducer