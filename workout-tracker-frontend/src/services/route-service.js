import Login from "../components/Authorization/Login";
import Registration from "../components/Authorization/Registration";
import ProfilePage from "../components/Profile/ProfilePage";
import ProfileUpdate from "../components/Profile/profile-update/ProfileUpdate";
import ExerciseDetails from "../components/Exercises/ExerciseDetails/ExerciseDetails";
import ExerciseForm from "../components/Exercises/ExerciseForm/ExerciseForm";
import ExercisesPage from "../components/Exercises/ExercisesPage";
import Workouts from "../components/Workouts/Workouts";
import NewWorkout from "../components/Workouts/NewWorkout/NewWorkout";
import WorkoutDetails from "../components/Workouts/WorkoutDetails/WorkoutDetails";
import CalculatorsPage from "../components/Calculators/CalculatorsPage";
import StatisticsPage from "../components/Statistics/StatisticsPage";
import BodyMeasureGraph from "../components/Statistics/BodyMeasureGraph/BodyMeasureGraph";
import jwtService from "./jwt-service";
import {Navigate, Route} from "react-router-dom";

const authorizationRoutes = [
    {path: "/login", element: <Login />},
    {path: "/registration", element: <Registration />},
]

const userRoutes = [
    {path: "/profile", element: <ProfilePage />},
    {path: "/profile/update", element: <ProfileUpdate />},
    {path: "/exercises/:id", element: <ExerciseDetails />},
    {path: "/exercises/form", element: <ExerciseForm />},
    {path: "/exercises", element: <ExercisesPage />},
    {path: "/workouts", element: <Workouts />},
    {path: "/workouts/new", element: <NewWorkout />},
    {path: "/workouts/:id", element: <WorkoutDetails />},
    {path: "/calculators", element: <CalculatorsPage />},
    {path: "/statistics", element: <StatisticsPage />},
    {path: "/statistics/:id", element: <BodyMeasureGraph />},
]

const administratorRoutes = [
    {path: "/exercises/:id", element: <ExerciseDetails />},
    {path: "/exercises/form", element: <ExerciseForm />},
    {path: "/exercises", element: <ExercisesPage />},
]

const getAllowedRoutes = () =>{

    let role = jwtService.getRoleFromJwt();

    if(role == null){
        return authorizationRoutes;
    }

    if(role === "ROLE_USER")
        return userRoutes;

    if(role === "ROLE_ADMINISTRATOR")
        return administratorRoutes;
}

const redirectRoutes = () =>{
    let role = jwtService.getRoleFromJwt();

    if(role === "ROLE_USER")
        return "/profile"

    if(role === "ROLE_ADMINISTRATOR")
        return "/exercises"

    return "/login";
}

const routeService = {
    getAllowedRoutes,
    redirectRoutes
}

export default routeService;