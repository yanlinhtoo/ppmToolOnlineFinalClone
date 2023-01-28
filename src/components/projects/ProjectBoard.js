import CreateProjectTaskButton from "../project-task/CreateProjectTaskButton"
import Backlog from "../project-task/Backlog"

function ProjectBoard(){
    return (
        <div className="container">
            <CreateProjectTaskButton />
        <br />
        <hr />
        <Backlog />
    </div>


    )
}
export default ProjectBoard