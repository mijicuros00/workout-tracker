import StandardLayout from "../layout/StandardLayout";
import classes from './ProfilePage.module.css';
import {useState} from "react";
import {Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

const ProfilePage = () =>{

    const [unit, setUnit] = useState("metric");

    const unitChangeHandler = (value) =>{
        setUnit(value)
    }

    const linkStyle = {
        color: "white",
        textDecoration: "none"
    }

    return(
        <StandardLayout>
            <main className={classes.main}>
                <h1 className={classes.title}>Welcome to your profile page</h1>
                <h3>Petar Petrovic</h3>
                <h3>petarp@email.test</h3>
                <h3>26 years old</h3>
                <h3>90kg</h3>
                <h3>190cm</h3>
                <h3>Male</h3>
                <Button variant="dark"><Link to="/profile-update" style={linkStyle}>Update profile information</Link></Button>
                <section className={classes.section}>
                    <h2 className={classes.title}>Profile settings</h2>
                    <label>Select unit type:</label>
                    <div >
                        Metric(Kgs and centimeters) <input type="radio" value="metric" name="unit" onClick={() => {localStorage.setItem("units", "metric"); setUnit("metric");}} checked={localStorage.getItem("units") === "metric"}/>
                        <br/>
                        Imperial(lbs and inches)<input type="radio" value="imperial" name="unit" onClick={() => {localStorage.setItem("units", "imperial"); setUnit("imperial");}} checked={localStorage.getItem("units") === "imperial"}/>
                    </div>
                </section>
            </main>
        </StandardLayout>
    );
}
export default ProfilePage;