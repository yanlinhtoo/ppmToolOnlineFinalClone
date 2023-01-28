import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import ProjectItem from "./ProjectItem"
import { selectAllProjects,getProjectError,getProjectStatus,fetchProjects } from "./projectsSlice"
import { getToken } from "../auth/authSlice"

function ProjectsList(){
    const projects = useSelector(selectAllProjects)
    const projectStatus = useSelector(getProjectStatus)
    const error = useSelector(getProjectError)
    
    const dispatch = useDispatch();
    const token = useSelector(getToken)

    useEffect(()=>{
        if(projectStatus === 'idle'){
            if(token){
                dispatch(fetchProjects(token))
            }else{
                console.log('Invalid Token')
            }
        }
    },[projectStatus,dispatch,token])

    let content;

    if(projectStatus === 'loading'){
        content = (<p>Loading....</p>)
    }

    if(projectStatus === 'succeeded'){
        content = projects.map(project => <ProjectItem 
            key = {project.projectIdentifier} 
            projectName={project.projectName}
            projectIdentifier={project.projectIdentifier}
            description={project.description}
            startDate={project.startDate}
            endDate={project.endDate}
        />
        )
    }

    if(projectStatus === 'failed'){
        content = (<p>{error}</p>)
    }

    return content
}
export default ProjectsList 