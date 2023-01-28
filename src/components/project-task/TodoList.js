import ProjectTask from './ProjectTask'

function TodoList(props){
    const projectTasks = props.projectTasks
    return projectTasks.map(pt => <ProjectTask 
        key={pt.projectSequence}
        projectSequence = {pt.projectSequence}
        priority = {pt.priority}
        summary  = {pt.summary}
        acceptanceCriteria = {pt.acceptanceCriteria}
        />)
}
export default TodoList