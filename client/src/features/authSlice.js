import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {message} from "antd"

import axios from "axios";


const initialState = {
    loading: false,
    user: JSON.parse(localStorage.getItem("user")),
    error: false,
    users:[]
};


export const userLogin = createAsyncThunk("auth/userLogin", async (reqObj, thunkAPI) => {
    console.log(thunkAPI);
    try {
        const res = await axios.post(`/api/v1/users/login`, reqObj)
        
        return res.data

    } catch (error) {
        console.log(error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
        
    }
    
})

export const userRegister = createAsyncThunk("auth/userRegister", async (reqObj, thunkAPI) => {
    try {
        const res = await axios.post(`/api/v1/users/register`, reqObj)
        
        return res.data;
        
    } catch (error) {
        
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
        
})

export const getAllUsers = createAsyncThunk(
    "auth/getAllUsers",
    async (data, thunkAPI) => {
        console.log(thunkAPI.getState());
        try {
            const res = await axios.get("/api/v1/users/", {
                headers: {
                    authorization: `Bearer ${
                        thunkAPI.getState().auth.user.token
                    }`,
                },
            });
            console.log(thunkAPI, thunkAPI.getState());
            console.log(res.data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, { payload }) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },

    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            console.log(payload);
            const user = payload;
            state.loading = false;
            state.user = user;

            localStorage.setItem("user", JSON.stringify(user));
            message.success(`Welcome back, ${user.data.username}`);

            setTimeout(() => {
                if (user.data.isAdmin) {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/";
                }
            }, 3000);
        });

        builder.addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = true;

            
            message.error(action.payload);
        });

        // ***signup
        builder.addCase(userRegister.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(userRegister.fulfilled, (state, { payload }) => {
            const user = payload;
            state.loading = false;
            state.user = user;

            localStorage.setItem("user", JSON.stringify(user));
            message.success(`Welcome aboard, ${user.data.name}`);
        });

        builder.addCase(userRegister.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            message.error(action.error.message);
        });
        
        // ***get all users by admin
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
            
            state.loading = false;
            state.users = payload;

        });

        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            message.error(action.error.message);
        });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;