import jwt_decode from "jwt-decode";

    const getDecodedJwt = () =>{
        let token = localStorage.getItem("workoutTrackerAccessToken");
        if(token == null)
            return null;

        return jwt_decode(token);
    }

    const getRoleFromJwt = () =>{
        let decodedJwt = getDecodedJwt();
        if(decodedJwt == null)
            return decodedJwt

        return decodedJwt.role;
    }

    const jwtService = {
    getDecodedJwt,
    getRoleFromJwt
    }

export default jwtService;