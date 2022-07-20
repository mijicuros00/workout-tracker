import classes from './Workouts.module.css';
import StandardLayout from "../layout/StandardLayout";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import WorkoutService from "../../services/workout-service";
import Workout from "./Workout/Workout";
import jwtService from "../../services/jwt-service";

const Workouts = () =>{

    const [workouts, setWorkouts] = useState([]);

    useEffect(() =>{

        if(jwtService.getRoleFromJwt() === null)
            navigate("/login");

        if(jwtService.getRoleFromJwt() === "ROLE_ADMINISTRATOR")
            navigate("/exercises");

        WorkoutService.getAll()
            .then(response => setWorkouts(response))
            .catch(err => alert("There was an error while loading your workouts"))
    }, [])

    let navigate = useNavigate();

    const newExerciseButtonHandler = e => {
        e.preventDefault();
        navigate("/workouts/new");
    }

    return(
        <StandardLayout>
            <main className={classes.main} style={{minHeight: "90vh"}}>
                <h1 className={classes.title}>Your workouts</h1>
                <button className={classes.newButton} onClick={newExerciseButtonHandler}>Start a new workout</button>
                {workouts.map(workout => <Workout workout={workout} />)}
            </main>
        </StandardLayout>
    );
}

export default Workouts;