import React from "react"
import { Link,useParams } from "react-router-dom"

function CreateProjectTaskButton(){
    const { projectId } = useParams()

    return (
        <React.Fragment>
            <Link to={`/project-task/create/${projectId}`} className="btn btn-primary mb-3">
                <i className="fas fa-plus-circle"> Create Project Task</i>
            </Link>
        </React.Fragment>
        )
}
export default CreateProjectTaskButton