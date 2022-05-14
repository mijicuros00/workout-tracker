import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import ProfilePage from "./components/Profile/ProfilePage";
import Login from "./components/Authorization/Login";

function App() {
  return (
    <BrowserRouter>
        <Route path="/login" component={Login}/>
        <Route path="/profile" component={ProfilePage}/>
    </BrowserRouter>
  );
}

export default App;
