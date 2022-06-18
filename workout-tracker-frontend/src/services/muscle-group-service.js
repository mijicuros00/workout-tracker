import axios from "axios";

const getAll = () =>{
    return axios.get(`/muscle-groups`)
        .then(response => response)
        .catch(err => console.log(err));
}


const MuscleGroupService = {
    getAll
};

export default MuscleGroupService;