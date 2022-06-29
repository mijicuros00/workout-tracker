import classes from "../Exercises/Exercises.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import StandardLayout from "../layout/StandardLayout";

const Workouts = () =>{


    return(
        <StandardLayout>
            <main className={classes.main} style={{minHeight: "90vh"}}>
                <h1 className={classes.title}>Your previous workouts</h1>
            </main>
        </StandardLayout>
    );
}

export default Workouts;