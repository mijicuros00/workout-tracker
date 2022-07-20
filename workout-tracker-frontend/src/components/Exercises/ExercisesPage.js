import StandardLayout from "../layout/StandardLayout";
import ClipLoader from "react-spinners/ClipLoader";
import {useEffect, useState} from "react";
import ExerciseService from "../../services/exercise-service";
import Exercise from "./Exercise/Exercise";
import classes from './Exercises.module.css'
import MuscleGroupService from "../../services/muscle-group-service";
import {useNavigate} from "react-router-dom";
import Exercises from "./Exercises";
import jwtService from "../../services/jwt-service";

const ExercisesPage = () =>{

    const [exercises, setExercises] = useState([]);
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(100);
    const [totalPages, setTotalPages] = useState(0);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [muscleGroup, setMuscleGroup] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);

        if(jwtService.getRoleFromJwt() === null)
            navigate("/login");

        MuscleGroupService.getAll()
            .then(response => {
                setMuscleGroups(response.data);
                setIsLoading(false);
            }).catch(() => {
            alert("An error occurred while loading data!");
            setIsLoading(false);
        })
    }, [])

    useEffect(() =>{
        setIsLoading(true);
        ExerciseService.getAll(page, size, searchInputValue, muscleGroup)
            .then(response => {
                setExercises(response.data);
                setTotalPages(parseInt(response.headers["x-paging-pagecount"]));
                setIsLoading(false);
            }).catch(() => {
                alert("An error occurred while loading exercises!");
                setIsLoading(false);
        })
    }, [page, size, searchInputValue, muscleGroup]);


    const searchChangeHandler = e =>{
        e.preventDefault();
        setSearchInputValue(e.target.value);
    }

    const selectHandler = e =>{
        setMuscleGroup(e.target.value);
    }

    const newExerciseButtonHandler = e =>{
        e.preventDefault();
        navigate("/exercises/form");
    }

    const loaderCss = {
        position: "absolute",
        left: "40%",
        top: "50%"
    }


    return(
        <StandardLayout>
                <main className={classes.main} style={{minHeight: "90vh"}}>
                    <h1 className={classes.title}>Exercises</h1>
                    <Exercises searchInputValue={searchInputValue} searchChangeHandler={searchChangeHandler}
                               muscleGroup={muscleGroup} selectHandler={selectHandler} pick={false}
                               newExerciseButtonHandler={newExerciseButtonHandler} isLoading={isLoading}
                               loaderCss={loaderCss} exercises={exercises} muscleGroups={muscleGroups}/>
                </main>
        </StandardLayout>
    );

}

export default ExercisesPage;