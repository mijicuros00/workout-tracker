import classes from './authorization.module.css';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "./AuthAxios";
import ClipLoader from "react-spinners/ClipLoader";
import authService from "../../services/auth-service";

const Login = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    let navigate  = useNavigate();

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

        setIsLoading(true);
        authService.login(loginRequest)
            .then(response => {
                if(response){
                    setIsLoading(false);
                    navigate("/profile");
                    return;
                }
                setIsLoading(false);
                alert("Email or password are incorrect!");
            }).catch(() => {
            setIsLoading(false);
            alert("Email or password are incorrect!");
        })

    }

    const loaderCss = {
        position: "absolute",
        left: "40%",
        top: "50%"
    }

    return(
        <main className="main" onSubmit={submitHandler}>
            <h1 className={classes.textCenter}>Sign in</h1>
            <h3 className={classes.textCenter}>Welcome back, please log in to continue</h3>
            <h3 id="register" className={classes.textCenter}>If you don't already have an account, <Link to="/registration" style={linkStyle}>register here</Link> </h3>
            {isLoading ? <ClipLoader color={"white"} loading={isLoading} css={loaderCss} size={150} /> :
                <form className={classes.form}>
                    <input type="email" placeholder="Your email" value={email} onChange={emailChangeHandler}/>
                    <input type="password" placeholder="Your password" value={password} onChange={passwordChangeHandler}/>
                    <input type="submit" value="Submit"/>
                </form>}

        </main>
    );

}
export default Login;