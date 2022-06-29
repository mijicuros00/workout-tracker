import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProfilePage from "./components/Profile/ProfilePage";
import Login from "./components/Authorization/Login";
import Registration from "./components/Authorization/Registration";
import ProfileUpdate from "./components/Profile/profile-update/ProfileUpdate";
import ExercisesPage from "./components/Exercises/ExercisesPage";
import ExerciseForm from "./components/Exercises/ExerciseForm/ExerciseForm";
import ExerciseDetails from "./components/Exercises/ExerciseDetails/ExerciseDetails";
import Workouts from "./components/Workouts/Workouts";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/profile/update" element={<ProfileUpdate/>}/>
            <Route path="/exercises/:id" element={<ExerciseDetails/>} exact/>
            <Route path="/exercises/form" element={<ExerciseForm/>} exact/>
            <Route path="/exercises" element={<ExercisesPage/>} exact/>
            <Route path="/workouts" element={<Workouts/>} exact/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
