import {Col, Row} from "react-bootstrap";
import classes from "../Exercises.module.css";
import {useNavigate} from "react-router-dom";

const Exercise = props =>{

    let navigate = useNavigate();
    let muscleGroups = props.muscleGroups.map(group => group.name + " ").toString();

    const clickHandler = () =>{
        navigate(`/exercises/${props.id}`, {state : {isCustom : props.isCustom}});
    }

    let exercise = {
        id: props.id,
        name: props.name,
        description: props.description,
        image: props.image,
        muscleGroups: props.muscleGroups,
        custom: props.isCustom
    }

    return (
        <Row className={classes.exercise} onClick={props.pick ? null : clickHandler}>
            <Col lg={4} md={3} sm={12} xs={12} className="my-auto">
                <span className={classes.name}>{props.name}</span>
            </Col>
            {!props.pick ? <Col lg={4} md={3} sm={12} xs={12} className="my-auto">
                                <span className={classes.description}>{props.description}</span>
                          </Col> : null}
            <Col lg={4} md={3} sm={12} xs={12} className="my-auto">
                <span>{muscleGroups.substr(0, muscleGroups.length-1)}</span>
            </Col>
            {props.pick ? <Col lg={4} md={3} sm={12} xs={12} className="my-auto">
                            <button onClick={() => props.pickButtonHandler(exercise)} className={classes.pickButton}>Pick</button>
          </Col> : null}
            {props.pick ? <Col lg={12} md={3} sm={12} xs={12} className="my-auto">
                <span>{props.description}</span>
            </Col> : null}
        </Row>
    );
}

export default Exercise;