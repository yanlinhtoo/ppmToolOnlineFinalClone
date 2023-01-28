import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const GET_ALL_PROJECTS = 'http://localhost:8484/api/project/all'
const POST_NEW_PROJECT = 'http://localhost:8484/api/project/create'
const DELETE_PROJECT = 'http://localhost:8484/api/project/identifier/'

export const fetchProjects = createAsyncThunk('projects/fetchProjects',async(token)=>{
    const response = await axios.get(GET_ALL_PROJECTS,{
        headers:{
           'Authorization':token,
        }
    })
    return response.data
})

export const addNewProject = createAsyncThunk('projects/addNewProject',async(data)=>{
    
    const response = await axios.post(POST_NEW_PROJECT,data.project,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':data.token
        }     
    })
    return response.data
})

export const updateProject = createAsyncThunk('projects/updateProject',async(data)=>{
    
    const response = await axios.post(POST_NEW_PROJECT,data.project,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':data.token
        }
    })
    return response.data
})

export const deleteProject = createAsyncThunk('projects/deleteProject',async(data)=>{
    
    const response = await axios.delete(`${DELETE_PROJECT}${data.projectId}`,{
        headers:{
            'Authorization':data.token
        }
    })
    return response.data
})

const initialState = {  
    projects:[],
    status:'idle',
    error:null
}   

export const projectsSlice = createSlice({
    name:'projectsSlice',
    initialState,
    reducers:{
        addProject:{ 
                reducer(state,action){
                state.push(action.payload)
                },
                prepare(projectName,projectIdentifier,description,startDate,endDate){
                    return {
                        payload:{
                            projectName,
                            projectIdentifier,
                            description,
                            startDate,
                            endDate
                        }
                    }
                }
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchProjects.pending,(state,action)=>{
                state.status = 'loading'
            })
            .addCase(fetchProjects.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.projects = action.payload
            })
            .addCase(fetchProjects.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewProject.fulfilled,(state,action)=>{
                state.projects.push(action.payload)
            })
            .addCase(updateProject.fulfilled,(state,action)=>{
                const project = action.payload
                const projects = state.projects.filter(p => p.projectIdentifier !== project.projectIdentifier)
                state.projects = [project,...projects]
            })
            .addCase(deleteProject.fulfilled,(state,action)=>{
                const projectId = action.payload
                const projects = state.projects.filter(p => p.projectIdentifier !== String(projectId))
                state.projects = projects
            })
    }
})

export const selectAllProjects = state => state.projects.projects
export const getProjectStatus = state => state.projects.status
export const getProjectError = state => state.projects.error
export const selectProjectById  = (state,projectId) => state.projects.projects.find(project => project.projectIdentifier === projectId)
export const {addProject} = projectsSlice.actions
export default projectsSlice.reducer

