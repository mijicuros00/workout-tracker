import axios from 'axios';

const getAll = () =>{
    return axios.get('workouts')
        .then(response => response.data)
        .catch(err => console.log(err));
}

const getOne = id =>{
    return axios.get(`/workouts/${id}`)
        .then(response => response.data)
        .catch(err => console.log(err));
}

const createWorkout = performedExercises =>{
    let workout = {
        "performedExercises": performedExercises
    }
    return axios.post('workouts', workout)
        .then(response => response.data)
        .catch(err => console.log(err));
}

const WorkoutService = {
    createWorkout,
    getAll,
    getOne
}

export default WorkoutService