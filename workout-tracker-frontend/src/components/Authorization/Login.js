import classes from './authorization.module.css';
import {Link} from "react-router-dom";

const Login = () =>{

    const linkStyle = {
        color: "#b2d0df"
    }

    return(
        <main className="main">
            <h1 className={classes.textCenter}>Sign in</h1>
            <h3 className={classes.textCenter}>Welcome back, please log in to continue</h3>
            <h3 id="register" className={classes.textCenter}>If you don't already have an account, <Link to="/register" style={linkStyle}>register here</Link> </h3>
            <form className={classes.form}>
                <input type="text" placeholder="Your email"/>
                <input type="password" placeholder="Your password"/>
                <input type="submit" value="Submit"/>
            </form>
        </main>
    );

}
export default Login;