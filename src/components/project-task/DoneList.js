import ProjectTask from "./ProjectTask"

function DoneList(props){
    const projectTasks = props.projectTasks
    return projectTasks.map(pt => <ProjectTask 
        key={pt.projectSequence}
        projectSequence = {pt.projectSequence}
        priority = {pt.priority}
        summary  = {pt.summary}
        acceptanceCriteria = {pt.acceptanceCriteria}
        />)
}
export default DoneList