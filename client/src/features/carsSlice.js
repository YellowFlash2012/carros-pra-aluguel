import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import { message } from "antd";

import axios from "axios"
import API from "../utils";

const initialState = {
    loading:false,
    cars: [],
    error:""
}

export const fetchAllCars = createAsyncThunk("cars/fetchAllCars", () => {
    return axios.get(`${API}/api/v1/cars`).then((res) => res.data.data.cars);
})

export const addNewCarAction = createAsyncThunk("cars/addNewCarAction", (reqObj) => {
    return axios
        .post(`${API}/api/v1/cars`, reqObj)
        .then((res) => {
            message.success("New car added successfully!");

            setTimeout(() => {
                window.location.href = "/admin";
            }, 3000);
        })
        .catch((error) => {
            isRejectedWithValue(
                "An error occured and this car could NOT be added right now!"
            );

            message.error(
                "An error occured and this car could NOT be added right now!"
            );
        });
});

export const editCarAction = createAsyncThunk("cars/editCarAction", (reqObj) => {
    return axios
        .put(`${API}/api/v1/cars/:id`, reqObj)
        .then((res) => {
            message.success("This car is updated!");

            setTimeout(() => {
                window.location.href = "/admin";
            }, 3000);
        })
        .catch((error) => {
            isRejectedWithValue(
                "An error occured and this car could NOT be edited right now!"
            );

            message.error(
                "An error occured and this car could NOT be edited right now!"
            );
        });
});

export const deleteCarAction = createAsyncThunk("cars/deleteCarAction", (reqObj) => {
    return axios
        .delete(`${API}/api/v1/cars/:id`, reqObj)
        .then((res) => {
            message.success("Car deleted successfully!");

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        })
        .catch((error) => {
            isRejectedWithValue(
                "An error occured and this car could NOT be deleted right now!"
            );

            message.error(
                "An error occured and this car could NOT be deleted right now!"
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