import classes from "../Workouts.module.css";
import Exercises from "../../Exercises/Exercises";
import Modal from "react-modal";
import {useState} from "react";
import PerformedExercise from "./PerformedExercise/PerformedExercise";

const PerformedExercises = props =>{

    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        props.performedExercises.map(performedExercise => {
            return(
                <PerformedExercise performedExercise={performedExercise} key={performedExercise.exercise.id} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} addSetHandler={props.addSetHandler} />
            )
        })
    );
}

export default PerformedExercises;