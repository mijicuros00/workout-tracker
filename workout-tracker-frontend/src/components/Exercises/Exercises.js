import StandardLayout from "../layout/StandardLayout";
import ClipLoader from "react-spinners/ClipLoader";
import {useEffect, useState} from "react";
import ExerciseService from "../../services/exercise-service";
import Exercise from "./Exercise/Exercise";
import classes from './Exercises.module.css'
import MuscleGroupService from "../../services/muscle-group-service";

const Exercises = () =>{

    const [exercises, setExercises] = useState([]);
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(100);
    const [totalPages, setTotalPages] = useState(0);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [muscleGroup, setMuscleGroup] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
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

    const loaderCss = {
        position: "absolute",
        left: "40%",
        top: "50%"
    }

    let exerciseList = exercises.map(exercise => <Exercise key={exercise.id} id={exercise.id} name={exercise.name} description={exercise.description} muscleGroups={exercise.muscleGroups} />)

    return(
        <StandardLayout>
                <main className={classes.main} style={{minHeight: "90vh"}}>
                    <h1 className={classes.title}>Exercises</h1>
                    <input type="text" placeholder="search exercises" value={searchInputValue} className={classes.search} onChange={searchChangeHandler}/>
                    <select placeholder="Select muscle group" className={classes.select} value={muscleGroup !== 0 ? muscleGroup : null} onChange={selectHandler}>
                        <option  defaultChecked selected className={classes.option} disabled>Select muscle group</option>
                        {muscleGroups.map(muscleGroup => <option className={classes.option} value={muscleGroup.id}>{muscleGroup.name}</option> )}
                    </select>
                    {isLoading ? <ClipLoader color={"white"} loading={isLoading} css={loaderCss} size={150} /> : exerciseList }
                </main>
        </StandardLayout>
    );

}

export default Exercises;