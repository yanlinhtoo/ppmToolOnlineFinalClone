import { Link } from "react-router-dom";

function MainNavigation(){
    return (
        <nav className='navbar navbar-expand-sm navbar-dark bg-primary mb-4'>
        <div className='container'>
            <Link className='navbar-brand' to='/dashboard'>
                Personal Kanban Tool
            </Link>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#mobile-nav'>
                <span className='navbar-toggler-icon' />
            </button>

            <div className='collapse navbar-collapse' id='mobile-nav'>
                <ul className='navbar-nav mr-auto'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/dashboard'>
                            Dashboard
                        </Link>
                    </li>
                </ul>

                <ul className='navbar-nav ml-auto'>
                    <li className='nav-item'>
                        <Link to='/register' className="nav-link ">
                            Sign Up
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/login' className='nav-link'>
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    );
}
export default MainNavigation;