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

const updateWorkout = (id, performedExercises, dateOfWorkout) =>{
    let workout = {
         id,
         performedExercises,
         dateOfWorkout
    }

    return axios.put(`workouts/${id}`, workout)
        .then(response => response.data)
        .catch(err => console.log(err));
}

const deleteWorkout = id =>{
    return axios.delete(`/workouts/${id}`)
        .then(response => response.data)
        .catch(err => console.log(err));
}

const WorkoutService = {
    createWorkout,
    getAll,
    getOne,
    updateWorkout,
    deleteWorkout
}

export default WorkoutService