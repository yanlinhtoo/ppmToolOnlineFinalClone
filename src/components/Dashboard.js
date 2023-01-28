import ProjectsList from './projects/ProjectsList';
import CreateProjectButton from './projects/CreateProjectButton';

function Dashboard(){
    return (
        <div className="projects">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Projects</h1>
                        <br />
                        <CreateProjectButton />
                        <br />
                        <hr />
                        <ProjectsList />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;