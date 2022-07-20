import StandardLayout from "../layout/StandardLayout";
import classes from "../Exercises/Exercises.module.css";
import Exercises from "../Exercises/Exercises";
import {Col, Row} from "react-bootstrap";
import OneRepMaxCalculator from "./OneRepMaxCalculator";
import CalorieCalculator from "./CalorieCalculator";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import jwtService from "../../services/jwt-service";

const CalculatorsPage = () =>{

    let navigate = useNavigate();

    useEffect(() =>{
        if(jwtService.getRoleFromJwt() === null)
            navigate("/login");

        if(jwtService.getRoleFromJwt() === "ROLE_ADMINISTRATOR")
            navigate("/exercises");
    }, [])


    return(
        <StandardLayout>
            <main className={classes.main} style={{minHeight: "90vh"}}>
                <Row>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <OneRepMaxCalculator />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <CalorieCalculator />
                    </Col>
                </Row>
            </main>
        </StandardLayout>
    );
}

export default CalculatorsPage;
