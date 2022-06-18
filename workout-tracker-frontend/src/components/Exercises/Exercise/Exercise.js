import {Col, Row} from "react-bootstrap";
import classes from "../Exercises.module.css";

const Exercise = props =>{


    let muscleGroups = props.muscleGroups.map(group => group.name + ", ").toString();

    return (
        <Row className={classes.exercise}>
            <Col lg={4} md={3} sm={12} xs={12} className="my-auto">
                <span>{props.name}</span>
            </Col>
            <Col lg={4} md={3} sm={12} xs={12} className="my-auto">
                <span>{props.description}</span>
            </Col>
            <Col lg={4} md={3} sm={12} xs={12} className="my-auto">
                <span>{muscleGroups.substr(0, muscleGroups.length-2)}</span>
            </Col>
        </Row>
    );
}

export default Exercise;