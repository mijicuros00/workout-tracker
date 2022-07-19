import classes from "../../Workouts.module.css";
import Modal from "react-modal";
import {useEffect, useState} from "react";
import WorkingSet from "./WorkingSet/WorkingSet";
import {useNavigate} from "react-router-dom";

const PerformedExercise = props =>{

    let navigate = useNavigate();

    const openModal = () =>{
        props.setExerciseId(props.performedExercise.exercise.id);
        props.setModalIsOpen(true);
    }

    const openExerciseDetails = () =>{
        navigate(`/exercises/${props.performedExercise.exercise.id}`, {state : {isCustom : props.performedExercise.exercise.custom}})
    }

    let titleStyle = null;
    if(props.details){
        titleStyle = {
            cursor : 'pointer'
        }
    }

    return(
        <div className={classes.performedExercise}>
            {props.details ? <p className={classes.removeExercise} onClick={() => props.removeExerciseHandler(props.performedExercise.id)} >X</p> : null}
            <h3 style={titleStyle} onClick={props.details ? openExerciseDetails : null}>{props.performedExercise.exercise.name}</h3>
            {props.adding ? <button onClick={openModal} className={classes.addSetButton}>Add a set</button> : null}
            {props.performedExercise.workingSets.map(set => <WorkingSet set={set} />)}

        </div>
    )
}

export default PerformedExercise;