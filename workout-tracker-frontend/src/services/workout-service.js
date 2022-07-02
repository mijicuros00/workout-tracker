import axios from 'axios';

const createWorkout = performedExercises =>{
    let workout = {
        "performedExercises": performedExercises
    }
    return axios.post('workouts', workout)
        .then(response => response.data)
        .catch(err => console.log(err));
}

const WorkoutService = {
    createWorkout
}

export default WorkoutService