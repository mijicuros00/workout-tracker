import {Col, Row} from "react-bootstrap";
import classes from "../Exercises.module.css";
import {useNavigate} from "react-router-dom";

const Exercise = props =>{

    let navigate = useNavigate();
    let muscleGroups = props.muscleGroups.map(group => group.name + ", ").toString();

    return (
        <Row className={classes.exercise} onClick={() => navigate(`/exercises/${props.id}`, {state : {isCustom : props.isCustom}})}>
            <Col lg={4} md={3} sm={12} xs={12} className="my-auto">
                <span className={classes.name}>{props.name}</span>
            </Col>
            {!props.pick ? <Col lg={4} md={3} sm={12} xs={12} className="my-auto">
                                <span className={classes.description}>{props.description}</span>
                          </Col> : null}
            <Col lg={4} md={3} sm={12} xs={12} className="my-auto">
                <span>{muscleGroups.substr(0, muscleGroups.length-2)}</span>
            </Col>
            {props.pick ? <Col lg={4} md={3} sm={12} xs={12} className="my-auto">
                            <button>Pick</button>
                          </Col> : null}
        </Row>
    );
}

export default Exercise;