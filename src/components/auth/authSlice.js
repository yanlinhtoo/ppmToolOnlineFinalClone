import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const LOGIN_URL = 'http://localhost:8484/api/user/login'

export const login = createAsyncThunk('auth/login',async(loginRequest)=>{
    const response = await axios.post(LOGIN_URL,loginRequest)
    return response.data
})

const initialState ={
    user:{},
    success:false,
    token:''
}

export const authSlice = createSlice({
    name:'authSlice',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(login.fulfilled,(state,action)=>{
                console.log(action.payload)
                const loginResponse = action.payload
                state.success = loginResponse.success
                state.token = loginResponse.token
            })
    }
})

export const getToken = state => state.auths.token
export default authSlice.reducer