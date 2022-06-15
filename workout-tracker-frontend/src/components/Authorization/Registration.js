import classes from "./authorization.module.css";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "./AuthAxios";
import ClipLoader from "react-spinners/ClipLoader";
import authService from "../../services/auth-service";

const kgLbsRatio = 2.2046;
const cmInchRatio = 2.54;

const Registration = (props) =>{

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [age, setAge] = useState();
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    const [gender, setGender] = useState("MALE");
    const [unit, setUnit] = useState("metric");

    const [isLoading, setIsLoading] = useState(false);
    let navigate  = useNavigate();

    const firstNameChangeHandler = e =>{
        setFirstName(e.target.value);
    }

    const lastNameChangeHandler = e =>{
        setLastName(e.target.value);
    }

    const emailChangeHandler = e =>{
        setEmail(e.target.value);
    }

    const passwordChangeHandler = e =>{
        setPassword(e.target.value);
    }

    const repeatedPasswordChangeHandler = e =>{
        setRepeatedPassword(e.target.value);
    }

    const ageChangeHandler = e =>{
        setAge(e.target.value);
    }

    const weightChangeHandler = e =>{
        setWeight(e.target.value);
    }

    const heightChangeHandler = e =>{
        setHeight(e.target.value);
    }

    const genderChangeHandler = e =>{
        setGender(e.target.value);
    }


    const submitHandler = e =>{
        e.preventDefault();
        if(firstName.trim().length < 1 || lastName.trim().length < 1 || password.trim().length < 6 || repeatedPassword.trim().length < 1){
            alert("Form isn't filled correctly!")
            return;
        }else if(password !== repeatedPassword){
            alert("Password need to match!");
            return;
        }

        let weightInKgs;
        let heightInCms;
        if(unit === "imperial"){
            weightInKgs = weight/kgLbsRatio;
            heightInCms = height*cmInchRatio;
            localStorage.setItem("units", "imperial");
        }else{
            weightInKgs = weight;
            heightInCms = height;
            localStorage.setItem("units", "metric");
        }

        let registeredUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            repeatedPassword: repeatedPassword,
            age: age,
            weight: weightInKgs,
            height: heightInCms,
            gender: gender
        };
        setIsLoading(true);
        authService.registration(registeredUser)
            .then(response => {
                if(response){
                    setIsLoading(false);
                    alert("We sent you a confirmation mail. Check your inbox.");
                    navigate("/login");
                }
            }).catch(() => {
            setIsLoading(false);
            alert("Something went wrong!");
        })

    }


    const linkStyle = {
        color: "#b2d0df"
    }

    const loaderCss = {
        position: "absolute",
        left: "45%",
        top: "50%"
    }

    return(
        <main className="main">
            <h1 className={classes.textCenter}>Registration</h1>
            <h3 className={classes.textCenter}>Welcome, please register to continue to app</h3>
            <h3 id="register" className={classes.textCenter}>If you already have an account, <Link to="/login" style={linkStyle}>go to login page</Link> </h3>
            {isLoading ? <ClipLoader color={"white"} loading={isLoading} css={loaderCss} size={150} /> :
                <form className={classes.form} onSubmit={submitHandler}>
                    <input type="text" placeholder="Your first name" value={firstName} onChange={firstNameChangeHandler}/>
                    <input type="text" placeholder="Your last name" value={lastName} onChange={lastNameChangeHandler}/>
                    <input type="email" placeholder="Your email" value={email} onChange={emailChangeHandler}/>
                    <input type="password" placeholder="Your password" value={password} onChange={passwordChangeHandler}/>
                    <input type="password" placeholder="Repeat your password password" value={repeatedPassword} onChange={repeatedPasswordChangeHandler}/>
                    <input type="number" step={1} placeholder="Your Age" value={age} onChange={ageChangeHandler}/>
                    <label>Select unit type:</label>
                    <div className={classes.radioDiv}>
                        Metric(Kgs and centimeters) <input type="radio" value="metric" name="unit" onClick={(e) => setUnit("metric")} defaultChecked/>
                        <br/>
                        Imperial(lbs and inches)<input type="radio" value="imperial" name="unit" onClick={(e) => setUnit("imperial")} />
                    </div>
                    <input type="number" step={1} placeholder="Your weight" value={weight} onChange={weightChangeHandler}/>
                    <input type="number" step={1} placeholder="Your height" value={height} onChange={heightChangeHandler}/>
                    <select defaultValue="male" onChange={genderChangeHandler}>
                        <option disabled>Select gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                    <input type="submit" value="Submit" disabled={isLoading}/>
                </form>}
        </main>
    );
}

export default Registration;