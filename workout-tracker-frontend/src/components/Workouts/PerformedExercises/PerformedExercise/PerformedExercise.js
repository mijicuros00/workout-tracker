import classes from "../../Workouts.module.css";
import Modal from "react-modal";
import {useEffect, useState} from "react";

const PerformedExercise = props =>{

    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);
    const [exerciseId, setExerciseId] = useState(0);

    useEffect(() =>{
        console.log(props.performedExercise.exercise.id);
        setExerciseId(props.performedExercise.exercise.id);
    }, []);

    const weightChangeHandler = e =>{
        setWeight(e.target.value);
    }

    const repsChangeHandler = e =>{
        setReps(e.target.value);
    }

    const submitHandler = (e, id) =>{
        e.preventDefault();
        alert(`${exerciseId} + ${props.performedExercise.exercise.id} + ${id}`);
        let set = {
            exerciseId: id,
            weight: weight,
            reps: reps
        }
        console.log(id);
        // props.addSetHandler(set);
        props.setModalIsOpen(false)
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

    return(
        <div className={classes.performedExercise}>
            <h3>{props.performedExercise.exercise.name + " " + props.performedExercise.exercise.id}</h3>
            <button onClick={() => props.setModalIsOpen(true)} className={classes.addSetButton}>Add a set</button>
            <button onClick={() => alert(exerciseId)}>View ID</button>
            {props.performedExercise.workingSets.map(set => <p>SET</p>)}
            <Modal style={customStyles} isOpen={props.modalIsOpen} ariaHideApp={false} onRequestClose={() => props.setModalIsOpen(false)} appElement={document.getElementById('app')}>
                <form className={classes.addSetForm} onSubmit={e => {
                    e.preventDefault();
                    alert(`${exerciseId} + ${props.performedExercise.exercise.id}`);
                    let set = {
                        exerciseId: exerciseId,
                        weight: weight,
                        reps: reps
                    }
                    console.log(exerciseId);
                    // props.addSetHandler(set);
                    props.setModalIsOpen(false)
                }}>
                    <h3>Adding set</h3>
                    <label>Weight in {localStorage.getItem("units") === "metric" ? "kgs" : "lbs"}</label>
                    <input type="number" placeholder="Weight" value={weight} onChange={weightChangeHandler}/>
                    <label>Reps</label>
                    <input type="number" placeholder="Reps" value={reps} onChange={repsChangeHandler}/>
                    <input type="submit" value="Submit" className={classes.submitSetButton} />
                </form>
            </Modal>
        </div>
    )
}

export default PerformedExercise;