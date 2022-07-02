import classes from "../Workouts.module.css";
import Exercises from "../../Exercises/Exercises";
import Modal from "react-modal";
import {useState} from "react";
import PerformedExercise from "./PerformedExercise/PerformedExercise";

const PerformedExercises = props =>{

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);
    const [exerciseId, setExerciseId] = useState(0);

    const weightChangeHandler = e =>{
        setWeight(e.target.value);
    }

    const repsChangeHandler = e =>{
        setReps(e.target.value);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            marginTop: '4vh',
            transform: 'translate(-50%, -50%)',
            backgroundColor: "#3b3b3b",
        },
        overlay: {
            position: 'fixed',
            inset: "0px",
            backgroundColor: "rgba(119, 119, 119, 0.75)"
        }
    };

    const submitHandler = e =>{
        e.preventDefault();
        let set = {
            exerciseId: exerciseId,
            weight: weight,
            reps: reps
        }
        props.addSetHandler(set);
        setModalIsOpen(false)
    }

    let performedExercises = props.performedExercises.map(performedExercise => {
        return(
            <PerformedExercise performedExercise={performedExercise} setExerciseId={setExerciseId} key={performedExercise.exercise.id} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} addSetHandler={props.addSetHandler} adding={props.adding} />
        )
    });

    return (
        <>
            {performedExercises}
            <Modal style={customStyles} isOpen={modalIsOpen} ariaHideApp={false} onRequestClose={() => setModalIsOpen(false)} appElement={document.getElementById('app')}>
                <form className={classes.addSetForm} onSubmit={submitHandler}>
                    <h3>Adding set</h3>
                    <label>Weight in {localStorage.getItem("units") === "metric" ? "kgs" : "lbs"}</label>
                    <input type="number" placeholder="Weight" value={weight} onChange={weightChangeHandler}/>
                    <label>Reps</label>
                    <input type="number" placeholder="Reps" value={reps} onChange={repsChangeHandler}/>
                    <input type="submit" value="Submit" className={classes.submitSetButton} />
                </form>
            </Modal>
        </>


    );
}

export default PerformedExercises;