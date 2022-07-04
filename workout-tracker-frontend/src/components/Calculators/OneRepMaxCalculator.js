import {useState} from "react";
import classes from './Calculators.module.css';

const OneRepMaxCalculator = () =>{

    const [weight, setWeight] = useState();
    const [reps, setReps] = useState();
    const [oneRepMax, setOneRepMax] = useState(0);

    const weightChangeHandler = e =>{
        setWeight(e.target.value);
    }

    const repsChangeHandler = e =>{
        setReps(e.target.value);
    }

    const calculateHandler = e =>{
        e.preventDefault();
        if(reps === undefined || weight === undefined){
            alert("You need to fill the form!");
            return;
        }

        let calculated1RM = (((reps/30)+1)*weight).toFixed(0);
        setOneRepMax(parseInt(calculated1RM));
    }

    return(
        <section className={classes.calculator}>
            <h2>One rep max calculator</h2>
            <input type="number" placeholder={`weight in ${localStorage.getItem("units") === "metric" ? "kgs" : "lbs"}`} value={weight} onChange={weightChangeHandler}/>
            <input type="number" placeholder="Reps" value={reps} onChange={repsChangeHandler}/>
            <input type="submit" value="Calculate" className={classes.calculateButton} onClick={calculateHandler} />
            {oneRepMax === 0 ? null : <p>You can approximately lift {oneRepMax} for one rep.</p>}
        </section>
    )
}

export default OneRepMaxCalculator;