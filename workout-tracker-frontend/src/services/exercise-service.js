import axios from "axios";

const getAll = (page, size, search, muscleGroup) =>{
    return axios.get(`/exercises?page=${page}&size=${size}&search=${search}&muscleGroupId=${muscleGroup}`)
        .then(response => response)
        .catch(err => console.log(err));
}

const getOne = id =>{
    return axios.get(`/exercises/${id}`)
        .then(response => response)
        .catch(err => console.log(err));
}

const create = (data) =>{
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('muscleGroupsIdList', data.selectedMusleGroups);

    if(data.image !== ""){
        formData.append('image', data.image);
    }

    return axios
        .post("/exercises", formData,{ headers: { "Content-type": "multipart/form-data" }})
        .then((response) => {
            return response.data;
        })
        .catch(error => console.log(error))

}

const ExerciseService = {
    getAll,
    create,
    getOne
};

export default ExerciseService;