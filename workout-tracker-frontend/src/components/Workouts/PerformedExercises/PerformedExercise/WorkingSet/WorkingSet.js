
const WorkingSet = props =>{

    return(
        <p>{props.set.weight} {localStorage.getItem("units") === "metric" ? "kgs" : "lbs"} X {props.set.reps} reps</p>
    )
}

export default WorkingSet;