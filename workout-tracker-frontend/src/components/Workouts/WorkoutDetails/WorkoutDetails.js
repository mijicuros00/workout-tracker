import StandardLayout from "../../layout/StandardLayout";
import classes from "../Workouts.module.css";
import Workout from "../Workout/Workout";
import {useEffect, useState} from "react";
import WorkoutService from "../../../services/workout-service";
import {useParams} from "react-router-dom";
import PerformedExercises from "../PerformedExercises/PerformedExercises";

const WorkoutDetails = () =>{

    const [performedExercises, setPerformedExercises] = useState([]);
    const [dateOfWorkout, setDateOfWorkout] = useState();

    const { id } = useParams();
    let date = new Date(dateOfWorkout);

    useEffect(() =>{
        WorkoutService.getOne(id)
            .then(response => {
                setDateOfWorkout(response.dateOfWorkout);
                setPerformedExercises(response.performedExercises);
            })
            .catch(err => alert("There was an error while loading details of this workout!"));
    }, [])


    return(
        <StandardLayout>
            <main className={classes.main} style={{minHeight: "90vh"}}>
                <h1 className={classes.title}>Details of your workout</h1>
                <h3 className={classes.date}>Date of workout: {`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}</h3>
                <PerformedExercises performedExercises={performedExercises} />
            </main>
        </StandardLayout>
    );
}
export default WorkoutDetails;