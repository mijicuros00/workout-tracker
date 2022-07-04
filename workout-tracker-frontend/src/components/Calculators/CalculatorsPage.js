import StandardLayout from "../layout/StandardLayout";
import classes from "../Exercises/Exercises.module.css";
import Exercises from "../Exercises/Exercises";
import {Col, Row} from "react-bootstrap";
import OneRepMaxCalculator from "./OneRepMaxCalculator";

const CalculatorsPage = () =>{


    return(
        <StandardLayout>
            <main className={classes.main} style={{minHeight: "90vh"}}>
                <Row>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <OneRepMaxCalculator />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <OneRepMaxCalculator />
                    </Col>
                </Row>
            </main>
        </StandardLayout>
    );
}

export default CalculatorsPage;
