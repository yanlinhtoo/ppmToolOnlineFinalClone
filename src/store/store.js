import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from '../components/projects/projectsSlice';
import userReducer from '../components/user/userSlice'
import authReducer from '../components/auth/authSlice'
import projectTaskReducer from '../components/project-task/projectTaskSlice'

export const store = configureStore({
    reducer:{
        projects:projectsReducer,
        users:userReducer,
        auths:authReducer,
        projectTasks:projectTaskReducer,
    }
})