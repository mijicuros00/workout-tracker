import classes from './authorization.module.css';
import {Link} from "react-router-dom";
import {useState} from "react";

const Login = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailChangeHandler = e =>{
        setEmail(e.target.value);
    }

    const passwordChangeHandler = e =>{
        setPassword(e.target.value);
    }

    const linkStyle = {
        color: "#b2d0df"
    }

    return(
        <main className="main">
            <h1 className={classes.textCenter}>Sign in</h1>
            <h3 className={classes.textCenter}>Welcome back, please log in to continue</h3>
            <h3 id="register" className={classes.textCenter}>If you don't already have an account, <Link to="/registration" style={linkStyle}>register here</Link> </h3>
            <form className={classes.form}>
                <input type="email" placeholder="Your email" value={email} onChange={emailChangeHandler}/>
                <input type="password" placeholder="Your password" value={password} onChange={passwordChangeHandler}/>
                <input type="submit" value="Submit"/>
            </form>
        </main>
    );

}
export default Login;