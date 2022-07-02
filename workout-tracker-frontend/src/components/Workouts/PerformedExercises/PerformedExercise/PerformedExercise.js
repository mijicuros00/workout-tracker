import classes from "../../Workouts.module.css";
import Modal from "react-modal";
import {useEffect, useState} from "react";
import WorkingSet from "./WorkingSet/WorkingSet";

const PerformedExercise = props =>{

    const openModal = () =>{
        props.setExerciseId(props.performedExercise.exercise.id);
        props.setModalIsOpen(true);
    }

    return(
        <div className={classes.performedExercise}>
            <h3>{props.performedExercise.exercise.name}</h3>
            <button onClick={openModal} className={classes.addSetButton}>Add a set</button>
            {props.performedExercise.workingSets.map(set => <WorkingSet set={set} />)}

        </div>
    )
}

export default PerformedExercise;