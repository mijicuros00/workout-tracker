import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import ProfilePage from "./components/Profile/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Route path="/profile" component={ProfilePage}/>
    </BrowserRouter>
  );
}

export default App;
