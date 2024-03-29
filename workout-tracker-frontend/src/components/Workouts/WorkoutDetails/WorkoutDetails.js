import StandardLayout from "../../layout/StandardLayout";
import classes from "../Workouts.module.css";
import {useEffect, useState} from "react";
import WorkoutService from "../../../services/workout-service";
import {useNavigate, useParams} from "react-router-dom";
import PerformedExercises from "../PerformedExercises/PerformedExercises";
import jwtService from "../../../services/jwt-service";

const kgLbsRatio = 2.2046;

const WorkoutDetails = () =>{

    const [performedExercises, setPerformedExercises] = useState([]);
    const [dateOfWorkout, setDateOfWorkout] = useState();

    const { id } = useParams();
    let navigate = useNavigate();
    let date = new Date(dateOfWorkout);

    useEffect(() =>{

        if(jwtService.getRoleFromJwt() === null)
            navigate("/login");

        if(jwtService.getRoleFromJwt() === "ROLE_ADMINISTRATOR")
            navigate("/exercises");

        WorkoutService.getOne(id)
            .then(response => {
                setDateOfWorkout(response.dateOfWorkout);
                let performedExercisesResponse = response.performedExercises;
                if(localStorage.getItem("units") === "imperial"){
                    performedExercisesResponse.forEach(performedExercise => {
                        performedExercise.workingSets.map(workingSet => workingSet.weight = (workingSet.weight * kgLbsRatio).toFixed(0));
                    })
                }
                setPerformedExercises(performedExercisesResponse);
            })
            .catch(() => alert("There was an error while loading details of this workout!"));

    }, []);

    const deleteHandler = () =>{
        WorkoutService.deleteWorkout(id)
            .then(response =>{
                alert("Workout deleted successfully!");
                navigate("/workouts");
            }).catch(() => alert("There was an error while trying to delete this workout!"))
    }

    const removeExerciseHandler = (performedExerciseId) =>{

        let filteredExercises = performedExercises.filter(performedExercise => performedExercise.id !== performedExerciseId);

        WorkoutService.updateWorkout(id, filteredExercises, dateOfWorkout)
            .then(response =>{
                setDateOfWorkout(response.dateOfWorkout);
                setPerformedExercises(response.performedExercises);
            }).catch(() => alert("There was an error while deleting chosen exercise!"))
    }


    return(
        <StandardLayout>
            <main className={classes.main} style={{minHeight: "90vh"}}>
                <h1 className={classes.title}>Details of your workout</h1>
                <h3 className={classes.date}>Date of workout: {`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`}</h3>
                <PerformedExercises details performedExercises={performedExercises} removeExerciseHandler={removeExerciseHandler} />
                <button onClick={deleteHandler} className={classes.deleteButton}>Delete this workout</button>
            </main>
        </StandardLayout>
    );
}
export default WorkoutDetails;