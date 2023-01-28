import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CREATE_USER = 'http://localhost:8484/api/user/create'

export const createUser = createAsyncThunk('users/createUser',async(user)=>{
    const response = await axios.post(CREATE_USER,user)
    return response.data
})

const initialState = {
    user:{},
    state:'',
    error:null
}
export const userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(createUser.fulfilled,(state,action)=>{
                console.log(action.payload)
                const user = action.payload
                state.user = user
            })
    }
})

export default userSlice.reducer