import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addNewProject,selectProjectById,updateProject } from "./projectsSlice";
import { useParams,useNavigate} from "react-router-dom";
import {getToken} from '../auth/authSlice'

function AddProjectForm(props){

    const{ projectId } = useParams()
    const project = useSelector((state) => selectProjectById(state,String(projectId)))
    const navigate = useNavigate()
    const token = useSelector(getToken)

    const [projectName,setProjectName] = useState(project?.projectName)
    const [projectIdentifier,setProjectIdentifier] = useState(project?.projectIdentifier)
    const [description,setDescription] = useState(project?.description)
    const [startDate,setStartDate] = useState(project?.startDate)
    const [endDate,setEndDate] = useState(project?.endDate)
    const [addRequestStatus,setAddRequestStatus] = useState('idle')
    
    const onProjectNameInputChange = e => setProjectName(e.target.value)
    const onProjectIdentifierInputChange = e => setProjectIdentifier(e.target.value)
    const onDescriptionInputChange = e => setDescription(e.target.value)
    const onStartDateInputChange = e => setStartDate(e.target.value)
    const onEndDateInputChange = e => setEndDate(e.target.value)

    const dispatch = useDispatch();

    const canSave = [projectName,projectIdentifier,description,startDate,endDate].every(Boolean) && addRequestStatus === 'idle'
    const isEdit = props.mode === 'edit'

    const onProjectSubmit = e =>{
        e.preventDefault()
        if(canSave && token){
            setAddRequestStatus('pending')
        try{
            dispatch(
                isEdit?
                updateProject({
                    project:{
                        projectName,
                        projectIdentifier,
                        description,
                        startDate,
                        endDate
                    },
                    token
                }):
                addNewProject({
                    project:{
                        projectName,
                        projectIdentifier,
                        description,
                        startDate,
                        endDate
                    },token
        })).unwrap()
        navigate('/dashboard')

    }catch(error){
        console.log(error)
    }finally{
        setAddRequestStatus('idle')
        setProjectName('')
        setProjectIdentifier('')
        setDescription('')
        setStartDate('')
        setEndDate('')
    }
}
}

    return (
        <div className="project">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Create / Edit Project form</h5>
                    <hr />
                    <form onSubmit={onProjectSubmit}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control form-control-lg " 
                                placeholder="Project Name" 
                                value={projectName}
                                onChange={onProjectNameInputChange}
                                />
                        </div>
                        <div className="form-group">
                            <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Unique Project ID"
                            value={projectIdentifier}
                            onChange={onProjectIdentifierInputChange}
                            disabled={isEdit}
                             />
                        </div>
                        
                        <div className="form-group">
                            <textarea 
                            className="form-control form-control-lg" 
                            placeholder="Project Description" 
                            value={description}
                            onChange={onDescriptionInputChange}
                            />
                        </div>
                        <h6>Start Date</h6>
                        <div className="form-group">
                            <input 
                            type="date" 
                            className="form-control form-control-lg" 
                            value={startDate}
                            onChange={onStartDateInputChange}
                            />
                        </div>
                        <h6>Estimated End Date</h6>
                        <div className="form-group">
                            <input 
                            type="date" 
                            className="form-control form-control-lg" 
                            value={endDate}
                            onChange={onEndDateInputChange}
                            />
                        </div>

                        <input 
                            type="submit" 
                            className="btn btn-primary btn-block mt-4" 
                            value={isEdit?'Update':"no"}
                            disabled={!canSave}    
                            />
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}
export default AddProjectForm;