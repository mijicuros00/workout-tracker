import axios from "axios";

const getAll = () =>{
    return axios.get("/measures")
        .then(response => response)
        .catch(err => console.log(err));
}

const getById = (id) =>{
    return axios.get("/measures/" + id)
        .then(response => response)
        .catch(err => console.log(err));
}

const create = (bodyMeasure) =>{
    return axios.post("/measures", bodyMeasure)
        .then(response => response)
        .catch(err => console.log(err));
}

const BodyMeasureService = {
    getAll,
    getById,
    create
}

export default BodyMeasureService;