import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { message } from "antd";

import axios from "axios"


const initialState = {
    loading:false,
    cars: [],
    error:false
}

export const fetchAllCars = createAsyncThunk("cars/fetchAllCars", async (thunkAPI) => {
    try {
        const res = await axios.get('/api/v1/cars');

        // console.log(res);
        return res.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const addNewCarAction = createAsyncThunk("cars/addNewCarAction", async (reqObj, thunkAPI) => {
    try {
        const res = await axios.post("/api/v1/cars", reqObj, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.data.token}`,
            },
        });
        
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }

});

export const editCarAction = createAsyncThunk("cars/editCarAction", async (reqObj, thunkAPI) => {
    try {
        const res = await axios.put('/api/v1/cars/:id', reqObj, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.data.token}`,
            },
        });

        return res.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
        
});

export const deleteCarAction = createAsyncThunk("cars/deleteCarAction", async (reqObj, thunkAPI) => {

    try {
        const res = await axios.delete('/api/v1/cars/:id', reqObj, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.data.token}`,
            },
        });

        return res.data
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
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
            
            // console.log(action.payload.data.cars);
            state.loading = false;
            state.cars = action.payload?.data.cars;
            
        });

        builder.addCase(fetchAllCars.rejected, (state, action) => {
            state.loading = false;
            
            state.error = true;
            message.error(action.error.message);
        });

        // ***add a new car by admin

        builder.addCase(addNewCarAction.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(addNewCarAction.fulfilled, (state,action) => {
            state.loading = false;

            message.success(action.payload.message);

            setTimeout(() => {
                window.location.href = "/admin";
            }, 3000);
        });

        builder.addCase(addNewCarAction.rejected, (state,action) => {
            state.loading = false;
            state.error = true;

            message.error(action.error.message);
        })
        
        // ***edit a car by admin
        builder.addCase(editCarAction.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(editCarAction.fulfilled, (state, action) => {
            state.loading = false;

            message.success(action.payload);

            setTimeout(() => {
                window.location.href = "/admin";
            }, 3000);
        });

        builder.addCase(editCarAction.rejected, (state, action) => {
            state.loading = false;
            state.error = true;

            message.error(action.error.message);
        });
        
        // ***delete a car by admin
        builder.addCase(deleteCarAction.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(deleteCarAction.fulfilled, (state, action) => {
            state.loading = false;

            message.success(action.payload);

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        });

        builder.addCase(deleteCarAction.rejected, (state, action) => {
            state.loading = false;
            state.error = true;

            message.error(action.error.message);
        });


    }
})

export default carsSlice.reducer