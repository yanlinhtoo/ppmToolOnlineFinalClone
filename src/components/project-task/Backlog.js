import { useDispatch,useSelector } from 'react-redux'
import { fetchProjectTasks,selectTasksByStatus,getStatus,getError } from './projectTaskSlice'
import { useEffect } from 'react'
import { getToken } from '../auth/authSlice'  
import { useParams } from 'react-router-dom'
import TodoList from './TodoList'
import InProgressList from './InProgressList'
import DoneList from './DoneList'


function Backlog(){
    const { projectId } = useParams()
    const todoProjectTasks = useSelector(state=>selectTasksByStatus(state,'TODO'))
    const inProgressProjectTasks = useSelector(state=>selectTasksByStatus(state,'IN_PROGRESS'))
    const doneProjectTasks = useSelector(state=>selectTasksByStatus(state,'DONE'))

    console.log(todoProjectTasks)
    console.log(inProgressProjectTasks)
    console.log(doneProjectTasks)

    const status = useSelector(getStatus)
    const error = useSelector(getError)
    const dispatch = useDispatch()
    const token = useSelector(getToken)


    useEffect(()=>{
        if(status === 'idle' && token){
            dispatch(fetchProjectTasks({
                projectId,
                token
            }))
        }

    },[status,token,dispatch,projectId])
    let content
    if(status === 'loading'){
        content = <p>Loading...</p>
    }
    if(status === 'succeeded'){
        content = (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3></h3>
                            </div>
                        </div>
    
                        <TodoList  projectTasks={todoProjectTasks}/>
                      
                      
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                      
                        <InProgressList  projectTasks={inProgressProjectTasks}/>
                      
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                       
                        <DoneList  projectTasks={doneProjectTasks}/>
                       
                    </div>
                </div>
            </div>
    
        )
    }
    if(status === 'failed'){
        content = <p>{error}</p>
    }
        

    return content
}
export default Backlog