import axios from "../components/Authorization/AuthAxios";

const registration = registeredUser =>{
    return axios.post("/auth/registration", registeredUser)
        .then(response => {
            if(response.status === 200){
                return true;
            }
        }).catch(err =>{
        console.log(err);
    })
}

const login = loginRequest =>{
    return axios.post("/auth/login", loginRequest)
        .then(response =>{
            if(response.status === 200){
                localStorage.setItem("workoutTrackerAccessToken", response.data);
                return true;
            }
        }).catch(err => console.log(err));
}


const authService = {
    registration,
    login
}
export default authService;