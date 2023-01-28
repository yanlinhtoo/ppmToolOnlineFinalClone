import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const FETCH_TASK = 'http://localhost:8484/api/task/all/'
const CREATE_TASK = 'http://localhost:8484/api/task/create/'
const UPDATE_TASK = 'http://localhost:8484/api/task/update/'

export const fetchProjectTasks = createAsyncThunk('projectTasks/fetchProjectTasks',async(data)=>{
    console.log(data)
    const response = await axios.get(`${FETCH_TASK}${data.projectId}`,{
        headers:{
            'Authorization':data.token
        }
    })
    return response.data
})

export const createProjectTask = createAsyncThunk('projectTasks/createProjectTask',async(data)=>{
    console.log(data)
    const response = await axios.post(`${CREATE_TASK}${data.projectId}`,data.projectTasks,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':data.token
        }
    })
    return response.data
})

export const updateProjectTask = createAsyncThunk('projectTasks/updateProjectTask',async(data)=>{
    console.log(data)
    const response = await axios.patch(`${UPDATE_TASK}${data.projectId}/${data.projectTasks}`,data.projectTasks,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':data.token
        }
    })
    return response.data
})


const initialState = {
    projectTasks:[],
    status:'idle',
    error:null
}

export const projectTaskSlice = createSlice({
    name: 'projectTaskSlice',
    initialState,
    reducers:{
        resetStatus:state => {state.status = 'idle'},
    },
    extraReducers(builder){
        builder
            .addCase(fetchProjectTasks.pending,(state,action)=>{
                state.status = 'loading'
            })
            .addCase(fetchProjectTasks.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.projectTasks = action.payload
            })
            .addCase(fetchProjectTasks.rejected,(state,action)=>{
                state.state = 'failed'
                state.error = action.error.message
            })
            .addCase(createProjectTask.fulfilled,(state,action)=>{
                console.log(action.payload)
                state.projectTasks.push(action.payload)
            })
            .addCase(updateProjectTask.fulfilled,(state,action)=>{
                console.log(action.payload)
                const projectTask = action.payload
                const projectTasks = state.projectTasks.filter(pt => pt.projectSequence !== projectTask.projectSequence)
                state.projectTasks = [projectTask,...projectTasks] 
            })
    }
})

export const selectTasksByStatus = (state,status)=> {
    const projectTasks = state.projectTasks.projectTasks
    return projectTasks.filter(pt => pt.status === String(status)) 

}

export const getStatus = state => state.projectTasks.status
export const getError = state => state.projectTasks.error

export const selectPTBySequence = (state,sequence) => {
    const projectTasks =  state.projectTasks.projectTasks
    return projectTasks.find(pt => pt.projectSequence === sequence)
}
export const { resetStatus } = projectTaskSlice.actions
export default projectTaskSlice.reducer

