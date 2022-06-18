import axios from "axios";

const getAll = (page, size, search) =>{
    return axios.get(`/exercises?page=${page}&size=${size}&search=${search}`)
        .then(response => response)
        .catch(err => console.log(err));
}



const ExerciseService = {
    getAll
};

export default ExerciseService;