
const WorkingSet = props =>{

    return(
        <p>{parseInt(props.set.weight).toFixed(0)} {localStorage.getItem("units") === "metric" ? "kgs" : "lbs"} X {props.set.reps} reps</p>
    )
}

export default WorkingSet;