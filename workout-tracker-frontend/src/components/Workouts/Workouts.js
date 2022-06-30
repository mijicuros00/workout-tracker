import classes from './Workouts.module.css';
import StandardLayout from "../layout/StandardLayout";
import {useNavigate} from "react-router-dom";

const Workouts = () =>{

    let navigate = useNavigate();

    const newExerciseButtonHandler = e => {
        e.preventDefault();
        navigate("/workouts/new");
    }

    return(
        <StandardLayout>
            <main className={classes.main} style={{minHeight: "90vh"}}>
                <h1 className={classes.title}>Your previous workouts</h1>
                <button className={classes.newButton} onClick={newExerciseButtonHandler}>Start a new workout</button>
            </main>
        </StandardLayout>
    );
}

export default Workouts;