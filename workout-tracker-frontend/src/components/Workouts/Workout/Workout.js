import {Col, Row} from "react-bootstrap";
import classes from "../Workouts.module.css";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Workout = props =>{

    let navigate = useNavigate();
    let performedExercises = props.workout.performedExercises.map(performedExercise => performedExercise.exercise.name + ", ").toString();
    let date = new Date(props.workout.dateOfWorkout);

    const clickHandler = () =>{
        navigate(`/workouts/${props.workout.id}`)
    }

    return (
        <Row className={classes.workout} onClick={clickHandler}>
            <Col lg={6} md={6} sm={12} xs={12} className="my-auto">
                <span >{`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}.`}</span>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12} className="my-auto">
                <span>{performedExercises.substr(0, performedExercises.length-2)}</span>
            </Col>
        </Row>
    );
}

export default Workout;