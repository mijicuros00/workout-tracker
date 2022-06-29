import classes from "./Exercises.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import Exercise from "./Exercise/Exercise";
import {useEffect} from "react";

const Exercises = props =>{

    let exerciseList = props.exercises.map(exercise => <Exercise key={exercise.id} id={exercise.id} name={exercise.name} description={exercise.description} muscleGroups={exercise.muscleGroups} isCustom={exercise.custom} pick={false} />)

    return(
        <>
            <input type="text" placeholder="search exercises" value={props.searchInputValue} className={classes.search} onChange={props.searchChangeHandler}/>
            <select placeholder="Select muscle group" className={classes.select} value={props.muscleGroup !== 0 ? props.muscleGroup : null} onChange={props.selectHandler}>
                <option defaultChecked selected className={classes.option} disabled>Select muscle group</option>
                <option className={classes.option} value={0}>No muscle group</option>
                {props.muscleGroups.map(muscleGroup => <option className={classes.option} value={muscleGroup.id}>{muscleGroup.name}</option> )}
            </select>
            <button className={classes.newButton} onClick={props.newExerciseButtonHandler}>Create new exercise</button>
            {props.isLoading ? <ClipLoader color={"white"} loading={props.isLoading} css={props.loaderCss} size={150} /> : exerciseList }
        </>
    );
}

export default Exercises;