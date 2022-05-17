import classes from "./authorization.module.css";
import {Link} from "react-router-dom";
import {useState} from "react";

const Registration = () =>{

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [age, setAge] = useState();
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    const [gender, setGender] = useState("male");
    const [unit, setUnit] = useState("metric");

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

    const unitChangeHandler = e =>{
        setUnit(e.target.value);
    }



    const linkStyle = {
        color: "#b2d0df"
    }

    return(
        <main className="main">
            <h1 className={classes.textCenter}>Registration</h1>
            <h3 className={classes.textCenter}>Welcome, please register to continue to app</h3>
            <h3 id="register" className={classes.textCenter}>If you already have an account, <Link to="/login" style={linkStyle}>go to login page</Link> </h3>
            <form className={classes.form}>
                <input type="text" placeholder="Your first name" value={firstName} onChange={firstNameChangeHandler}/>
                <input type="text" placeholder="Your last name" value={lastName} onChange={lastNameChangeHandler}/>
                <input type="email" placeholder="Your email" value={email} onChange={emailChangeHandler}/>
                <input type="password" placeholder="Your password" value={password} onChange={passwordChangeHandler}/>
                <input type="password" placeholder="Repeat your password password" value={repeatedPassword} onChange={repeatedPasswordChangeHandler}/>
                <input type="number" step={1} placeholder="Your Age" value={age} onChange={ageChangeHandler}/>
                <label>Select unit type:</label>
                <div className={classes.radioDiv}>
                    Metric(Kgs and meters) <input type="radio" value="metric" name="unit" onClick={(e) => setUnit("metric")} defaultChecked/>
                    <br/>
                    Imperial(lbs and miles)<input type="radio" value="imperial" name="unit" onClick={(e) => setUnit("imperial")} />
                </div>
                <input type="number" step={1} placeholder="Your weight" value={weight} onChange={weightChangeHandler}/>
                <input type="number" step={1} placeholder="Your height" value={height} onChange={heightChangeHandler}/>
                <select defaultValue="male" onChange={genderChangeHandler}>
                    <option disabled>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <input type="submit" value="Submit"/>
            </form>
        </main>
    );
}

export default Registration;