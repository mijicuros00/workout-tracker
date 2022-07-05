import classes from "./Calculators.module.css";
import {useEffect, useState} from "react";
import UserService from "../../services/user-service";

const CalorieCalculator = () =>{

    const[user, setUser] = useState({});
    const[exerciseLevel, setExerciseLevel] = useState(0);
    const[dailyCalories, setDailyCalories] = useState(0);

    useEffect(() => {
        UserService.getUserFromToken()
            .then(res => {
                setUser(res);
            })
            .catch(() => {
                alert("something went wrong!");
            });


    }, [])

    const selectHandler = e =>{
        setExerciseLevel(e.target.value);
    }

    const calculateHandler = e =>{
        e.preventDefault();
        let BMR;
        if(user.gender === "MALE"){
            BMR = 66.5 + (13.75 * user.weight) + (5.003 * user.height) - (6.75 * user.age);
        }else{
            BMR = 655.1 + (9.536 * user.weight) + (1.850 * user.height) - (4.676 * user.age);
        }

        if(exerciseLevel == 0){
            setDailyCalories(BMR*1.2);
        }
        else if(exerciseLevel == 1){
            setDailyCalories(BMR*1.375);
        }
        else if(exerciseLevel == 2){
            setDailyCalories(BMR*1.55);
        }
        else if(exerciseLevel == 3){
            setDailyCalories(BMR*1.725);
        }
        else if(exerciseLevel == 4){
            setDailyCalories(BMR*1.9);
        }
        else if(exerciseLevel == 5){
            setDailyCalories(BMR*2.1);
        }
    }

    return(
        <section className={classes.calculator}>
            <h2>Calorie calculator</h2>
            <label>Select your exercise level</label>
            <select className={classes.select} value={exerciseLevel} onChange={selectHandler}>
                <option value={0}>Little/no exercise(sedentary lifestyle)</option>
                <option value={1}>Light exercise 1-2 times a week</option>
                <option value={2}>Moderate exercise 2-3 times a week</option>
                <option value={3}>Hard exercise 4-5 times a week</option>
                <option value={4}>Physical job or hard exercise 5-6 times a week</option>
                <option value={5}>Professional athlete</option>
            </select>
            <p>Based on your profile data and selected activity level this calculator will give you approximation of daily caloric needs for you</p>
            <p>This calculator uses Harris-Benedict equation to calculate your total daily energy expenditure</p>
            <input type="submit" value="Calculate" className={classes.calculateButton} onClick={calculateHandler} />
            {dailyCalories === 0 ? null : <h5>Number of calories you should be consuming for maintenance is between {(dailyCalories-150).toFixed(0)} and {(dailyCalories+150).toFixed(0)}</h5>}
            {dailyCalories === 0 ? null : <h5>Number of calories you should be consuming for weight loss is between {(dailyCalories-700).toFixed(0)} and {(dailyCalories-300).toFixed(0)}</h5>}
            {dailyCalories === 0 ? null : <h5>Number of calories you should be consuming for weight gain is between {(dailyCalories+300).toFixed(0)} and {(dailyCalories+600).toFixed(0)}</h5>}
        </section>
    )

}

export default CalorieCalculator;