import classes from "../../Exercises/Exercises.module.css";
import StandardLayout from "../../layout/StandardLayout";

const NewWorkout = () =>{

    return(
        <StandardLayout>
            <main className={classes.main} style={{minHeight: "90vh"}}>
                <h1 className={classes.title}>Create a new workout</h1>
            </main>
        </StandardLayout>
    )
}

export default NewWorkout;