import {Col, Row} from "react-bootstrap";
import classes from "../Statistics.module.css";
import {useNavigate} from "react-router-dom";

const BodyMeasure = props =>{

    const navigate = useNavigate();
    let date = new Date(props.date);

    return (
        <Row className={classes.bodyMeasure} onClick={() => navigate("/statistics/" + props.id)}>
            <Col lg={4} md={4} sm={12} xs={12} className="my-auto">
                <span>{props.name}</span>
            </Col>
            <Col lg={4} md={4} sm={12} xs={12} className="my-auto">
                <span>{props.value}</span>
            </Col>
            <Col lg={4} md={4} sm={12} xs={12} className="my-auto">
                <span>{`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}.`}</span>
            </Col>
        </Row>
    );
}

export default BodyMeasure;