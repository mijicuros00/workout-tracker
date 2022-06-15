import classes from "./ProfileUpdate.module.css";
import {Link, useNavigate} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {useEffect, useState} from "react";
import axios from "axios";

const kgLbsRatio = 2.2046;
const cmInchRatio = 2.54;

const ProfileUpdate = () =>{

    const [id, setId] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState();
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();

    const [isLoading, setIsLoading] = useState(false);
    let navigate  = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        axios.get("/users/token")
            .then(response =>{
                setId(response.data.id);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setAge(response.data.age);
                if(localStorage.getItem("units") === "metric"){
                    setWeight(response.data.weight);
                    setHeight(response.data.height);
                }else{
                    setWeight((response.data.weight * kgLbsRatio).toFixed(2));
                    setHeight((response.data.height / cmInchRatio).toFixed(0));
                }
                setIsLoading(false);
            }).catch(err =>{
            console.log(err);
            alert("Something went wrong!");
            setIsLoading(false);
        })

    }, [])

    const firstNameChangeHandler = e =>{
        setFirstName(e.target.value);
    }

    const lastNameChangeHandler = e =>{
        setLastName(e.target.value);
    }

    const emailChangeHandler = e =>{
        setEmail(e.target.value);
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

    const submitHandler = e =>{
        e.preventDefault();
        if(firstName.trim().length < 1 || lastName.trim().length < 1 || age < 1 || height < 1 || weight < 1){
            alert("Form isn't filled correctly!")
            return;
        }
        let weightInKgs;
        let heightInCms;
        if(localStorage.getItem("units") === "imperial"){
            weightInKgs = weight/kgLbsRatio;
            heightInCms = height*cmInchRatio;
        }else{
            weightInKgs = weight;
            heightInCms = height;
        }

        let updatedUser = {
            firstName,
            lastName,
            email,
            age,
            height : heightInCms,
            weight: weightInKgs
        }
        setIsLoading(true);
        axios.put("/users/" + id, updatedUser)
            .then(response =>{
                if(response.status === 200){
                    setIsLoading(false);
                    navigate("/profile")
                }
            }).catch(err =>{
                console.log(err);
            setIsLoading(false);
            alert("something went wrong!");
        })

    }

    const loaderCss = {
        position: "absolute",
        left: "45%",
        top: "50%"
    }

    return(
        <main className="main">
            <h1 className={classes.textCenter}>Profile update</h1>
            {isLoading ? <ClipLoader color={"white"} loading={isLoading} css={loaderCss} size={150} /> :
                <form className={classes.form} onSubmit={submitHandler}>
                    <input type="text" placeholder="Your first name" value={firstName} onChange={firstNameChangeHandler}/>
                    <input type="text" placeholder="Your last name" value={lastName} onChange={lastNameChangeHandler}/>
                    <input type="email" placeholder="Your email" value={email} onChange={emailChangeHandler} readOnly/>
                    <input type="number" step={1} placeholder="Your Age" value={age} onChange={ageChangeHandler}/>
                    <h5>You choose to record weight and height in {localStorage.getItem("units") === "metric" ? "Metric system" : "Imperial system"}</h5>
                    <input type="number" step={1} placeholder="Your weight" value={weight} onChange={weightChangeHandler}/>
                    <input type="number" step={1} placeholder="Your height" value={height} onChange={heightChangeHandler}/>
                    <input type="submit" value="Submit" disabled={isLoading}/>
                </form>}
        </main>
    );

}

export default ProfileUpdate;