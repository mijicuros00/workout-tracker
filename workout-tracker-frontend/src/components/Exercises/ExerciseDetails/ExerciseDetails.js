import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import ExerciseService from "../../../services/exercise-service";
import StandardLayout from "../../layout/StandardLayout";
import classes from "../Exercises.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import Exercise from "../Exercise/Exercise";

const ExerciseDetails = () =>{

    const [isLoading, setIsLoading] = useState(false);
    const [exercise, setExercise] = useState({});
    const [muscleGroups, setMuscleGroups] = useState([]);

    const { id } = useParams();
    const {state} = useLocation();
    const { isCustom } = state;
    let navigate = useNavigate();

    useEffect(() =>{
        console.log(isCustom);
        setIsLoading(true);
        ExerciseService.getOne(id, isCustom)
            .then(response => {
                setExercise(response.data);
                console.log(response.data);
                setMuscleGroups(response.data.muscleGroups);
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
                alert("Error while loading data.")
        });
    }, []);


    let groups = muscleGroups.map(group => group.name + ", ").toString();

    let image = null;
    if(exercise.image !== "" && exercise.image !== null){
        image = <img style={{maxWidth: "100%", objectFit: "cover"}} src={"data:image/png;base64, " + exercise.image} alt="Exercise picture"/>;
    }

    return(
        <StandardLayout>
            <main className={classes.main} style={{minHeight: "90vh"}}>
                <h1 className={classes.title}>Exercise details</h1>
                <h2 className={classes.exerciseName}>{exercise.name}</h2>
                <p>{exercise.description}</p>
                <h1>{isCustom}</h1>
                <p>This exercises activates these muscles: {groups.substr(0, groups.length-2)}</p>
                <p>{isCustom.toString()}</p>
                {image}
            </main>
        </StandardLayout>
    );

}


export default ExerciseDetails;