import classes from './authorization.module.css';
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

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

    const validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const submitHandler = e =>{
        e.preventDefault();

        if(!validateEmail(email)){
            alert("Invalid email!");
            return;
        }

        if(password.length < 6){
            alert("Password must be at least 6 characters long!")
        }

        let loginRequest = {
            email: email,
            password: password
        }

        axios.post("http://localhost:8080/api/auth/login", loginRequest)
            .then(res =>{
                console.log(res);
                localStorage.setItem("workoutTrackerAccessToken", res.data)
            }).catch(err =>{
                console.log(err);
                alert("Email or password are incorrect!");
        })

    }

    return(
        <main className="main" onSubmit={submitHandler}>
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