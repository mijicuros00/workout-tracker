import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProfilePage from "./components/Profile/ProfilePage";
import Login from "./components/Authorization/Login";
import Registration from "./components/Authorization/Registration";
import ProfileUpdate from "./components/Profile/profile-update/ProfileUpdate";
import Exercises from "./components/Exercises/Exercises";
import ExerciseForm from "./components/Exercises/ExerciseForm";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/profile/update" element={<ProfileUpdate/>}/>
            <Route path="/exercises" element={<Exercises/>}/>
            <Route path="/exercises/form" element={<ExerciseForm/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
