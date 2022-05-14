import 'bootstrap/dist/css/bootstrap.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {NavLink, Link} from "react-router-dom";
import classes from './layout.module.css';

const Header = () =>{
    return(
        <Navbar collapseOnSelect expand="lg" className={classes.nav} variant="dark">
            <Navbar.Brand className={classes.logoText}><Link to="/main">Workout tracker</Link></Navbar.Brand>

            <Navbar.Toggle className={classes.navbarToggler}/>
            <Navbar.Collapse >
                <Nav className="ms-auto">
                    <NavLink to="/profile" className={classes.navLink} activeClassName={classes.active}>Profile</NavLink>
                    <NavLink to="/workouts" className={classes.navLink} activeClassName={classes.active}>Workouts</NavLink>
                    <NavLink to="/exercises" className={classes.navLink} activeClassName={classes.active}>Exercises</NavLink>
                    <NavLink to="/statistics" className={classes.navLink} activeClassName={classes.active}>My statistics</NavLink>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
}

export default Header;