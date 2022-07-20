import classes from "./ProfilePage.module.css";

const ProfileSettings = props =>{
    return(
    <section className={classes.section}>
        <h2 className={classes.title}>Profile settings</h2>
        <label>Select unit type:</label>
        <div className={classes.settings}>
            Metric(Kgs and centimeters) <input type="radio" value="metric" name="unit" onClick={() => {
            localStorage.setItem("units", "metric");
            props.set("metric");
        }} checked={localStorage.getItem("units") === "metric"}/>
            <br/>
            Imperial(lbs and inches)<input type="radio" value="imperial" name="unit" onClick={() => {
            localStorage.setItem("units", "imperial");
            props.set("imperial");
        }} checked={localStorage.getItem("units") === "imperial"}/>
        </div>
    </section>)
}

export default ProfileSettings;