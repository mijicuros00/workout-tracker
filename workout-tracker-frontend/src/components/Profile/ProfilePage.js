import StandardLayout from "../layout/StandardLayout";
import classes from './ProfilePage.module.css';
import {useEffect, useState} from "react";
import {Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import UserService from "../../services/user-service";

const kgLbsRatio = 2.2046;
const cmInchRatio = 2.54;

const ProfilePage = () =>{

    const [unit, setUnit] = useState("metric");
    const [isLoading, setIsLoading] = useState(false);
    const[user, setUser] = useState({});

    useEffect(() => {
        setIsLoading(true);
        UserService.getUserFromToken()
            .then(res => {
                setUser(res);
                setIsLoading(false);
            })
            .catch(() => {
                alert("something went wrong!");
                setIsLoading(false);
            });


    }, [])


    const linkStyle = {
        color: "white",
        textDecoration: "none"
    }

    const loaderCss = {
        position: "absolute",
        left: "40%",
        top: "50%"
    }

    let height = user.height;
    if(localStorage.getItem("units") === "imperial"){
        height = height/cmInchRatio;
    }

    return(
        <StandardLayout>
            {isLoading ? <ClipLoader color={"white"} loading={isLoading} css={loaderCss} size={150} /> :
                <main className={classes.main}>
                    <h1 className={classes.title}>Welcome to your profile page</h1>
                    <h3>{user.firstName + " " + user.lastName}</h3>
                    <h3>{user.email}</h3>
                    <h3>{user.age} years old</h3>
                    <h3>{localStorage.getItem("units") === "metric" ? user.weight : (user.weight * kgLbsRatio).toFixed(2)}{localStorage.getItem("units") === "metric" ? "kg" : "lbs"}</h3>
                    <h3>{localStorage.getItem("units") === "metric" ? height : (height/12).toFixed(0)}{localStorage.getItem("units") === "metric" ? "cm" : "feet " + (height%12).toFixed(0) + "inches"}</h3>
                    <h3>{user.gender}</h3>
                    <Button variant="dark"><Link to="/profile/update" style={linkStyle}>Update profile
                        information</Link></Button>
                    <section className={classes.section}>
                        <h2 className={classes.title}>Profile settings</h2>
                        <label>Select unit type:</label>
                        <div>
                            Metric(Kgs and centimeters) <input type="radio" value="metric" name="unit" onClick={() => {
                            localStorage.setItem("units", "metric");
                            setUnit("metric");
                        }} checked={localStorage.getItem("units") === "metric"}/>
                            <br/>
                            Imperial(lbs and inches)<input type="radio" value="imperial" name="unit" onClick={() => {
                            localStorage.setItem("units", "imperial");
                            setUnit("imperial");
                        }} checked={localStorage.getItem("units") === "imperial"}/>
                        </div>
                    </section>
                </main>}
        </StandardLayout>
    );
}
export default ProfilePage;