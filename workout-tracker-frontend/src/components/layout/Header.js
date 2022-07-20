import 'bootstrap/dist/css/bootstrap.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {NavLink, Link, useNavigate} from "react-router-dom";
import classes from './layout.module.css';
import jwtService from "../../services/jwt-service";

const Header = () =>{

    let navigate = useNavigate();

    const logoutHandler = () =>{
        localStorage.removeItem("workoutTrackerAccessToken");
        navigate("/login");
    }

    return(
        <Navbar collapseOnSelect expand="lg" className={classes.nav} variant="dark">
            <Navbar.Brand className={classes.logoText}><Link to="/main">Workout tracker</Link></Navbar.Brand>

            <Navbar.Toggle className={classes.navbarToggler}/>
            <Navbar.Collapse >
                <Nav className="ms-auto">
                    {jwtService.getRoleFromJwt() === "ROLE_USER" ? <NavLink to="/profile" className={({isActive}) => (isActive ? classes.active : classes.navLink)}>Profile</NavLink> : null}
                    {jwtService.getRoleFromJwt() === "ROLE_USER" ? <NavLink to="/workouts" className={({isActive}) => (isActive ? classes.active : classes.navLink)}>Workouts</NavLink> : null}
                    <NavLink to="/exercises" className={({isActive}) => (isActive ? classes.active : classes.navLink)}>Exercises</NavLink>
                    {jwtService.getRoleFromJwt() === "ROLE_USER" ? <NavLink to="/statistics" className={({isActive}) => (isActive ? classes.active : classes.navLink)}>My statistics</NavLink> : null}
                    {jwtService.getRoleFromJwt() === "ROLE_USER" ? <NavLink to="/calculators" className={({isActive}) => (isActive ? classes.active : classes.navLink)}>Calculators</NavLink> : null}
                    <button onClick={logoutHandler} className={classes.logout}>Logout</button>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
}

export default Header;