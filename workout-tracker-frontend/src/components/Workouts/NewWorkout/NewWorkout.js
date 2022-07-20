import classes from "../Workouts.module.css";
import StandardLayout from "../../layout/StandardLayout";
import {useEffect, useState} from "react";
import Modal from "react-modal";
import Exercises from "../../Exercises/Exercises";
import {useNavigate} from "react-router-dom";
import MuscleGroupService from "../../../services/muscle-group-service";
import ExerciseService from "../../../services/exercise-service";
import PerformedExercises from "../PerformedExercises/PerformedExercises";
import WorkoutService from "../../../services/workout-service";

const kgLbsRatio = 2.2046;

const NewWorkout = () =>{

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [muscleGroup, setMuscleGroup] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [dateOfWorkout, setDateOfWorkout] = useState(new Date().toISOString().substring(0,10));
    const [performedExercises, setPerformedExercises] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        MuscleGroupService.getAll()
            .then(response => {
                setMuscleGroups(response.data);
                setIsLoading(false);
            }).catch(() => {
            alert("An error occurred while loading data!");
            setIsLoading(false);
        })
    }, [])

    useEffect(() =>{
        setIsLoading(true);
        ExerciseService.getAll(0, 1000, searchInputValue, muscleGroup)
            .then(response => {
                setExercises(response.data);
                setIsLoading(false);
            }).catch(() => {
            alert("An error occurred while loading exercises!");
            setIsLoading(false);
        })
    }, [searchInputValue, muscleGroup]);


    const searchChangeHandler = e =>{
        e.preventDefault();
        setSearchInputValue(e.target.value);
    }

    const selectHandler = e =>{
        setMuscleGroup(e.target.value);
    }

    const newExerciseButtonHandler = e =>{
        e.preventDefault();
        navigate("/exercises/form");
    }

    const loaderCss = {
        position: "absolute",
        left: "40%",
        top: "50%"
    }

    const openModal = () =>{
        setModalIsOpen(true);
    }

    const pickButtonHandler = (exercise) =>{
        let alreadyExists = false;
        performedExercises.forEach(performedExercise => {
            if(performedExercise.exercise.id === exercise.id){
                alert("You already added chosen exercise!");
                alreadyExists = true;
                return;
            }
        })
        if(!alreadyExists){
            performedExercises.push({exercise: exercise, workingSets: []});
            console.log(performedExercises);
            setModalIsOpen(false);
        }

    }

    const addSetHandler = (set) =>{

        if(set.weight < 0 || set.reps<= 0){
            alert("Incorrect entry for weight or reps!");
            return;
        }

        performedExercises.forEach(performedExercise => {
            if(performedExercise.exercise.id === set.exerciseId){
                performedExercise.workingSets.push({weight: set.weight, reps: set.reps});
            }
        })
    }

    const dateChangeHandler = e =>{
        setDateOfWorkout(e.target.value)
    }

    const finishWorkoutHandler = () =>{

        if(localStorage.getItem("units") === "imperial"){
            performedExercises.forEach(performedExercise => {
                performedExercise.workingSets.map(workingSet => workingSet.weight = (workingSet.weight / kgLbsRatio).toFixed(2));
            })
        }

        WorkoutService.createWorkout(performedExercises, dateOfWorkout)
            .then(response =>{
                navigate(`/workouts/${response}`);
            }).catch(err => alert("There was an error while creating this workout!"));
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            marginTop: '10vh',
            marginBottom: '5vh',
            transform: 'translate(-50%, -50%)',
            backgroundColor: "#3b3b3b",
        },
        overlay: {
            position: 'fixed',
            inset: "0px",
            backgroundColor: "rgba(119, 119, 119, 0.75)",
            overflowY: "auto"
        }
    };

    return(
        <StandardLayout>
            <main className={classes.main} style={{minHeight: "90vh"}}>
                <h1 className={classes.title}>Create a new workout</h1>
                <input type="date" value={dateOfWorkout} onChange={dateChangeHandler}/>
                <button className={classes.newButton} onClick={openModal}>Add exercise</button>
                <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                    <Exercises searchInputValue={searchInputValue} searchChangeHandler={searchChangeHandler}
                               muscleGroup={muscleGroup} selectHandler={selectHandler} pick={true}
                               newExerciseButtonHandler={newExerciseButtonHandler} isLoading={isLoading}
                               loaderCss={loaderCss} exercises={exercises} muscleGroups={muscleGroups}
                               pickButtonHandler={pickButtonHandler}/>
                </Modal>
                <PerformedExercises performedExercises={performedExercises} addSetHandler={addSetHandler} adding />
                {performedExercises.length < 1 ? null : <button onClick={finishWorkoutHandler} className={classes.newButton}>Finish workout</button>}
            </main>
        </StandardLayout>
    )
}

export default NewWorkout;