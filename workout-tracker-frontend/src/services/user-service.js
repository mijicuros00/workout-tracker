import axios from "axios";

    const getUserFromToken = () => {
        return axios.get("/users/token")
            .then(response =>{
                return response.data;
            }).catch(err =>{
            console.log(err);
            return null;
        })
    }

    const updateUser = (id, updatedUser) =>{
        return axios.put("/users/" + id, updatedUser)
            .then(response => response.status === 200)
            .catch(err => {
                console.log(err);
                return false;
            })
    }



const userService = {
    getUserFromToken,
    updateUser
}

export default userService;