import axios from "axios";

const getAll = (page, size, search, muscleGroup) =>{
    return axios.get(`/exercises?page=${page}&size=${size}&search=${search}&muscleGroupId=${muscleGroup}`)
        .then(response => response)
        .catch(err => console.log(err));
}



const ExerciseService = {
    getAll
};

export default ExerciseService;