import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

import {message} from "antd"

import axios from "axios";

const initialState = {
    loading: false,
    user: {},
    error: "",
};


export const userLogin = createAsyncThunk("user/userLogin", (reqObj) => {
    axios.post("http://localhost:8000/api/v1/users/login", reqObj).then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));

        message.success("Login was successful")
        setTimeout(() => {
            const user = JSON.parse(localStorage.getItem("user"));
            
            if (user.data.isAdmin) {
                window.location.href = "/admin";
            } else {
                window.location.href="/"
                
            }
        }, 3000);

    }).catch((error) => {
        isRejectedWithValue("Invalid Credentials")

        message.error("Invalid credentials");
    });
})

export const userRegister = createAsyncThunk("user/userRegister", (reqObj) => {
    axios.post("http://localhost:8000/api/v1/users/register", reqObj).then((res) => {
        
        message.success("User successfully registered!");
        
        setTimeout(() => {
            
            window.location.href = "/login";
        }, 5000);

    }).catch((error) => {
        isRejectedWithValue("Something went wrong!");

        message.error("Something went wrong. Kindly try again");
    });
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{},

    extraReducers: builder => {
        builder.addCase(userLogin.pending, state => {
            state.loading = true;
        });

        builder.addCase(userLogin.fulfilled, state => {
            state.loading = false;
            state.error = "";
        });

        builder.addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(userRegister.pending, state => {
            state.loading = true;
        });

        builder.addCase(userRegister.fulfilled, (state) => {
            state.loading = false;
            state.error = "";
        });

        builder.addCase(userRegister.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export default authSlice.reducer;