import { Link, useParams } from "react-router-dom"

function ProjectTask(props){

    const {projectId} = useParams()

    return (
        <div className="card mb-1 bg-light">

            <div className="card-header text-primary">
                ID: {props.projectSequence} -- Priority: {props.priority}
            </div>
            <div className="card-body bg-light">
                <h5 className="card-title">{props.summary}</h5>
                <p className="card-text text-truncate ">
                    {props.acceptanceCriteria}
                </p>
                <Link to={`/project-task/update/${projectId}/${props.projectSequence}`} className="btn btn-primary">
                    View / Update
                </Link>

                <button className="btn btn-danger ml-4">
                    Delete
                </button>
            </div>
    </div>

    )
}
export default ProjectTask