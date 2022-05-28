import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProfilePage from "./components/Profile/ProfilePage";
import Login from "./components/Authorization/Login";
import Registration from "./components/Authorization/Registration";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
